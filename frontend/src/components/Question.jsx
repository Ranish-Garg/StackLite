import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Question.css";
import axios from "axios";

const QuestionDetail = () => {
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answerText, setAnswerText] = useState("");
  const [reload , setreload] = useState(false)

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/v1/question/questionfromid/${questionid}`,
          {},
          { withCredentials: true }
        );
        setQuestion(res.data);
      } catch (err) {
        console.error("Failed to fetch question:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchAnswers = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/v1/question/getallanswerstoquestion/${questionid}`,
          {},
          { withCredentials: true }
        );
        setAnswers(res.data);
      } catch (err) {
        console.error("Failed to fetch answers:", err);
      }
    };

    fetchQuestion();
    fetchAnswers();
  }, [questionid,reload]);

  const handleAnswerSubmit = async () => {
  if (!answerText.trim()) return;

  try {
    const res = await axios.post(
      `http://localhost:3000/api/v1/answer/uploadanswer/${questionid}`,
      { anstext: answerText },
      { withCredentials: true }
    );

    console.log(res)
    setreload(!reload)
  } catch (err) {
    console.error("Failed to submit answer:", err);
    alert("Failed to submit answer. Please try again.");
  }
};

  if (loading) return <p>Loading question...</p>;
  if (!question) return <p>Question not found.</p>;

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
            <span key={i} className="tagquespage">{tag}</span>
          ))}
        </div>

        <div className="question-meta">
          <span>{question.views} views</span> •
          <span> asked by {question.askedBy}</span> •
          <span> {question.askedAt}</span>
        </div>

        <div className="vote-controls">
          <div className="upvoteh">
            <button disabled title="Upvote">⬆️</button>
            <div className="vote-count">{question.upvotes}</div>
            <div className="vote-labels">Upvotes</div>
          </div>

          <div className="downvoteh">
            <button disabled title="Downvote">⬇️</button>
            <div className="vote-count">{question.downvotes}</div>
            <div className="vote-labels">Downvotes</div>
          </div>
        </div>
      </div>

      <div className="answers-section">
        <h3>{answers.length} Answers</h3>
        {answers.map((ans, i) => (
          <div key={i} className="answer-box">
            <p>{ans.anstext}</p>
            <small>
              Answered by <strong>{ans.answeredby?.username || "Unknown"}</strong> •{" "}
              {new Date(ans.createdAt).toLocaleString()}
            </small>
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
