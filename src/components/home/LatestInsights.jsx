import React from 'react'
import "./style.css"
import { blogs } from '../blogs'
import Slider from 'react-slick'
import { useNavigate } from 'react-router-dom'
import BlogCard from '../blog/BlogCard'


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
                  {blogs.map((item, idx) => ( item.latest &&
                      <BlogCard id={item.id} key={idx} img={item.img} title={item.title} description={ item.description } />
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

