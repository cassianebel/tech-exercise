import { useState, useEffect } from "react";
import DisplayAllUsers from "./components/DisplayAllUsers";
import DisplayUserDetails from "./components/DisplayUserDetails";
import CreateUser from "./components/CreateUser";
import DeleteUser from "./components/DeleteUser";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  // GET list of users
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <h1>Cassia's Tech Exercise</h1>

      <DisplayAllUsers users={users} />

      <DisplayUserDetails users={users} setUsers={setUsers} />

      <CreateUser users={users} setUsers={setUsers} />

      <DeleteUser users={users} setUsers={setUsers} />
    </>
  );
}

export default App;
