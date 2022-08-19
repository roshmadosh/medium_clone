import type { NextPage } from 'next';
import { useQuery } from 'urql';

const WelcomeQuery = `
  query ($name: String){ 
    hello(name: $name)
  }
`

const Home: NextPage = () => {
  const [result, reexecuteQuery] = useQuery({
    query: WelcomeQuery,
    variables: { name: 'hiroshi' },
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
      <h1>{data.hello}</h1>
    </>

  )
}

export default Home
