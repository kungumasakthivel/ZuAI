import './App.css';
import ShowPosts from './components/ShowPosts';
import ShowPostsId from './components/ShowPostsId';
import {Routes, Route, Navigate} from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path='/posts' element={<ShowPosts/>}/>
        <Route path='/posts/:id' element={<ShowPostsId/>}/>
      </Routes>
    </>
  );
}

export default App;
