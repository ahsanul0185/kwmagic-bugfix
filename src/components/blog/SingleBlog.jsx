import React from 'react'
import { useParams } from 'react-router-dom'
import { blogs } from '../blogs';
import NotFound from '../NotFound';

const SingleBlog = () => {

  const {id} = useParams();

  const blog = blogs.find(blog => blog.id === id);

  if (!blog) return <NotFound />;

  return (
    <div className='single-blog-container'>
      <h1 className='single-blog-title'>{blog.title}</h1>
      <div className='single-blog-image-container' >
        <img src={blog.img} alt="" />
      </div>
      <p className='single-blog-description'>{blog.description}</p>
    </div>
  )
}

export default SingleBlog