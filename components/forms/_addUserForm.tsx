import { useMutation } from "urql";
import { SignupPageType } from "pages/signup";
import { Spinner } from "components/loaders";

// mutations require you return a field. 
const AddUser = `
  mutation ($input: UserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

export function AddUserForm({ addUserForm, setAddUserForm }: SignupPageType) {
  // result has .data property that's undefined until addUser() is called. addUser() performs mutation.
  const [addUserResult, addUser] = useMutation(AddUser);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    await addUser({ input: addUserForm })
      .then(result => {
        // Error can be result of faulty query or an error thrown by Prisma in DAO layer. Use addUserResult.error for rendered effects,
        // only side-effects should go here.
        if (result.error) {
          console.error(result.error)
        } else {
          // result object contains GQL queried fields. Mutations usually won't require any returned fields.
        };
      });
  }

  return (
    <form action="" method="post" autoComplete="off" onSubmit={onSubmitForm}>
      <div id="add-user-content">
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" required onChange={(e) => setAddUserForm({...addUserForm, email: e.target.value })} />
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" required onChange={(e) => setAddUserForm({...addUserForm, username: e.target.value })}/>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" required onChange={(e) => setAddUserForm({...addUserForm, password: e.target.value })}/>

        <label htmlFor="role"></label>
        <select name="role" id="role">
          <option value="USER" onSelect={() => setAddUserForm({...addUserForm, role: "USER"})}>USER</option>
          <option value="ADMIN" onSelect={() => setAddUserForm({...addUserForm, role: "ADMIN"})}>ADMIN</option>
        </select>
      </div>
      <div id="add-user-submit-container">
        {addUserResult.fetching ? <Spinner /> : <button type="submit">Submit</button>}
          
          {/* TODO style notif class */}
          <div className={`notif ${addUserResult.error ? 'error' : 'success'}`}>
            {addUserResult.error ? <p>Save unsuccessful.</p> : <p>{addUserResult.data && 'User added successfully!'}</p>}
          </div>
      </div>   
    </form>
  )
}