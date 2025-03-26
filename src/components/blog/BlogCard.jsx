import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({id, img, title, description}) => {

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/blog/${id}`)} className='insight-card'>
            <div className='insight-card-image'>
            <img src={img} alt="" />
            </div>
            <h2 className='insight-card-title'>{title}</h2>
            <p className='insight-card-description'>{ description}</p>
        </div>
    )

}

export default BlogCard