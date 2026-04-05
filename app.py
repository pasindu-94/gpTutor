"""Backend utilities for gpTutor."""
from typing import Dict, List
import re

def sanitize_input(text: str, max_len: int = 2000) -> str:
    return re.sub(r'<[^>]+>', '', text.strip())[:max_len]

def format_response(answer: str, sources: List[str], confidence: float) -> Dict:
    return {"answer": answer, "sources": sources, "confidence": round(confidence,2), "disclaimer": "AI-generated. Verify with official sources."}

def categorize_question(q: str) -> str:
    cats = {"math":["equation","calculus","algebra"],"science":["physics","chemistry","biology"],"programming":["code","function","algorithm","python"]}
    ql = q.lower()
    for c,kws in cats.items():
        if any(k in ql for k in kws): return c
    return "general"
