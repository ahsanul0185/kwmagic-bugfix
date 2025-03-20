import React from "react";
import "./style.css";
import icon_tick from "../../assets/icon-tick.svg";
import img_ai_keyword_research from "../../assets/img-ai-keyword-research.png";
import { useNavigate } from "react-router-dom";

const AiKeywordResearch = () => {

    const navigate = useNavigate();

  return (
    <section className="ai-keyword-wrapper">
      <div className="section-sidbar-img-inner">
        <div data-aos="fade" data-aos-once="true" className="section-sidebar">
          <h2 className="section-sidebar-title">
            AI Assistant for <span>Keyword Research</span>
          </h2>

          <p className="section-sidebar-tagline">
            Not sure if the keyword is right for you?
          </p>

          <ul className="section-sidebar-list">
            <li>
              <img src={icon_tick} alt="" />
              <span>Single click keyword analysis</span>
            </li>
            <li>
              <img src={icon_tick} alt="" />
              <span>Discover the real keyword intent</span>
            </li>
            <li>
              <img src={icon_tick} alt="" />
              <span>Find more related keywords and tags</span>
            </li>
          </ul>

          <button onClick={() => navigate("/signup")} className="card-btn-basic">
              🚀 Try AI Insights Now
          </button>
        </div>

        <img
          data-aos="fade-left"
          data-aos-once="true"
          className="section-sidebar-image"
          src={img_ai_keyword_research}
          alt=""
        />
      </div>
    </section>
  );
};

export default AiKeywordResearch;
