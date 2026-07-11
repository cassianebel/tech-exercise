import { useState, useEffect } from "react";
import { authClient } from "./lib/auth-client";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [updateForm, setUpdateForm] = useState({ name: "", email: "" });

  const { data: session } = authClient.useSession();

  // Update the form when user changes
  // useEffect(() => {
  //   if (user) {
  //     setUpdateForm({ name: user.name, email: user.email });
  //   }
  // }, [user]);

  // GET list of users
  // useEffect(() => {
  //   fetch("http://localhost:3000/users")
  //     .then((response) => response.json())
  //     .then((data) => setUsers(data))
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  // Get a single user by ID
  // const getUserById = (userId) => {
  //   fetch(`http://localhost:3000/users/${userId}`)
  //     .then((response) => response.json())
  //     .then((data) => setUser(data))
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  return (
    <>
      <h1>Cassia's Tech Exercise</h1>
      {session ? (
        <>
          <h2>Welcome {session.user.name}</h2>
          <button onClick={() => authClient.signOut()}>Sign Out</button>
        </>
      ) : (
        <>
          <SignUp />
          <SignIn />
        </>
      )}

      <p>Michael was here</p>
      <p> Tristan was here! </p>
      <p>Danie was here</p>
      <p>Cassia was here!</p>
      <p>Hello world!</p>
    </>
  );
}

export default App;
