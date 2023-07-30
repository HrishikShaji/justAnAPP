import React from "react";

const UserListItem = () => {
  return (
    <div className="w-full rounded-xl bg-neutral-600 flex justify-between p-2">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-neutral-400" />
        <h1>Username</h1>
      </div>
      <button>Message</button>
    </div>
  );
};

export default UserListItem;
