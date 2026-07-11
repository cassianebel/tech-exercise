import React from "react";

const DeleteUser = ({ users, setUsers }) => {
  return (
    <div>
      {" "}
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
              alert(`User with ID ${userId} has been deleted.`);
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
    </div>
  );
};

export default DeleteUser;
