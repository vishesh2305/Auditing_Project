const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

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
