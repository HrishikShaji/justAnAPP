import React from "react";

const UserCard = () => {
  return (
    <div className="bg-neutral-600 rounded-3xl py-4 flex flex-col items-center">
      <div className="w-20 h-20 bg-neutral-500 rounded-full" />
      <h1>Username</h1>
      <button>Follow</button>
    </div>
  );
};

export default UserCard;
