import { useMutation } from "urql";
import { useStatus } from "utls/customHooks/useStatus";
import { HomePageType } from "pages";

const AddUser = `
  mutation ($input: UserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

export default function AddUserForm({ addUserForm, setAddUserForm }: HomePageType) {
  const [addUserResult, addUser] = useMutation(AddUser);
  const [status, setStatus] = useStatus();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const user = await addUser({ input: addUserForm })
      .then(result => {
        if (result.error) {
          console.error(result.error)
          return;
        } 
        console.log('SUCCESS RESULT', result);
        return result;
      });
    if (user) {
      setStatus("success", "Successfully added user!");
    } else {
      setStatus("error", "Save unsuccessful.");
    }
  }

  return (
    <form action="" method="post" autoComplete="off" onSubmit={onSubmitForm}>
    <fieldset>
      <legend>Add user</legend>
      <div id="fieldset-content">
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

        <button className="btn-small" type="submit">Submit</button>
        <div className={`notif ${status && status.type}`}>
          <p>{status && status.message}</p>
        </div>
      </div>   
    </fieldset>
    
  </form>
  )
}