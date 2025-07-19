import React, { useEffect, useState } from 'react';
import './Question-card.css';
import axios from 'axios';

const QuestionCard = ({ question }) => {
  const {
    views,
    title,
    details,
    tags,
    createdAt,
    upvotes = [],
    downvotes = [],
    questionby,
  } = question;


 

  const [answerCount,setanswerCount] = useState(0)

   const fetchAnswers = async (questionid) => {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/v1/question/getallanswerstoquestion/${questionid}`,
          {},
          { withCredentials: true }
        );
        console.log(res)
       setanswerCount(res.data.length)
      } catch (err) {
        console.error("Failed to fetch answers:", err);
      }
    };


     useEffect(()=>
  {
    fetchAnswers(question._id)
  },[]);

  const username = questionby?.username || "Unknown";

  // Calculate time since question was asked (in hours or minutes)
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

  const voteCount = upvotes.length ;
 

  return (
    <div className="question-card">
      <div className="question-stats">
        <div className="votes">
          <strong>{voteCount}</strong>
          <span> votes</span>
        </div>
        <div className="answers">
          <strong>{answerCount}</strong>
          <span> answers</span>
        </div>
        <div className="views"> 
          <strong>{views}</strong>
          <span> views</span>
        </div>
      </div>

      <div className="question-content">
        <h3>{title}</h3>
        <p className="question--details">{details}</p>

        <div className="tagsqcard">
          {tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>

        <div className="author">
          <div className="avatar"></div>
          <div>
            <span>{username}</span>
            <span>{getTimeAgo(createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
