import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import uploadRouter from './routes/upload.js';
import chatRouter from './routes/chat.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'https://studypdf-ai.vercel.app',
  }),
);
app.use(express.json());

app.use(uploadRouter);
app.use(chatRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
