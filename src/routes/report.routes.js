import { createReport, getAllReports, updateReport } from '../controllers/report.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import express from 'express';
const router = express.Router();

router.post('/create', auth, createReport);
router.get('/getall', auth, getAllReports);
router.patch('/update', auth, updateReport);

export default router;