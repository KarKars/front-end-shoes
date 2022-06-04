import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import axiosClient from "../baseUrl/root.js";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const List_sells = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(10);

  const deleteSell = async (id) => {
    const newList = data.filter((item) => item._id !== id);
    await axiosClient.delete(`/${id}`);
    setData(newList);
  };

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const res = await axiosClient.get("/");
      console.log(res.data.tasks);
      setData(res.data.tasks);
      setLoading(false);
    };
    fetchPost();
  }, []);

  // get Current PoSTS
  const indexofLastPost = currentPage * postPerPage;
  const indexofFirstPost = indexofLastPost - postPerPage;
  const currentPosts = data.slice(indexofFirstPost, indexofLastPost);

  const paginate = (number) => {
    setCurrentPage(number);
  };
  if (loading) {
    return <h1>loading ...</h1>;
  }
  return (
    <div className="AllList-container">
      <h1 className="AllList-title">Sells Table</h1>
      <div className="Main-AllList">
        {/* deal with empty list */}
        {data.length > 0 ? (
          <div className="AllList-sections">
            <h1 className="AllList-sections-style">brand</h1>
            <h1 className="AllList-sections-style">model</h1>
            <h1 className="AllList-sections-style">price</h1>
            <h1 className="AllList-sections-style">size</h1>
          </div>
        ) : (
          <h1 className="flex justify-center text-xl">the list is empty</h1>
        )}
        {currentPosts.map((item) => {
          return (
            <div className="AllList-section-items odd:bg-white even:bg-slate-100" key={item.id}>
              <h1>{item.brand}</h1>
              <h1>{item.model}</h1>
              <h1>{item.price} DA</h1>
              <h1>{item.size}</h1>
              <div>
                <button className="AllList-btn-delete">
                  <AiFillDelete onClick={() => deleteSell(item._id)} />
                </button>
              </div>
            </div>
          );
        })}
        <Pagination postPerPage={postPerPage} totalPosts={data.length} paginate={paginate} />
      </div>
    </div>
  );
};

export default List_sells;
