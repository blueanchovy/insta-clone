import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { storage, db } from './firebase.js';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {  addDoc, collection, serverTimestamp } from "firebase/firestore";
import './ImageUpload.css';

function ImageUpload({userName}) {

    const [ caption, setCaption] = useState('');
    const [ image, setImage ] = useState(null);
    const [ progress, setProgress ] = useState(0);  

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);//0 to ensure that when multiple images are selected for upload, only the first one is used
        }
    }
    // const file = useRef(null);
    const handleUpload = () => {
        // e.preventDefault();
        console.log(image);
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log('error');
                alert(error.message);
            }, 
            () => {
                // Handle successful uploads on complete
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log(downloadURL);
                    await addDoc(collection(db, "posts"), {
                        timestamp : serverTimestamp(),
                        caption : caption,
                        imageUrl : downloadURL,
                        userName : userName
                    });

                });

                setProgress(0);
                setCaption("");
                setImage(null);
            }

            
        );
    }


    return (
        <div className="imageUpload">
            <progress className="imageupload__progress" value={progress} max="100" />
            <input type="text" placeholder="Enter a caption..." onChange={event => setCaption(event.target.value)}  value={caption}/>
            <form>
                <input type="file" onChange={handleChange} />
                <Button onClick={handleUpload}>Upload</Button>
            </form>
            
        </div>
    )
}

export default ImageUpload
