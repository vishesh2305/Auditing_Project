const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { Ollama } = require('@langchain/community/llms/ollama');
const { OllamaEmbeddings } = require("@langchain/community/embeddings/ollama");
const { FaissStore } = require("@langchain/community/vectorstores/faiss");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { createStuffDocumentsChain } = require("langchain/chains/combine_documents");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { createRetrievalChain } = require("langchain/chains/retrieval");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const llm = new Ollama({
    baseUrl: "http://127.0.0.1:11434",
    model: "llama3",
});

const embeddings = new OllamaEmbeddings({
    baseUrl: "http://127.0.0.1:11434",
    model: "llama3",
    requestOptions: {
        useMMap: true,
        numThread: 6,
        numGpu: 1,
    },
});


let vectorStore;

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

app.post('/api/upload', upload.single('document'), async (req, res) => {
    if(!req.file){
        return res.status(400).json({error: 'No file uploaded.'});
    }

    try{
        console.log('Received file: ', req.file.originalname);

        const pdfData = await pdfParse(req.file.buffer);
        const rawText = pdfData.text;
        console.log('Successfully parsed PDF text.');

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const docs = await textSplitter.createDocuments([rawText]);
        console.log(`Split document into ${docs.length} chunks.`);

        console.log('Creating vector store....');
        vectorStore = await FaissStore.fromDocuments(docs, embeddings);
        console.log('Vector store created successfully.');

        res.status(200).json({message: 'Document processed successfully. Ready for queries.'});
    } catch(error){
        console.log('Error processing document: ', error);
        res.status(500).json({error: 'Failed to process document. '});
    }
});




app.post('/api/query', async(req,res) => {
    const {query} = req.body;

    if(!query){
        return res.status(400).json({error: 'Query is required.'});
    }
    if(!vectorStore){
        return res.status(400).json({error: 'No document has been uploaded and processed yet. '});
    }

    try{
        console.log('Received query: ', query);

const prompt = ChatPromptTemplate.fromTemplate(`
You are an expert auditing assistant. Your role is to analyze the provided context from a document and answer the user's question based *only* on that context.

- Your answer should be clear, concise, and directly address the user's question.
- Use basic markdown for formatting (like bullet points using '*' or bolding using '**') to make the answer easy to read.
- Do not include any preamble like "Based on the context..." or "The answer is...". Provide the answer directly.
- If the context does not contain the answer, your *only* response MUST be: "The provided document does not contain information to answer this question."
- Do not invent or assume any information outside the given context.

Context:
{context}

Question: {input}

Answer:
`);

        const combineDocsChain = await createStuffDocumentsChain({
            llm:llm,
            prompt: prompt,
        });

        const retriever = vectorStore.asRetriever();

        const retrievalChain = await createRetrievalChain({
            retriever: retriever,
            combineDocsChain: combineDocsChain,
        });


        const result = await retrievalChain.invoke({input: query});

        console.log('Generated answer successfully.');
        res.status(200).json({answer: result.answer});
    } catch(error){
        console.error('Error during query processing:', error);
        res.status(500).json({error: 'Failed to generate answer.'});
    }
});



app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        console.log('Forwarding prompt to Ollama, requesting JSON format.');

const ollamaResponse = await fetch('http://127.0.0.1:11434/api/generate', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        model: "llama3",
        prompt: prompt,
        stream: false,
        format: "json"
    }),
});


        if (!ollamaResponse.ok) {
            const errorText = await ollamaResponse.text();
            throw new Error(`Ollama API request failed ${errorText}`);
        }

        const ollamaData = await ollamaResponse.json();

        const parsedResponse = JSON.parse(ollamaData.response);

        console.log('Received and parsed structured response from Ollama.');

        res.json(parsedResponse);

    } catch (error) {
        console.error('Error in proxy server:', error);
        res.status(500).json({ error: 'Failed to communicate with the Ollama server.' });
    }
});

app.listen(port, () => {
    console.log(`Backend proxy server listening at http://localhost:${port}`);
});
