import React from "react";
import "./style.css";
import SearchBar from "./SearchBar";
import arrow from "../../assets/arrow.svg";

const SearchKeyword = () => {
  return (
    <section className="search-keyword-wrapper">
      <div className="search-keyword-container">
        <div className="free-trial-box" data-aos="fade" data-aos-once="true">
          Start a <span>FREE TRIAL</span> now, no credit card 💳 or personal
          data required. Only takes a few seconds!
        </div>
        <div className="search-bar-container">
          <div data-aos="fade" data-aos-once="true">
          <img className="search-bar-arrow" src={arrow} alt="" />
          </div>
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default SearchKeyword;
