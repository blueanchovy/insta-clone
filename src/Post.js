import React from 'react'
import './Post.css';
import Avatar from '@mui/material/Avatar';

function Post({userName, caption, imageUrl}) {
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
        </div>
    )
}

export default Post
