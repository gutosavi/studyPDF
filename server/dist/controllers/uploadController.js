import { setDocumentText } from '../services/textStore.js';
const uploadController = (req, res) => {
    try {
        const { fileName, documentText } = req.body;
        if (!fileName || !documentText) {
            return res.status(400).json({ error: 'Texto extraído não recebido.' });
        }
        setDocumentText(documentText);
        return res.status(200).json({
            fileName,
            documentText,
        });
    }
    catch (error) {
        console.error('Erro ao receber texto.', error);
        res.status(500).json({ error: 'Erro ao processar arquivo.' });
    }
};
export default uploadController;
