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

  return (
    <div className="page" id="signup-page">
      <AddUserForm addUserForm={addUserForm} setAddUserForm={setAddUserForm}/>
    </div>

  )
}

export default Signup
