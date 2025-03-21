import React, { useEffect } from "react";
import "./Blogs.css";
import img_1 from "../../assets/img-mastering-seo.jpg";
import img_2 from "../../assets/img-ppc-vs-seo.jpg";
import img_3 from "../../assets/img-content-marketing.jpg";
import BlogCard from "./BlogCard";
import ScrollToTop from "../ScrollToTop"

const blogList = [
  {
    img: img_1,
    title: "Mastering SEO in 2025: The Ultimate Guide",
    description:
      "Learn how to optimize your website for search engines using the latest techniques and tools.",
  },
  {
    img: img_2,
    title: "PPC vs. SEO: Which Strategy Works Best?",
    description:
      "A detailed comparison of Pay-Per-Click advertising and Search Engine Optimization to maximize your online presence.",
  },
  {
    img: img_3,
    title: "Content Marketing Trends You Need to Know",
    description:
      "Stay ahead of the competition with these cutting-edge content marketing strategies.",
  }
];


const Blogs = () => {
  
  return (
    <>
      <ScrollToTop/>
    <div className="blogs-container">
      <h2 className="secondary-heading blogs-page-title" data-aos="fade" data-aos-once="true">Blogs</h2>

      <div className="blogs-grid-container">
        {blogList.map((item, idx) => (
          <div  key={idx} className="grid-box" style={{animationDelay : `${idx*0.2}s`}}>
          <BlogCard
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
