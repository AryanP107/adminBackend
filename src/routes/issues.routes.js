const express = require('express');
const { createIssue, getAllIssues, updateIssue } = require('../controllers/issues.controller');
const router = express.Router();

router.post('/create',createIssue);
router.get('/getall',getAllIssues);
router.patch('/update',updateIssue);

module.exports = router;