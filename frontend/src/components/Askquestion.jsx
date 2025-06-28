import React, { useState } from "react";
import "./Askquestion.css";
import axios from "axios";

function AskQuestion() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [code, setCode] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  // Add tag function
  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setTagInput(""); // Clear input
  };

  // Delete tag function
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle Enter key for tag input
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

 
  const handleSubmit = async () => {
    const questionData = {
      title,
      details,
      code,
      tags,
    };

    console.log("Submitted data:", questionData);

   
     try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/question/addquestion", 
        questionData,
        { 
          withCredentials: true, 
        }
      );

      console.log("Question submitted:", response.data);
      alert("Your question was posted successfully!");

      // clear the form
      setTitle("");
      setDetails("");
      setCode("");
      setTags([]);
    } catch (error) {
      console.error("Error posting question:", error.response?.data || error.message);
      alert("Failed to post question.");
    }
  };

  

  return (
    <>
    <div className="ask-container">
      <h1>Ask a Question</h1>
      <p className="ask-description">
        Be specific and imagine you’re asking a question to another person
      </p>

      {/* Title */}
      <div className="form-group">
        <label htmlFor="title">
          Title <span className="required">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. How can I create a responsive navigation menu in React?"
          maxLength="150"
        />
      </div>

      {/* Details */}
      <div className="form-group">
        <label htmlFor="details">
          What are the details of your problem? <span className="required">*</span>
        </label>
        <p className="sub-description">
          Introduce the problem and expand on what you put in the title. Minimum 20 characters.
        </p>
        <textarea
          id="details"
          placeholder="Describe your problem in detail..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>

      {/* Code */}
      <div className="form-group">
        <label htmlFor="code">Code (Optional)</label>
        <p className="sub-description">
          Include any relevant code that demonstrates your problem
        </p>
        <textarea
          id="code"
          placeholder={`// Paste your code here\nfunction example() {\n  // Your code\n}`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      {/* Tags */}
      <div className="form-group">
        <label htmlFor="tags">
          Tags <span className="required">*</span>
        </label>
        <p className="sub-description">Add tags to describe what your question is about</p>

        <div className="tag-section">
          <div className="tags-input">
            <div className="tagbar">
              <input
                type="text"
                placeholder="Type to add tags..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
              />
              <div className="add" onClick={handleAddTag}>Add</div>
            </div>

            <div className="tags">
              {tags.map((tag) => (
                <div className="tag" key={tag}>
                  <span>{tag}</span>
                  <svg
                    onClick={() => handleRemoveTag(tag)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x-icon lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div className="popular-tags">
            <div className="populartext">Some popular tags</div>
            {["javascript", "python", "react", "html", "css"].map((tag) => (
              <span
                key={tag}
                onClick={() => {
                  if (!tags.includes(tag)) setTags([...tags, tag]);
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="form-actions">
        <button className="post-btn" onClick={handleSubmit}>
          Post Your Question
        </button>
      </div>
    </div>
    </>
  );
}

export default AskQuestion;
