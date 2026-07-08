// req > validacao > chama o service > responde o cliente
import { Request, Response } from 'express';
import { setDocumentText } from '../services/textStore.js';

interface UploadPayLoad {
  fileName: string;
  documentText: string;
}

const uploadController = (req: Request, res: Response) => {
  try {
    const { fileName, documentText }: UploadPayLoad = req.body;
    if (!fileName || !documentText) {
      return res.status(400).json({ error: 'Texto extraído não recebido.' });
    }

    setDocumentText(documentText);

    return res.status(200).json({
      fileName,
      documentText,
    });
  } catch (error) {
    console.error('Erro ao receber texto.', error);
    res.status(500).json({ error: 'Erro ao processar arquivo.' });
  }
};

export default uploadController;
