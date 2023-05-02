import React, { useState } from "react";
import createStyle from "./CreatePage.module.css";
import { Link } from "react-router-dom";

const CreatePage = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [name, setName] = useState("");

  let submitHandeler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen w-full  py-16 ">
      <div className="w-[450px] max-w-[90%] mx-auto px-8 py-12 bg-[rgba(0,0,0,.5)]  rounded">
        <h1 className={`text-center text-3xl mb-5 `}>Create New Account </h1>
        <form onSubmit={submitHandeler}>
          <input
            required
            className={`focus:outline-none border-b-2 w-full rounded p-2 my-1 placeholder:italic placeholder:text-slate-400  border-slate-300`}
            type="naem"
            placeholder="Enter Your Name "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            className={`focus:outline-none border-b-2 w-full rounded p-2 my-3 placeholder:italic placeholder:text-slate-400  border-slate-300`}
            type="email"
            placeholder="Enter Your Email "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            className={`focus:outline-none border-b-2 w-full rounded p-2 my-3 placeholder:italic placeholder:text-slate-400  border-slate-300`}
            type="password"
            placeholder="Enter Your Password "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className={`py-2 px-4 bg-red-900 mt-4 block mx-auto rounded text-white`}
          >
            Submit
          </button>
        </form>

        <Link to="/LoginPage">
          <h1 className=" mt-10">Clcick to move <span className="text-red-700 ml-2">Login Page</span></h1>
        </Link>
      </div>
    </div>
  );
};

export default CreatePage;
