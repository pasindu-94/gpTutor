const CATEGORY_KEYWORDS = {
  math: ['equation', 'calculus', 'algebra', 'geometry', 'integral', 'derivative', 'matrix', 'vector'],
  science: ['physics', 'chemistry', 'biology', 'experiment', 'hypothesis', 'molecule', 'force'],
  programming: ['code', 'function', 'algorithm', 'debug', 'python', 'javascript', 'api', 'loop'],
  history: ['war', 'century', 'civilization', 'revolution', 'dynasty', 'empire'],
};

function sanitizeInput(input, maxLength = 2000) {
  if (typeof input !== 'string') return '';
  let cleaned = input.trim();
  cleaned = cleaned.replace(/<[^>]+>/g, '');
  cleaned = cleaned.replace(/[<>'"&]/g, '');
  return cleaned.slice(0, maxLength);
}

function categorizeQuestion(question) {
  const lower = question.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      return category;
    }
  }
  return 'general';
}

function formatResponse(answer, category, sources = []) {
  return {
    answer,
    category,
    sources,
    confidence: 0.85,
    timestamp: new Date().toISOString(),
    disclaimer: 'AI-generated content. Please verify with official sources.',
  };
}

function validateSession(sessionId) {
  if (!sessionId || typeof sessionId !== 'string') return false;
  return /^[a-zA-Z0-9-]{8,64}$/.test(sessionId);
}

module.exports = { sanitizeInput, categorizeQuestion, formatResponse, validateSession };
