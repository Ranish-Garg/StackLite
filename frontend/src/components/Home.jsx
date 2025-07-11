import React from "react";
import Button from "./button";
import "./Home.css";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className="upper">
        <h1>Welcome to Q&A Community</h1>
        <p>
          Ask questions and get answers from the community. Join the discussion
          now!
        </p>
        <div className="morebuttons">
          <div className="ask">
            <Link to="/Ask-question"><Button text="Ask a Question" color="#ED6A5A" /></Link>
          </div>
          <div className="browse">
           <Link to="/Questions"><Button text="Browse Questions" color="black" /></Link>
          </div>
        </div>
      </div>
      {/* <div className="info-section">
        <div className="image-container">
          <img
            src="../../public/image1.jpg"
            alt=""
          />
        </div>
        <div className="text-container">
          <h2>Ask Questions</h2>
          <p>Post your queries and get responses from experts</p>
          <h2>Receive Answers</h2>
          <p>Get accurate and diverse answers to your questions</p>
          <h2>Community Interaction</h2>
          <p>Engage with a community of knowledgeable individuals</p>
        </div>
      </div> */}
    </>
  );
}

export default Home;
