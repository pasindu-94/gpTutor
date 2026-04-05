const express = require('express');
const { logger } = require('../logger');
const { sanitizeInput, categorizeQuestion, formatResponse } = require('../services/tutor-service');

const router = express.Router();

router.post('/ask', async (req, res) => {
  try {
    const { question, subject, sessionId } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required and must be a string' });
    }

    const sanitized = sanitizeInput(question);
    const category = subject || categorizeQuestion(sanitized);

    logger.info(`Processing question in category: ${category}`, { sessionId });

    const answer = await generateAnswer(sanitized, category);
    const response = formatResponse(answer, category);

    res.json(response);
  } catch (error) {
    logger.error('Error processing question', { error: error.message });
    res.status(500).json({ error: 'Failed to process question' });
  }
});

router.get('/categories', (_req, res) => {
  res.json({
    categories: ['math', 'science', 'programming', 'history', 'general'],
  });
});

router.get('/history/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);
  res.json({ sessionId, history: [], limit });
});

async function generateAnswer(question, category) {
  return `This is a generated answer for your ${category} question: "${question}"`;
}

module.exports = router;
