import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [updateForm, setUpdateForm] = useState({ name: "", email: "" });

  // Update the form when user changes
  useEffect(() => {
    if (user) {
      setUpdateForm({ name: user.name, email: user.email });
    }
  }, [user]);

  // GET list of users
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Get a single user by ID
  const getUserById = (userId) => {
    fetch(`http://localhost:3000/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <h1>Cassia's Tech Exercise</h1>
      <p> Tristan was here! </p>
      <h2>Display All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <h2>Get a Single User Details</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const userId = formData.get("userId");
          getUserById(userId);
        }}
      >
        <input type="text" name="userId" placeholder="Enter user ID" />
        <button type="submit">Get User</button>
      </form>
      {user ? (
        user?.error ? (
          <p>User not found</p>
        ) : (
          <div>
            <ul>
              <li>Name: {user?.name}</li>
              <li>Email: {user?.email}</li>
            </ul>
            <h3>Update User</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedUser = {
                  name: formData.get("name"),
                  email: formData.get("email"),
                };
                fetch(`http://localhost:3000/users/${user.id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updatedUser),
                })
                  .then((response) => response.json())
                  .then(() => {
                    setUsers(
                      users.map((u) =>
                        u.id === user.id ? { ...u, ...updatedUser } : u,
                      ),
                    );
                    setUser({ ...user, ...updatedUser });
                    e.target.reset();
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              }}
            >
              <input
                type="text"
                name="name"
                value={updateForm.name}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, name: e.target.value })
                }
              />
              <input
                type="email"
                name="email"
                value={updateForm.email}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, email: e.target.value })
                }
              />
              <button type="submit">Update User</button>
            </form>
          </div>
        )
      ) : (
        <p>Enter a user ID to see details</p>
      )}

      <h2>Create User</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const newUser = {
            name: formData.get("name"),
            email: formData.get("email"),
          };
          fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((response) => response.json())
            .then((data) => {
              setUsers([...users, data]);
              e.target.reset();
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }}
      >
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <button type="submit">Create User</button>
      </form>

      <h2>Delete User</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const userId = formData.get("userId");
          fetch(`http://localhost:3000/users/${userId}`, {
            method: "DELETE",
          })
            .then(() => {
              setUsers(
                users.filter((user) => user.id !== parseInt(userId, 10)),
              );
              e.target.reset();
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }}
      >
        <input type="text" name="userId" placeholder="Enter user ID" />
        <button type="submit">Delete User</button>
      </form>
    </>
  );
}

export default App;
