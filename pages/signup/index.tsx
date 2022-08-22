import type { NextPage } from 'next';
import { AddUserForm } from 'components/forms';
import { useState } from 'react';
import { StateSetters } from 'utils/types';


export type SignupPageType = SignupPageState & StateSetters<SignupPageState>;
type SignupPageState = {
  addUserForm: {
    email: string, 
    username: string, 
    password: string, 
    role: 'USER' | 'ADMIN'
  },
}

const Signup: NextPage = () => {
  const [addUserForm, setAddUserForm] = useState<SignupPageState["addUserForm"]>({ email: '', username: '', password: '', role: 'USER' });
  // const [result, reexecuteQuery] = useQuery({ query: WelcomeQuery, });

  // const { data, fetching, error } = result;

  // if (fetching) {
  //   return (
  //     <h1>Fetching...</h1>
  //   )
  // }
  // if (error) {
  //   console.log(error);
  //   return (
  //     <h1>Something went wrong...</h1>
  //   )
  // }
  return (
    <div className="page" id="signup-page">
      <AddUserForm addUserForm={addUserForm} setAddUserForm={setAddUserForm}/>
    </div>

  )
}

export default Signup
