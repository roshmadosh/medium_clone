import Image from 'next/image';
import { useState } from 'react';

export const PostImage = () => {
  const [imageSrc, setImageSrc] = useState('');
  const onChosenHandler = async (e) => {
    const file: File = e.target.files.item(0);
    if (file.size > 1e7) {
      alert('Your image cannot be greater than 10MB in size.');
      e.target.value = null;
    }
    setImageSrc(URL.createObjectURL(file));
  }

  return (
    <div id="post-image-container">
      <input type="file" name="post-image-file" id="post-image-file" accept="image/*" onChange={onChosenHandler}/>
      <div id="post-image">
        {imageSrc && 
          <Image 
            src={imageSrc} 
            layout="fill" 
            objectFit="contain" 
            alt="post-image"
          />}
      </div>
    </div>
  )
}