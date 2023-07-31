import { logIn } from "@/redux/slices/AuthSlice";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { AiOutlineGoogle, AiOutlineGithub } from "react-icons/ai";
import { useDispatch } from "react-redux";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = isLogin ? "login" : "/api/auth/register";
    if (isLogin) {
      const response = await signIn("credentials", { email, password });
      console.log(response);
    } else {
      console.log(
        "/api/auth/register",
        username,
        email,
        password,
        confirmPassword
      );
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      await signIn("credentials", { email, password });
      console.log(response);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
        {!isLogin && (
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            className="p-2 border-b-4 focus:outline-none border-white bg-transparent"
          />
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="email"
          className="p-2 border-b-4 focus:outline-none border-white bg-transparent"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="p-2 border-b-4 focus:outline-none border-white bg-transparent"
        />
        {!isLogin && (
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="confrm password"
            className="p-2 border-b-4 focus:outline-none border-white bg-transparent"
          />
        )}

        <button className="px-3 py-2 mt-4 bg-black text-white rounded-md">
          {isLogin ? "Sign In" : "Sign Up"}
        </button>
      </form>
      <h1 className="text-center mt-1 text-gray-300">
        {isLogin ? "New User?" : "Already have an account?"}

        <span
          className="font-semibold text-white text-lg cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? " Sign Up" : " Sign In"}
        </span>
      </h1>
      <h1 className="text-white">OR</h1>
      <div className="text-white flex gap-4">
        <AiOutlineGoogle size={25} />
        <AiOutlineGithub size={25} />
      </div>
    </div>
  );
};

export default AuthForm;
