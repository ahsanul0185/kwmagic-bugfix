import React from 'react'
import "./style.css"
import img_1 from "../../assets/img-mastering-seo.jpg"
import img_2 from "../../assets/img-ppc-vs-seo.jpg"
import img_3 from "../../assets/img-content-marketing.jpg"
import Slider from 'react-slick'
import { useNavigate } from 'react-router-dom'
import BlogCard from '../blog/BlogCard'

const insights = [
    {
        img: img_1,
        title: "Mastering SEO in 2025: The Ultimate Guide",
        description :"Learn how to optimize your website for search engines using the latest techniques and tools."
    },
    {
        img: img_2,
        title: "PPC vs. SEO: Which Strategy Works Best?",
        description :"A detailed comparison of Pay-Per-Click advertising and Search Engine Optimization to maximize your online presence."
    },
    {
        img: img_3,
        title: "Content Marketing Trends You Need to Know",
        description :"Stay ahead of the competition with these cutting-edge content marketing strategies."
    },
]

const Arrow = ({ className, style, onClick }) => (
    <div className={className} style={{ ...style, display: "block" }} onClick={onClick} />
  );
  

const LatestInsights = () => {

    const navigate = useNavigate();

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
        responsive: [
          { breakpoint: 1560, settings: { slidesToShow: 2, centerMode: true } },
          { breakpoint: 860, settings: { slidesToShow: 1, centerMode: true } },
          { breakpoint: 550, settings: { slidesToShow: 1, centerMode: false, className: "" } }
        ],
      };
    
  return (
      <section className='latest-insight-wrapper'>
          <div className='latest-insight-container' >
              <h2 className='secondary-heading'>Latest Insights & Strategies </h2>
              <p className='secondary-description'>🔹 Stay Ahead with Expert Articles on SEO, PPC, and Content Marketing</p>

              <div className='insight-card-container' data-aos="fade" data-aos-once="true">
                <Slider {...settings}>
                  {insights.map((item, idx) => (
                      <BlogCard key={idx} img={item.img} title={item.title} description={ item.description } />
                  ))}
                  </Slider>
              </div>

              <div className=' more-article-btn'>
              <button onClick={() => navigate("/blogs")} className="card-btn-basic">View More Articles</button>
              </div>
          </div>
    </section>
  )
}

export default LatestInsights

