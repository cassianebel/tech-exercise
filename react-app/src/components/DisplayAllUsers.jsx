import React from "react";

const DisplayAllUsers = ({ users }) => {
  return (
    <div>
      <h2>Display All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayAllUsers;
