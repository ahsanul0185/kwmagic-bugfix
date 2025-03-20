import React, { useState } from 'react'
import "./style.css"
import icon_search from "../../assets/icon-search.svg"
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

  return (
      <div className='search-bar' data-aos="fade-up" data-aos-once="true">
          <div className='search-bar-form'>
              <label htmlFor="search">
                  <img src={icon_search} alt="Search Icon" />
              </label>
              <input 
                  onChange={(e) => setKeyword(e.target.value)} 
                  value={keyword} 
                  className='search-bar-input' 
                  placeholder='Enter keyword ideas..' 
              />
              <button onClick={() => navigate("/signup")} className='card-btn-basic'>
                  🔍 Search
              </button>
          </div>
      </div>
  )
}

export default SearchBar
