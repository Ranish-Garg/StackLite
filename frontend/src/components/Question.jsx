import React, { useState } from "react";
import "./Question.css";

const QuestionDetail = () => {
  // Dummy hardcoded data
  const question = {
    title: "How to implement user authentication in React with JWT tokens?",
    details:
      "I'm building a React application and need to implement user authentication using JWT tokens. I want to store the token securely and handle automatic logout when the token expires. What's the best approach for this?",
    code: `// sample login function
async function loginUser(credentials) {
  return fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
}`,
    tags: ["react", "authentication", "jwt", "javascript"],
    views: 156,
    upvotes: 42,
    downvotes: 0,
    askedBy: "john_dev",
    askedAt: "2 hours ago",
  };

  const [answerText, setAnswerText] = useState("");
  const [answers, setAnswers] = useState([
    {
      content:
        "You can use localStorage for storing the token and set a timer to logout when it expires.",
    },
    {
      content:
        "Use HTTP-only cookies instead. They're more secure against XSS attacks.",
    },
    {
      content:
        "Consider using context + axios interceptors for automatic logout on token expiry.",
    },
  ]);

  const handleAnswerSubmit = () => {
    if (!answerText.trim()) return;
    setAnswers([...answers, { content: answerText }]);
    setAnswerText("");
  };

  return (
    <div className="question-detail-container">
      <div className="question-box">
        <h2>{question.title}</h2>
        <p>{question.details}</p>

        {question.code && (
          <pre className="code-block">
            <code>{question.code}</code>
          </pre>
        )}

        <div className="question-tags">
          {question.tags.map((tag, i) => (
            <span key={i} className="tagquespage">
              {tag}
            </span>
          ))}
        </div>

        <div className="question-meta">
          <span>{question.views} views</span> •
          <span> asked by {question.askedBy}</span> •
          <span> {question.askedAt}</span>
        </div>

        <div className="vote-controls">
            <div className="upvoteh"> <button disabled title="Upvote">
            ⬆️
          </button>
          <div className="vote-count">{question.upvotes}</div>
          <div className="vote-labels">Upvotes</div></div>
         
          <div className="downvoteh">  <button disabled title="Downvote">
            ⬇️
          </button>
          <div className="vote-count">{question.downvotes}</div>
          <div className="vote-labels">Downvotes</div>
        </div></div>
        
      </div>

      <div className="answers-section">
        <h3>{answers.length} Answers</h3>
        {answers.map((ans, i) => (
          <div key={i} className="answer-box">
            {ans.content}
          </div>
        ))}
      </div>

      <div className="submit-answer">
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Write your answer here..."
        />
        <button onClick={handleAnswerSubmit}>Submit Answer</button>
      </div>
    </div>
  );
};

export default QuestionDetail;
