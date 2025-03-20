import React from 'react'

const BlogCard = ({img, title, description}) => {

    return (
        <div className='insight-card'>
            <div className='insight-card-image'>
            <img src={img} alt="" />
            </div>
            <h2 className='insight-card-title'>{title}</h2>
            <p className='insight-card-description'>{ description}</p>
        </div>
    )

}

export default BlogCard