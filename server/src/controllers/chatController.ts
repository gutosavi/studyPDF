import 'dotenv/config';
import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { documentText } from '../services/textStore';
import promptService from '../services/promptService';

const genAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function chatController(req: Request, res: Response) {
  try {
    if (!documentText) return;

    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Mensagem não fornecida' });
    }

    const response = await genAi.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptService(documentText, message),
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('Erro ao chamar Gemini:', error);
    res.status(500).json({ error: 'Erro ao processar a mensagem.' });
  }
}

export default chatController;
