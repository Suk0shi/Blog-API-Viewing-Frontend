import { useState } from 'react'
import Header from './components/Header'
import { useEffect } from 'react';
import { Link } from "react-router-dom";

import './styles/Blog.css'
import './App.css'

function App({setId, setEditInfo}) {

  const [blogData, setBlogData] = useState()
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/blog/posts`, {
      mode: 'cors'})
      .then((response) => response.json())
      .then((data) => { console.log(data), setBlogData(data)})
  }, [ ]);

  
  function Card({data, setId}) {
  return (<div className='postCardContainer'>
    {data.map((data, index) => (
      <div className='postCard' key={index+`div`}>
        <h3 key={index+`name`}> {data.name}</h3>
        <p className='date' key={index+`date`}> {data.date}</p>
        <p key={index+`title`}> {data.title}</p>
        <p className='text' key={index+`text`}> {data.text}</p>
        <Link to="/IndividualPost" onClick={e => setId(data._id)}>
          Comments
        </Link>
      </div>
    ))}
  </div>)  
  }

  return (
    <>
      {/* display blog posts */}
      <Header></Header>
      {(blogData === undefined) ? <h1>Loading</h1> :
      <Card data = {blogData.post} setId={setId}/>}
    </>
  )
}

export default App