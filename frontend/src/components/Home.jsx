import React from "react";
import Button from "./button";
import "./Home.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [user, setuser] = useState(null);

  useEffect(() => {
    const getCurrentuser = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/users/getcurrentuser",
          {},
          {
            withCredentials: true,
          }
        );

        console.log("Current user:", response.data.user);
        setuser(response.data.user);
      } catch (error) {
        console.error(
          "Failed to fetch current user:",
          error.response?.data || error.message
        );
        return null;
      }

     
    };
    
     getCurrentuser();
  },[]);

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
            <Link to="/Ask-question">
              <Button text="Ask a Question" color="#ED6A5A" />
            </Link>
          </div>
          <div className="browse">
            <Link to="/Questions">
              <Button text="Browse Questions" color="black" />
            </Link>
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
