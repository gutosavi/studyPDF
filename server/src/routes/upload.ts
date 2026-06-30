import express from 'express';

import uploadController from '../controllers/uploadController';

const router = express.Router();

router.post('/upload', uploadController);

export default router;
