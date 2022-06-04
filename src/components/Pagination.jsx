import React from "react";

const Pagination = ({ postPerPage, totalPosts, paginate }) => {
  const pagenumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pagenumbers.push(i);
  }
  return (
    <div className="mt-5 text-center cursor-pointer">
      <ul className="pagination space-x-1 bg-indigo-500">
        <li>
          {pagenumbers.map((number) => {
            return (
              <button className="page-number" onClick={() => paginate(number)}>
                {number}
              </button>
            );
          })}
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
