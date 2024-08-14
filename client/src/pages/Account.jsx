import CreateUser from "../components/CreateUser";
import Login from "../components/Login";

export default function Account() {
  return(
    <div>
      <h1>Account</h1>
      <Login/>
      <CreateUser/>
    </div>
  )
}