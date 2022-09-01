import { NextPage } from "next";
import { useQuery } from 'urql';
import { Spinner } from "components/loaders";

const TodosQuery = `
  query($authorId: Int!) {
    getPostsByUserId(authorId: $authorId) {
      editorContent {
        content
      }
    }
  }
`;

const Home: NextPage = () => {
  const [results, queryPosts] = useQuery({
    query: TodosQuery,
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
        <ul>
          {posts.map((post, idx) => (
            <li key={idx}>{post.editorContent[0].content}</li>
          ))}
        </ul>
      </div>
    )
  } 
}

export default Home;