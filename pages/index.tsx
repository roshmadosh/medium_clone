import type { NextPage } from 'next';
import { useQuery } from 'urql';

const WelcomeQuery = `
  query  { 
    getUsers {
      username
      email
    }
  }
`
const Home: NextPage = () => {
  const [result, reexecuteQuery] = useQuery({
    query: WelcomeQuery,
  });

  const { data, fetching, error } = result;
  if (fetching) {
    return (
      <h1>Fetching...</h1>
    )
  }
  if (error) {
    console.log(error);
    return (
      <h1>Something went wrong...</h1>
    )
  }
  return (
    <>
      {data.getUsers.map(user => (
        <li key={user.username}>
          <span>Username: {user.username}, </span>
          <span>Email: {user.email}</span>
        </li>
      ))}
    </>

  )
}

export default Home
