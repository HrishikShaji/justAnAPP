import React from "react";

const PostForm = () => {
  return (
    <form className="w-full h-full p-2 flex flex-col gap-4">
      <textarea className="w-full p-4 rounded-3xl h-[calc(100%_-_100px)]  bg-neutral-600" />
      <button className="text-white">Submit</button>
    </form>
  );
};

export default PostForm;
