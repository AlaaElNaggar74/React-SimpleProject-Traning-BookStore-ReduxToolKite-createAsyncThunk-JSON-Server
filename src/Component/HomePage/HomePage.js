import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deletetBook,
  fetchBookList,
  insertBook,
  upddateBook,
} from "../../store/Slice/bookSlice";
import { checkLogin } from "../../store/Slice/authSlice";

const HomePage = () => {
  let { books, isLoading, erroeMessage } = useSelector((state) => state.books);
  let { name, isLogin } = useSelector((state) => state.auth);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookList());
  }, []);

  let [hiddeForm, setHideForm] = useState(false);
  let [checkUpdate, setCheckUpdate] = useState(false);
  let [uBook, setUbook] = useState({});
  let [viewBook, setViewBook] = useState({});
  let [formInput, setFormInput] = useState({
    title: "",
    price: "",
    discription: "",
  });

  let formInputHandeler = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
    setUbook({
      ...formInput,
      id: formInput.id,
      username: formInput.username,
      [e.target.name]: e.target.value,
    });
  };

  let submitHandler = (e) => {
    e.preventDefault();
    setHideForm(!hiddeForm);
  
    checkUpdate
      ? dispatch(upddateBook(formInput))
      : dispatch(insertBook(formInput));

    console.log("Hello");
    console.log("formInput in submit",formInput);
    setFormInput({
      title: "",
      price: "",
      discription: "",
    });
    setCheckUpdate(false);
  };

  // let changeHandler = () => {};

  let upddateHandelFun = (book) => {
    hiddeForm ? setHideForm(true) : setHideForm(true);
    setFormInput({
      title: book.title,
      price: book.price,
      discription: book.discription,
      id:book.id,
      userName:book.userName,
    });
    formInput.id=book.id;
    formInput.userName=book.userName;

    setCheckUpdate(true);
  };

  let deleteHandelFun = (id) => {
    dispatch(deletetBook(id));
    setFormInput({
      title: "",
      price: "",
      discription: "",
    });
    books.length === 1 && setViewBook("");
    console.log("books.length", books);
  };
  let viewHandelFun = (book) => {
    setViewBook(book);
  };
  return (
    <div className="">
      {erroeMessage === "" ? (
        ""
      ) : (
        <h1 className="text-3xl bg-red-500 p-8">{erroeMessage} </h1>
      )}
      <div className="text-2xl text-white bg-black p-3 flex items-center justify-between mb-3">
        <h1>Book Store </h1>
        <h1
          className="bg-red-500 rounded p-2 cursor-pointer"
          onClick={() => dispatch(checkLogin())}
        >
          {isLogin ? "Logout" : "Login"}
        </h1>
      </div>
      <h1 className="text-center text-3xl text-red-500">Book Store </h1>
      <div className="">
        <h1 className="text-center text-2xl mt-3">Input Book Field </h1>
        <div className="p-3 flex items-center justify-between ">
          <h1 className="text-2xl md:text-3xl">BookStore Form</h1>
          <button
            className="py-2 px-3 bg-red-500 rounded text-white"
            onClick={() => setHideForm(!hiddeForm)}
            disabled={!isLogin}
          >
            {hiddeForm ? "Hide" : "Show"}
          </button>
        </div>
        {hiddeForm ? (
          <form
            onSubmit={submitHandler}
            className=" w-10/12 md:w-6/12 mx-auto p-3"
          >
            <label htmlFor="name" className="text-2xl">
              Name
            </label>
            <br />
            <input
              required
              placeholder="Enter Your Book Title"
              type="text"
              name="title"
              id="name"
              value={formInput.title}
              onChange={formInputHandeler}
              className="rounded mt-1 mb-3 w-full p-1 border border-gray-500"
            />
            <br />
            <label htmlFor="name" className="text-2xl">
              Price
            </label>
            <br />
            <input
              required
              placeholder="Enter Your Book price"
              type="number"
              name="price"
              id="price"
              value={formInput.price}
              onChange={formInputHandeler}
              className="rounded mt-1 mb-3 w-full p-1 border border-gray-500"
            />
            <br />
            <label htmlFor="desc" className="text-2xl">
              Description
            </label>
            <br />
            <input
              required
              placeholder="Enter Your Book price"
              type="text"
              name="discription"
              id="desc"
              value={formInput.discription}
              onChange={formInputHandeler}
              className="rounded mt-1 mb-3 w-full p-1 border border-gray-500"
            />
            <br />
            <button
              className="py-2 px-3 bg-red-500 rounded text-white"
              type="submit"
              disabled={!isLogin}
            >
              {checkUpdate ? "Update" : "Add"}
            </button>
          </form>
        ) : (
          ""
        )}

        {!isLoading ? (
          <div className="w-11/12 mx-auto">
            <h1 className="text-center text-2xl my-8">Book DataBase </h1>
            <div className=" flex justify-between flex-wrap">
              <div className="w-11/12 md:w-6/12 mx-auto     rounded  p-2">
                <h1 className="mb-2 text-2xl">Book List</h1>
                {books?.length > 0
                  ? books.map((book) => (
                      <div
                        key={book.id}
                        className="flex items-center justify-between mb-2 border rounded border-1 border-red-500 p-3"
                      >
                        <h1 className="w-5/12">{book.title}</h1>
                        <div className="w-7/12 text-right">
                          <button
                            className="py-1 px-2 bg-indigo-800 rounded text-white m-1"
                            onClick={() => upddateHandelFun(book)}
                            disabled={!isLogin}
                          >
                            updat
                          </button>
                          <button
                            className="py-1 px-2 bg-red-500 rounded text-white m-1"
                            onClick={() => viewHandelFun(book)}
                            disabled={!isLogin}
                          >
                            view
                          </button>
                          <button
                            className="py-1 px-2 bg-sky-400 rounded text-white m-1"
                            onClick={() => deleteHandelFun(book.id)}
                            disabled={!isLogin}
                          >
                            delete
                          </button>
                        </div>
                      </div>
                    ))
                  : "Ther Is No Books"}
              </div>
              <div className="w-11/12 md:w-5/12 mx-auto p-2 mt-3 md:mt-0">
                <h1 className="mb-2 text-2xl">Book Details</h1>
                {books?.length > 0 ? (
                  <div className="border rounded border-1 border-red-500 p-3">
                    <div className=" text-2xl">
                      Book Info :
                      {viewBook?.title ? (
                        <>
                          <div>Title : {viewBook?.title}</div>
                          <div>auther : {viewBook?.userName}</div>
                          <div>discription : {viewBook?.discription}</div>
                          <div>price : {viewBook?.price}</div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  "There Is No Books"
                )}
              </div>
            </div>
          </div>
        ) : (
          "errrrrrorrrrr Loading"
        )}
      </div>
    </div>
  );
};

export default HomePage;
