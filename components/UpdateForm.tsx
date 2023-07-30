import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/redux/slices/apiSlice";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState, useEffect } from "react";

const UpdateForm = () => {
  const session = useSession();

  const [updateUSER] = useUpdateUserMutation();

  const { data, refetch } = useGetUserQuery(session?.data?.user as string);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (data?.email) {
      setEmail(data.email);
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      id: session?.data?.user as string,
      email: email as string,
      isAuth: true,
    };

    await updateUSER(data);
    refetch();
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="email"
        className="p-2 border-b-4 focus:outline-none border-white bg-transparent"
      />

      <button className="px-3 py-2 mt-4 bg-black text-white rounded-md">
        Update
      </button>
    </form>
  );
};

export default UpdateForm;
