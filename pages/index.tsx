import { NextPage } from "next";
import { useQuery } from 'urql';
import { Spinner } from "components/loaders";
import { PostCard } from "components/card";

const PostsQuery = `
  query($authorId: Int!) {
    getPostsByUserId(authorId: $authorId) {
      createdAt
    	author {
        email
        username
      }
      editorContent {
        content
      }
    }
  }
`;

const Home: NextPage = () => {
  const [results, queryPosts] = useQuery({
    query: PostsQuery,
    variables: {
      authorId: 36
    },
  });

  const { data, fetching, error } = results;

  if (fetching) {
    return <Spinner />
  }
  
  if (error) {
    return <h3>Error while fetching Posts.</h3>
  }

  if (data) {
    const posts = data.getPostsByUserId;
    return(
      <div className="page" id="home-page">
        <h1>My posts</h1>
        <ul  id="posts">
          {posts.map((post, idx) => (
            <PostCard 
              title={post.editorContent[0].content}
              datePosted={new Date(+post.createdAt).toDateString()}
              author={post.author.username}
              key={idx}
              imageUrl={"/api/images/work-in-progress.jpg"}
            />
          ))}
        </ul>
      </div>
    )
  } 
}

export default Home;