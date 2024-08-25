import React, { useEffect, useState } from 'react'

const ShowPosts = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        const getPosts = async() => {
            const result = await fetch('https://zuai-tkx1.onrender.com/posts', {
                method: 'GET',
            });
            const d = await result.json();
            console.log(d.data);
            setPosts(d.data);
        }
        getPosts()
    }, [])

    const addInput = async() => {
      const post = {title, body};
      const result = await fetch('https://zuai-tkx1.onrender.com/posts', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(post)
      })
      console.log(result);
    }

  return (
    <div>
      <div>
        <input type="text" placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <br/>
        <input type="text" placeholder='body' value={body} onChange={(e) => setBody(e.target.value)} />
        <br/>
        <button onClick={addInput}>Add</button>
      </div>
      <ul>
        {posts && posts.map(post => (
          <li key={post.id}>
            <p>{post.title}</p>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShowPosts;
