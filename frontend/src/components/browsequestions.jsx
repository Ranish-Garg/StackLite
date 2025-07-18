import React, { useEffect, useState } from "react";
import QuestionCard from "./Question-card";
import { Link } from "react-router-dom";
import "./browsequestions.css";
import axios from "axios";

function Browsequestions() {
  const [questions, setquestions] = useState([]);

  useEffect(() => {
    const getallquestions = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/question/getallquestions",
          {},
          { withCredentials: true }
        );
        console.log(response.data);
        setquestions(response.data);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      }
    };

    getallquestions();
  }, []);

  return (
    <>
      <div className="useroptions">
        <div className="searchbar">
          <input type="search" placeholder="Search questions..." />
          <span className="search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search-icon lucide-search"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
          </span>
        </div>

        <div className="sort">
          <select>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="most-voted">Most Voted</option>
          </select>
        </div>

        <button className="sortbtn">Sort</button>
      </div>

      <div className="question-list">
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <Link to={`/question/${question._id || 'default'}`} key={index}>
              <QuestionCard question={question} />
            </Link>
          ))
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
    </>
  );
}

export default Browsequestions;
