import type { NextPage } from 'next';
import AddUserForm from './_addUserForm';
import { useState } from 'react';
import { useQuery } from 'urql';
import { StateSetters } from 'utils/types';

const WelcomeQuery = `
  query  { 
    getUsers {
      username
      email
    }
  }
`
export type HomePageType = HomePageState & StateSetters<HomePageState>;
type HomePageState = {
  addUserForm: {
    email: string, 
    username: string, 
    password: string, 
    role: 'USER' | 'ADMIN'
  },
}

const Home: NextPage = () => {
  const [addUserForm, setAddUserForm] = useState<HomePageState["addUserForm"]>({ email: '', username: '', password: '', role: 'USER' });
  const [result, reexecuteQuery] = useQuery({ query: WelcomeQuery, });

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
    <div className="page" id="home-page">
      <AddUserForm addUserForm={addUserForm} setAddUserForm={setAddUserForm}/>
      <div id="users">
        {data.getUsers.map(user => (
          <li key={user.username}>
            <span>Username: {user.username}, </span>
            <span>Email: {user.email}</span>
          </li>
        ))}
      </div>
    </div>

  )
}

export default Home
