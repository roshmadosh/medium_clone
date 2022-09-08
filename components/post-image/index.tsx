import Image from 'next/image';
import { useState } from 'react';

type ImageRequestBody = {
  username: string,
  image: File
};

export const PostImage = () => {
  const [imageSrc, setImageSrc] = useState('');
  const onChosenHandler = async (e) => {
    // to prevent memory leak.
    URL.revokeObjectURL(imageSrc);

    const file: File | undefined = e.target.files?.item(0);
    
    if (!file) { 
      return; 
    }
    if (file.size > 1e6) {
      alert('Your image is too large. Please choose a smaller image.');
      e.target.value = null;
    } else {
      // a temporary reference to the file. Need to explicitly remove once not needed to prevent memory leak.
      const objectURL = URL.createObjectURL(file)
      setImageSrc(objectURL);

      sendImage({ username: 'admin', image: file });     
    }
  }

  // FormData can be sent directly as the request body.
  // It streams Blobs (e.g. images), changes content-type to multipart/form-data, all under the hood.
  async function sendImage(body: ImageRequestBody): Promise<void> {
    const formData = new FormData();
    for (const [key, value] of Object.entries(body)) {
      formData.append(key, value);
    }
    await fetch(`/api/images/${body.username}`, {
      body: formData,
      method: 'POST',
    }).then(resp => console.log(resp))
      .catch(err => console.error(err));
  }

  // data URLs are strings => can save to DB. 
  // Can be given directly to the src attribute of an <img> tag. 
  // The string itself looks like 'data: <metadata like image/jpg>, <base64 encoding of image>'
  function convertToDataUrl(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise(function(resolve) {
      reader.onload = function() {
        console.log(reader.result);
       return resolve(reader.result);
      }
    });
  }
    

  return (
    <div id="post-image-container">
      <div id="add-post-image">
        <label htmlFor="post-image-file">+</label>
        <input type="file" 
          name="post-image-file" 
          id="post-image-file" 
          accept="image/*" 
          onChange={onChosenHandler}
        />
      </div>

      <div id="post-image">
        {!imageSrc && <img src="photo-icon.svg" id="photo-placeholder-icon" alt="photo-icon" />}
        {imageSrc && 
          <Image 
            src={imageSrc} 
            layout="fill" 
            objectFit="contain" 
            alt="user provided post image"
          />}
      </div>
    </div>
  )
}