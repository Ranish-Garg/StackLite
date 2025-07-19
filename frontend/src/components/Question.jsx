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
  const [reload, setReload] = useState(false);

   const getTimeAgo = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMs = now - created;
    const diffInMinutes = Math.floor(diffInMs / 1000 / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) return `asked ${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    if (diffInHours > 0) return `asked ${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInMinutes > 0) return `asked ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    return "asked just now";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.post(
          `http://localhost:3000/api/v1/question/increaseview/${questionid}`,
          {},
          { withCredentials: true }
        );
        const res = await axios.post(
          `http://localhost:3000/api/v1/question/questionfromid/${questionid}`,
          {},
          { withCredentials: true }
        );
        setQuestion(res.data);
        console.log(res.data)
      } catch (err) {
        console.error("Error fetching question:", err);
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

    fetchData();
    fetchAnswers();
  }, [questionid, reload]);

  const handleAnswerSubmit = async () => {
    if (!answerText.trim()) return;
    try {
      await axios.post(
        `http://localhost:3000/api/v1/answer/uploadanswer/${questionid}`,
        { anstext: answerText },
        { withCredentials: true }
      );
      setAnswerText("");
      setReload(!reload);
    } catch (err) {
      console.error("Failed to submit answer:", err);
      alert("Failed to submit answer. Please try again.");
    }
  };

  const handleUpvote = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/question/upvote/${questionid}`,
        {},
        { withCredentials: true }
      );
      setReload(!reload);
    } catch (err) {
      console.error("Failed to upvote:", err);
    }
  };

  const handleDownvote = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/question/downvote/${questionid}`,
        {},
        { withCredentials: true }
      );
      setReload(!reload);
    } catch (err) {
      console.error("Failed to downvote:", err);
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
          <span> asked by {question.questionby.username}</span> •
          <span> {getTimeAgo(question.createdAt)}</span>
        </div>

        <div className="vote-controls">
          <button className="vote-button" onClick={handleUpvote} title="Upvote">⬆️</button>
          <div className="vote-score">
            <strong>{(question.upvotes?.length || 0) - (question.downvotes?.length || 0)}</strong>
            <span className="vote-label">Score</span>
          </div>
          <button className="vote-button" onClick={handleDownvote} title="Downvote">⬇️</button>
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
