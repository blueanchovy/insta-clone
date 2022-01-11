import React from 'react'
import './Post.css';
import Avatar from '@mui/material/Avatar';

function Post() {
    return (
        <div className='post'>
            {/* header -> avatar + username */}

            <div className="post__header">
                <Avatar className='post__avatar' alt="Manish Jha" src="/static/images/avatar/1.jpg" />
                    
                <h3>Username</h3>
            </div>

            {/* image */}
            <img className='post__image'src='https://reactjs.org/logo-og.png' alt='' />

            {/* username + caption */}
            <h4 className='post__text'><strong>Manish</strong> Learning react these days. It's a lot of fun!</h4>
        </div>
    )
}

export default Post
