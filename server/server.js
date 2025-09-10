const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { Ollama } = require('@langchain/community/llms/ollama');
const { OllamaEmbeddings } = require('@langchain/ollama');
const { FaissStore } = require('@langchain/community/vectorstores/faiss');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { createStuffDocumentsChain } = require('langchain/chains/combine_documents');
const { ChatPromptTemplate } = require('@langchain/core/prompts');
const { createRetrievalChain } = require('langchain/chains/retrieval');

const app = express();
const port = process.env.PORT || 3001;
const DATA_DIR = path.resolve(__dirname, 'data');
const DOCS_FILE = path.join(DATA_DIR, 'docs.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

app.use(cors());
app.use(express.json());

const cpuCount = Math.max(1, os.cpus().length - 1);

const llm = new Ollama({
  baseUrl: 'http://127.0.0.1:11434',
  model: 'llama3',
});

const embeddings = new OllamaEmbeddings({
  baseUrl: 'http://127.0.0.1:11434',
  model: 'llama3',
  requestOptions: {
    useMMap: true,
    numThread: Math.max(1, Math.floor(cpuCount / 1)),
  },
});

let vectorStore = null;
let retriever = null;
let retrievalChain = null;
let combineDocsChain = null;
let promptTemplate = null;

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function buildChainsFromVectorStore() {
  if (!vectorStore) return;
  retriever = vectorStore.asRetriever();
  promptTemplate = ChatPromptTemplate.fromTemplate(`
Act as a world-class auditing assistant specializing in concise and factual responses. Given the following context, criteria, and instructions, answer questions based solely on the provided context.
The context provided consists of auditing information that may be related to financial statements, compliance, internal controls, or industry-specific auditing standards.
Review the provided document for relevant information to answer user inquiries. Responses should be direct and factual, ensuring clarity and precision while adhering to the context.

Provide a clear and concise answer based on the context. If the context does not contain sufficient information to respond to the question asked, reply with the exact phrase: "The provided document does not contain information to answer this question."

Strictly utilize only the information available in the provided document when formulating responses. If an answer is not found within the context, provide the pre-determined statement about insufficient information.
Context:
{context}


Question: {input}

Answer:
`);
  combineDocsChain = await createStuffDocumentsChain({
    llm,
    prompt: promptTemplate,
  });
  retrievalChain = await createRetrievalChain({
    retriever,
    combineDocsChain,
  });
}

async function tryRestoreDocsOnStartup() {
  try {
    if (fs.existsSync(DOCS_FILE)) {
      const raw = fs.readFileSync(DOCS_FILE, 'utf-8');
      const docs = JSON.parse(raw);
      if (Array.isArray(docs) && docs.length) {
        vectorStore = await FaissStore.fromDocuments(docs, embeddings);
        await buildChainsFromVectorStore();
        console.log('Restored vector store from saved docs.json');
      }
    }
  } catch (err) {
    console.error('Restore failed:', err.message || err);
  }
}

tryRestoreDocsOnStartup();

app.post('/api/upload', upload.single('document'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  try {
    const pdfData = await pdfParse(req.file.buffer);
    const rawText = pdfData.text || '';

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.createDocuments([rawText]);

    vectorStore = await FaissStore.fromDocuments(docs, embeddings);

    try {
      fs.writeFileSync(DOCS_FILE, JSON.stringify(docs), 'utf-8');
    } catch (err) {
      console.warn('Failed to persist docs to disk:', err.message || err);
    }

    await buildChainsFromVectorStore();

    return res.status(200).json({ message: 'Document processed successfully. Ready for queries.' });
  } catch (error) {
    console.error('Error processing document:', error.message || error);
    return res.status(500).json({ error: 'Failed to process document.' });
  }
});

app.post('/api/query', async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Query is required.' });
  if (!retrievalChain) return res.status(400).json({ error: 'No document has been uploaded and processed yet.' });

  try {
    const result = await retrievalChain.invoke({ input: query });
    const answer = result?.answer ?? 'The provided document does not contain information to answer this question.';
    return res.status(200).json({ answer });
  } catch (error) {
    console.error('Error during query processing:', error.message || error);
    return res.status(500).json({ error: 'Failed to generate answer.' });
  }
});




app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, model = 'llama3', format } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    const payload = {
      model,
      prompt,
      stream: false,
    };

    if (format === 'json') {
      payload.format = 'json';
    }

    const ollamaResponse = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!ollamaResponse.ok) {
      const errText = await ollamaResponse.text();
      console.error('Ollama error:', errText);
      return res.status(502).json({ error: 'Ollama API request failed.' });
    }

    const ollamaData = await ollamaResponse.json();

    let finalResponse = ollamaData.response;

    if (format === 'json' || (typeof ollamaData.response === 'string' && ollamaData.response.trim().startsWith('{'))) {
      try {
        finalResponse = JSON.parse(ollamaData.response);
      } catch (err) {
        console.warn('Ollama response was not valid JSON, returning raw text.', ollamaData.response);

        return res.status(500).json({
          error: "Failed to process AI response",
          message: "The AI model returned a malformed response that was not valid JSON. Please try again."
        });

      }
    }

    if(format === 'json' && typeof finalResponse !== 'object'){
      return res.status(500).json({
        error: "Unexpected AI response",
        message: "The AI model was expected to return a JSON object but did not. This may be a configuration issue."
      });
    }

    return res.json(finalResponse);

  } catch (error) {
    console.error('Error in /api/generate:', error.message || error);
    return res.status(500).json({ error: 'Failed to communicate with the Ollama server.' });
  }
});




app.listen(port, () => {
  console.log(`Backend proxy server listening at http://localhost:${port}`);
});