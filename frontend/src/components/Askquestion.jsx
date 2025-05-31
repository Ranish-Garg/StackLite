import React from "react";
import "./Askquestion.css";

function AskQuestion() {
  return (
    <div className="ask-container">
      <h1>Ask a Question</h1>
      <p className="ask-description">
        Be specific and imagine you’re asking a question to another person
      </p>

      <div className="form-group">
        <label htmlFor="title">
          Title <span className="required">*</span>
        </label>
        <input
          id="title"
          type="text"
          placeholder="e.g. How can I create a responsive navigation menu in React?"
          maxLength="150"
        />
      </div>

      <div className="form-group">
        <label htmlFor="details">
          What are the details of your problem?{" "}
          <span className="required">*</span>
        </label>
        <p className="sub-description">
          Introduce the problem and expand on what you put in the title. Minimum
          20 characters.
        </p>
        <textarea
          id="details"
          placeholder="Describe your problem in detail..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="code">Code (Optional)</label>
        <p className="sub-description">
          Include any relevant code that demonstrates your problem
        </p>
        <textarea
          id="code"
          placeholder={`// Paste your code here
function example() {
  // Your code
}`}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">
          Tags <span className="required">*</span>
        </label>
        <p className="sub-description">
          Add tags to describe what your question is about
        </p>
        <div className="tag-section">
          <div className="tags-input">
            <div className="tagbar">
              <input type="text" placeholder="Type to add tags..." />
              <div className="add">Add</div>
            </div>
            <div className="tags">
              <div className="tag">
                <span>javascript</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-x-icon lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </div>
              
            </div>
          </div>

          <div className="popular-tags">
            <div className="populartext">Some popular tags</div>
            <span>javascript</span>
            <span>python</span>
            <span>react</span>
            <span>html</span>
            <span>css</span>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button className="post-btn">Post Your Question</button>
      </div>
    </div>
  );
}

export default AskQuestion;
