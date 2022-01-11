import React from 'react';
import './App.css';
import Post from './Post.js';

function App() {
  return (
    <div className="app">
     

      <div className='app__header'>
        <img className='app__headerImage' src='https://pngimg.com/uploads/instagram/instagram_PNG5.png' alt='' />
      </div>

      <Post />

      <Post />
      <Post />
      <Post />

      <h1>Hello Friend!</h1>
    </div>
  );
}
  //  https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png
export default App;
