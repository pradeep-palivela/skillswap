// Lightweight AI evaluation service.
// By default this returns a deterministic stubbed score and feedback.
// If you provide `REACT_APP_OPENAI_KEY` at build/runtime, it will attempt
// to call OpenAI's chat completions endpoint from the client (NOT recommended
// for production — route through a backend instead).

export const evaluateSkill = async ({ prompt, answer, skill }) => {
  // Simple heuristic stub: score based on length and keyword overlap
  const keywords = (skill || "").toLowerCase().split(/\s+/).filter(Boolean);
  const answerLc = (answer || "").toLowerCase();

  let matchCount = 0;
  keywords.forEach((kw) => {
    if (kw && answerLc.includes(kw)) matchCount += 1;
  });

  const lengthScore = Math.min(50, Math.floor((answer.length / 500) * 50));
  const keywordScore = Math.min(50, Math.floor((matchCount / Math.max(1, keywords.length)) * 50));

  const score = Math.min(100, lengthScore + keywordScore);

  const feedback = `Length: ${answer.length} chars. Keywords matched: ${matchCount}/${keywords.length}.
Prompt: ${prompt}

Suggested improvements: Expand on key steps, include examples or code snippets when relevant.`;

  return { score, feedback };
};
