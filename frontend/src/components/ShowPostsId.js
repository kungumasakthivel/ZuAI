import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const ShowPostsId = () => {
    const [posts, setPosts] = useState({});
    const [error, setError] = useState(false);
    const { id } = useParams();
    const nav = useNavigate();

    useEffect(() => {
        const getPosts = async() => {
            const result = await fetch('https://zuai-tkx1.onrender.com/posts/' + id, {
                method: 'GET',
            });
            const d = await result.json();
            console.log(d);
            if(d.status === 0) {
                setError(true);
                alert('No value with id' + id);
                nav('/posts');
            }
            setPosts(d.data);
        }
        getPosts()
    }, [id, nav])

  return (
    <div>
      <ul>
        <li>
            <p>{posts.title}</p>
            <p>{posts.body}</p>
        </li>
      </ul>
      {error && <p>No such value with {id}</p>}
    </div>
  )
}

export default ShowPostsId;
