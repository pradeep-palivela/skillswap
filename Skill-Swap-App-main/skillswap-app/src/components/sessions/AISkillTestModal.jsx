import React, { useState } from "react";
import { evaluateSkill } from "../../services/aiService";

const AISkillTestModal = ({ session, onClose }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await evaluateSkill({
        prompt: question,
        answer,
        skill: session.skillToTeach || session.skillToLearn,
      });
      setResult(res);
    } catch (err) {
      setResult({ score: 0, feedback: "Error evaluating answer." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">AI Skill Test</h3>
          <button className="text-red-500" onClick={onClose}>Close</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm mb-1">Question / Prompt</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded mb-3 dark:bg-gray-700"
            rows={3}
            required
          />

          <label className="block text-sm mb-1">User Answer</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-2 border rounded mb-3 dark:bg-gray-700"
            rows={4}
            required
          />

          <div className="flex items-center space-x-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              {loading ? "Evaluating..." : "Evaluate"}
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-4 p-4 border rounded bg-gray-50 dark:bg-gray-900">
            <h4 className="font-semibold">Score: {result.score}/100</h4>
            <p className="mt-2 text-sm whitespace-pre-wrap">{result.feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISkillTestModal;
