// req > validacao > chama o service > responde o cliente
import { Request, Response } from 'express';

interface UploadPayLoad {
  pageNumber: number;
  text: string;
}

const uploadController = (req: Request, res: Response) => {
  console.log(req.body);

  return res.status(200).json({
    message: 'Upload recebido com sucesso.',
  });
};

export default uploadController;
