import React from "react";

const PostItem = () => {
  return (
    <div className="w-full  rounded-3xl bg-neutral-700 p-5 flex flex-col gap-8">
      <div className="flex gap-2 items-end">
        <div className="h-14 w-14 rounded-full  bg-neutral-500" />
        <div className="flex flex-col ">
          <h1 className="font-semibold">Username</h1>
          <span className="text-xs font-semibold">Time Posted</span>
        </div>
      </div>
      <div>
        <p>
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
          nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
          venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
          Integer tincidunt. Cras dapibus. Vivamus elementum '
        </p>
      </div>
    </div>
  );
};

export default PostItem;
