import { createReport, getAllReports, updateReport } from '../controllers/report.controller.js';

import express from 'express';
const router = express.Router();

router.post('/create', createReport);
router.get('/getall', getAllReports);
router.patch('/update', updateReport);

export default router;