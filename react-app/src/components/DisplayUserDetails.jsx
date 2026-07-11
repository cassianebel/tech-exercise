import { useState, useEffect } from "react";

const DisplayUserDetails = ({ users, setUsers }) => {
  const [user, setUser] = useState(null);
  const [updateForm, setUpdateForm] = useState({ name: "", email: "" });

  // Update the form when user changes
  useEffect(() => {
    if (user) {
      setUpdateForm({ name: user.name, email: user.email });
    }
  }, [user]);

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
    <div>
      <h2>Get a Single User Details</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const userId = formData.get("userId");
          getUserById(userId);
        }}
      >
        <input type="text" name="userId" id="userId" placeholder="User ID" />
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
    </div>
  );
};

export default DisplayUserDetails;
