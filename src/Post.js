import React, {useState, useEffect} from 'react'
import './Post.css';
import { db } from './firebase';
import { doc, collection, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import Avatar from '@mui/material/Avatar';


function Post({postId, userName, user, caption, imageUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        const postX = doc(db, 'posts', postId);
        if(postId){
            unsubscribe = onSnapshot(collection(postX, 'comments'), (snapshot) =>
            setComments(snapshot.docs.map((doc) => doc.data())));
        }
        
        return () => {
            unsubscribe();
        };
    }, [postId]);


    const postComment = (async (event) => {
        event.preventDefault();
        const postY = doc(db, 'posts', postId);
        await addDoc(collection(postY, 'comments'), {
            text : comment,
            username : user.displayName,
            timestamp : serverTimestamp()
        });
        setComment('');
    });

    return (
        <div className='post'>
            {/* header -> avatar + username */}

            <div className="post__header">
                <Avatar className='post__avatar' alt="Manish Jha" src="/static/images/avatar/1.jpg" />
                    
                <h3>{userName}</h3>
            </div>

            {/* image */}
            <img className='post__image' src={imageUrl} alt='' />

            {/* username + caption */}
            <h4 className='post__text'><strong>{userName}</strong> {caption}</h4>

            <div className="post__comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>
            

            { user && (
                <form className="post__commentBox">
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="post__button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >
                    Post
                    </button>
                </form>
            )}
            
        </div>

        
    )
}

export default Post
