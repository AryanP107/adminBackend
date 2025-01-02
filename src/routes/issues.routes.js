import express from 'express';
import { createIssue, getAllIssues, updateIssue } from '../controllers/issues.controller.js';
import { auth } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/create', auth, createIssue);
router.get('/getall', getAllIssues);
router.patch('/update', updateIssue);

export default router;