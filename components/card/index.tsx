import Image from "next/image"

export const PostCard = ({ title, author, datePosted, imageUrl }) => {
  return (
    <div className="post-card">
      <div className="post-card-details">
        <h2 className="post-card-title"><a>{title}</a></h2>
        <p className="card-detail">{author}</p>
        <p className="card-detail">{datePosted}</p>
      </div>
      <div className="post-card-image">
        <Image 
            src={imageUrl} 
            layout="fill" 
            objectFit="cover" 
            alt="post image"
          />
      </div>

    </div>
  )
}