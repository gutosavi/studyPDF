import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
const genAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Mensagem não fornecida' });
    }

    const response = await genAi.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('Erro ao chamar Gemini:', error);
    res.status(500).json({ error: 'Erro ao processar a mensagem.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
