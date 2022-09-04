export const PostCard = ({ title, author, datePosted }) => {
  return (
    <div className="post-card">
      <h2 className="post-card-title"><a>{title}</a></h2>
      <p className="post-card-details">
        <span className="card-detail">{author}</span>
        <span className="card-detail">{datePosted}</span>
      </p>
    </div>
  )
}