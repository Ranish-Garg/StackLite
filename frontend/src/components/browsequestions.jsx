import React from "react";
import QuestionCard from "./Question-card";
import "./browsequestions.css"

function Browsequestions() {
  return (
    <>
      <div className="useroptions">
        <div className="searchbar">
          <input type="search" placeholder="Search questions..." />
          <span className="search-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
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

      <QuestionCard />
       <QuestionCard />
    </>
  );
}

export default Browsequestions;
