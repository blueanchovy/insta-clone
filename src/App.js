import React, {useState} from 'react';
import './App.css';
import Post from './Post.js';

function App() {
  const [posts, setPosts] = useState([
    {
      userName : 'zaalimManjha',
      caption : 'Web development is cool!',
      imageUrl : 'https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720__480.jpg'
    },
    {
      userName : 'AngelPriya',
      caption : "I've been learning reactJS, it's a lot of fun! ",
      imageUrl : 'https://reactjs.org/logo-og.png'
    },
    {
      userName : 'AnudeepThakkar',
      caption : "My stack is MERN",
      imageUrl : 'https://www.mindinventory.com/blog/wp-content/uploads/2021/06/mern-stack.png'
    }
  ]);

  return (
    <div className="app">
     

      <div className='app__header'>
        <img className='app__headerImage' src='https://pngimg.com/uploads/instagram/instagram_PNG5.png' alt='' />
      </div>


     { posts.map(post => (
      <Post userName={post.userName} caption={post.caption} imageUrl={post.imageUrl}></Post>
      ))}

      <h1>Hello Friend!</h1>
    </div>
  );
}
  //  https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png
export default App;
