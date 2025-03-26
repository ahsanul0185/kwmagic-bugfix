import React, { useEffect } from "react";
import "./Blogs.css";
import { blogs } from "../blogs";
import BlogCard from "./BlogCard";
import ScrollToTop from "../ScrollToTop"



const Blogs = () => {
  
  return (
    <>
      <ScrollToTop/>
    <div className="blogs-container">
      <h2 className="secondary-heading blogs-page-title" data-aos="fade" data-aos-once="true">Blogs</h2>

      <div className="blogs-grid-container">
        {blogs.map((item, idx) => (
          <div key={idx} className="grid-box" style={{animationDelay : `${idx*0.2}s`}}>
          <BlogCard
            id={item.id}
            img={item.img}
            title={item.title}
            description={item.description}
          />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Blogs;
