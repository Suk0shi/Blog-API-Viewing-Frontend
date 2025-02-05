import Header from './Header'
import { useState, useEffect } from 'react';
import '../styles/Blog.css'

function IndividualPost({id}) {
    const [data, setData] = useState();
    const [message, setMessage] = useState();
    const [comments, setComments] = useState(false);
    console.log(id)
  
    //fetch individual blog post with comments 
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/blog/post/${id}`, {
          mode: 'cors'})
          .then((response) => response.json())
          .then((data) => { console.log(data), setData(data)})
      }, [id, message]);

      const handleSubmit = (e) => {
        e.preventDefault();

      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData);
      
      fetch(`${import.meta.env.VITE_API_URL}/blog/comment/${id}`, {
        method: 'Post', 
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(() => {
        setMessage("Comment Sent");
        
      })
      .catch((err) => {
        setMessage(err.toString());
      });
      
    }

    return (
      <>
        <Header ></Header>
        {(data === undefined) ? <h1>Loading</h1> :
        (typeof(id) !== "string") ? <h1>Reclick the comment section you want</h1> : 
        <div className='postCardContainer'>
          <div className='postCard'>
            <h3>{data.post.name}</h3>
            <p className='date'>{data.post.date}</p>
            <p>{data.post.title}</p>
            <p className='text'>{data.post.text}</p>
            <h3>Comments</h3> 
            {(data.post_comments.length === 0) ? <p>No comments. Be the first?</p> : 
            <div className='commentsContainer'>
              {data.post_comments.map((data, index) => (
              <div className='comments' key={index+`div`}>
                <p key={index+`name`}> {data.name}</p>
                <p className='date' key={index+`date`}> {data.date}</p>
                <p className='text' key={index+`text`}> {data.text}</p>
              </div>
            ))}
            </div>
            }
            <button onClick={e => setComments(!comments)}>Comment</button>
            {(comments === false) ? undefined : <CreateComment id={id} 
            message={message} handleSubmit={handleSubmit}/>}
          </div>
        </div>
        }
      </>
    )
  }

  function CreateComment({id, message, handleSubmit}) {
  
    //fetch if user is logged in 

    return (
      <>
        <form action={`${import.meta.env.VITE_API_URL}/blog/comment/${id}`} method="POST" 
        onSubmit={handleSubmit}>
            <label htmlFor="name"> Name </label>
            <input type="text" name='name' placeholder='name'/>
            <label htmlFor="text"> Text </label>
            <input type="text" name='text' placeholder='text'/>
            <button>Send</button>
        </form>
        <p>{message}</p>
      </>
    )
  }
  
  export default IndividualPost