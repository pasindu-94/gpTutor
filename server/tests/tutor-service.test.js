const { sanitizeInput, categorizeQuestion, formatResponse, validateSession } = require('../src/services/tutor-service');

describe('TutorService', () => {
  describe('sanitizeInput', () => {
    test('removes HTML tags', () => {
      expect(sanitizeInput('<script>alert("xss")</script>Hello')).toBe('alertxssHello');
    });
    test('trims whitespace', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello');
    });
    test('truncates long input', () => {
      const long = 'a'.repeat(3000);
      expect(sanitizeInput(long).length).toBe(2000);
    });
    test('handles non-string input', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(123)).toBe('');
    });
  });

  describe('categorizeQuestion', () => {
    test('detects math questions', () => {
      expect(categorizeQuestion('How do I solve this equation?')).toBe('math');
    });
    test('detects programming questions', () => {
      expect(categorizeQuestion('How does a for loop work in Python?')).toBe('programming');
    });
    test('detects science questions', () => {
      expect(categorizeQuestion('What is the biology of cells?')).toBe('science');
    });
    test('returns general for unknown', () => {
      expect(categorizeQuestion('Tell me something interesting')).toBe('general');
    });
  });

  describe('formatResponse', () => {
    test('includes required fields', () => {
      const resp = formatResponse('answer', 'math');
      expect(resp).toHaveProperty('answer', 'answer');
      expect(resp).toHaveProperty('category', 'math');
      expect(resp).toHaveProperty('confidence');
      expect(resp).toHaveProperty('disclaimer');
    });
  });

  describe('validateSession', () => {
    test('accepts valid session IDs', () => {
      expect(validateSession('abc12345')).toBe(true);
      expect(validateSession('session-abc-123')).toBe(true);
    });
    test('rejects invalid session IDs', () => {
      expect(validateSession('')).toBe(false);
      expect(validateSession(null)).toBe(false);
      expect(validateSession('ab')).toBe(false);
    });
  });
});
