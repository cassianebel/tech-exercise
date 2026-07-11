import React from "react";

const CreateUser = ({ users, setUsers }) => {
  return (
    <div>
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
              alert("User created successfully!");
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
    </div>
  );
};

export default CreateUser;
