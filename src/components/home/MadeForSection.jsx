import React from "react";
import "./style.css"
import icon1 from "../../assets/icon-seo-expert.png";
import icon2 from "../../assets/icon-ppc-professional.png";
import icon3 from "../../assets/icon-content-creators.png";

const MadeForSection = () => {
  return (
    <section className="made-for-wrapper" >
      <div className="made-for-inner">
        <div>
          <h2 className="secondary-heading">Made For You</h2>
          <p className="secondary-description">
            🔹 The ultimate keyword tool for everyone, from beginners to professionals.
          </p>
        </div>
        <div className="made-for-container" data-aos="fade" data-aos-once="true">
          <Part
            icon={icon1}
            title1="SEO"
            title2="Experts"
            description="Find the right keywords to outrank competitors"
          />

          <div className="line" />

          <Part
            icon={icon2}
            title1="PPC"
            title2="Professionals"
            description="Optimize AD campaigns with trending keywords"
          />

          <div className="line" />

          <Part
            icon={icon3}
            title1="Content"
            title2="Creators"
            description="Make content that drives organic traffic"
          />
        </div>
      </div>
    </section>
  );
};

export default MadeForSection;


const Part = ({ icon, title1, title2, description }) => {
  return (
    <div className="made-for-part">
      <img draggable={false} src={icon} alt="" />
      <h2>
        {title1} <span>{title2}</span>
      </h2>
      <p>{description}</p>
    </div>
  );
};
