import React , { useState, useEffect } from 'react';
import './App.css';
import ImageUpload from './ImageUpload';
import Post from './Post.js';
import { auth, db } from './firebase.js';
import { collection, onSnapshot } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

//style for modals(dialog box)
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}; 

function App() {

  const [ posts, setPosts ] = useState([]);
  const [ open, setOpen ] = useState(false);
  const [ userName, setUserName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ user, setUser ] = useState(null);
  const [ openSignIn, setOpenSignIn] = useState(false);

  

  // Hook for detecting change in database and reflecting the same in feed
  useEffect(() => {
    onSnapshot(collection(db,'posts'), (snapshot) =>
     setPosts(snapshot.docs.map((doc) => ({
       id : doc.id,
      post : doc.data()
    }
    ))));
  }, []);

  // Hook for reflecting if a user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in
        console.log(authUser)
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, userName]);

  // Function to create new user
  const signUp = (event) => {
    event.preventDefault(); 

    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      return updateProfile(auth.currentUser, {
        displayName: userName
      })
    })
    .catch((error) => alert(error.message));

    setOpen(false);
  };

  // Function to login existing user
  const signIn = (event) => {
    event.preventDefault(); 

    signInWithEmailAndPassword(auth, email, password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };


  return (
    <div className="app">
      
      

      {/* Modal for signing up */}

      <Modal  
        open={open}
        onClose={() => setOpen(false)}//will close if clicked anywhere else on screen
      >
        
          <Box sx={style}>
            
              <center>
                  <div className='app__header'>
                    <img className='app__headerImage' src='https://pngimg.com/uploads/instagram/instagram_PNG5.png' alt='' />
                  </div>
                  <form className="app__signup">
                      <Input
                        type="text"
                        placeholder="username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}>
                      </Input>

                      <Input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                      </Input>

                      <Input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                      </Input>

                      <Button onClick={signUp} type="submit">Sign Up</Button>
                  </form>
              </center>
            
          </Box>
        
      </Modal>
     
      {/* Modal for signing in*/}

      <Modal  
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}//will close if clicked anywhere else on screen
      >
        
          <Box sx={style}>
            
              <center>
                  <div className='app__header'>
                    <img className='app__headerImage' src='https://pngimg.com/uploads/instagram/instagram_PNG5.png' alt='' />
                  </div>
                  <form className="app__signup">

                      <Input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                      </Input>

                      <Input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                      </Input>

                      <Button onClick={signIn} type="submit">Sign In</Button>
                  </form>
              </center>
            
          </Box>
        
      </Modal>
     

      {/* Header */}
      <div className='app__header'>
        <img className='app__headerImage' src='https://pngimg.com/uploads/instagram/instagram_PNG5.png' alt='' />

        {/* Login/Signup Container */}
        { user ? (
          <Button variant="text" onClick={() => signOut(auth)}>Logout</Button>
        ): (
          <div className="app__loginContainer">
            <Button variant="text" onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button variant="text" onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
          
        )
        }
      </div>

      


      

    {/* Upload image widget */}

    <div>
      {user?.displayName ? (
        <ImageUpload userName={user.displayName} />
      ):(
        <center>
          <h3>Sign Up/Sign In to upload or comment</h3>
        </center>
        
      )}
    </div>
      

    {/* Posts */}
      
        <div className="app__posts">
          <center>
            { posts.map(({id, post}) => (
              <Post key={id} postId={id} user={user} userName={post.userName} caption={post.caption} imageUrl={post.imageUrl}></Post>
              ))}
          </center>
        </div>
      
      
    

    <h1>Hello Friend!</h1>
    </div>
    );
}

export default App;


  //  https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png

// {
    //   userName : 'zaalimManjha',
    //   caption : 'Web development is cool!',
    //   imageUrl : 'https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720__480.jpg'
    // },
    // {
    //   userName : 'AngelPriya',
    //   caption : "I've been learning reactJS, it's a lot of fun! ",
    //   imageUrl : 'https://reactjs.org/logo-og.png'
    // },
    // {
    //   userName : 'AnudeepThakkar',
    //   caption : "My stack is MERN",
    //   imageUrl : 'https://www.mindinventory.com/blog/wp-content/uploads/2021/06/mern-stack.png'
    // }