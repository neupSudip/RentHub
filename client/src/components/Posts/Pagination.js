import React from "react";
import { Link } from "react-router-dom";
import "./pagination.css";

const Pagination = ({ totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / 2); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <ul>
        {pageNumbers.map((page) => (
          <li key={page} onClick={() => paginate(page)}>
            <Link to={`/posts/page/${page}`}>{page}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
