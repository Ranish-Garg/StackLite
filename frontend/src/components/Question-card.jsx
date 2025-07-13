
import React from 'react';
import './Question-card.css';

const QuestionCard = () => {

  const dummyobject ={
    votes: 42,
    answers: 3,
    views : 156,
    title :" How to implement user authentication in React with JWT tokens?",
    details : ` I'm building a React application and need to implement user authentication using JWT tokens.
          I want to store the token securely and handle automatic logout when the token expires.What's the best approach for this`,
    tags : ["javascipt" , "react","node.js"]  ,
    username : "john_dev"   ,
    asktime : 2,
  }
  return (
    <div className="question-card">
      <div className="question-stats">
        <div className="votes">
          <strong>42</strong>
          <span> votes</span>
        </div>
        <div className="answers">
          <strong>3</strong>
          <span> answers</span>
        </div>
        <div className="views"> 
          <strong>156</strong>
          <span> views</span>
        </div>
      </div>

      <div className="question-content">
        <h3>How to implement user authentication in React with JWT tokens?</h3>
        <p>
          I'm building a React application and need to implement user authentication using JWT tokens.
          I want to store the token securely and handle automatic logout when the token expires.
          What's the best approach for this?
        </p>

        <div className="tagsqcard">
          <span>react</span>
          <span>authentication</span>
          <span>jwt</span>
          <span>javascript</span>
        </div>

        <div className="author">
          <div className="avatar"></div>
          <div>
            <span>john_dev</span>
            <span>asked 2 hours ago</span>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
