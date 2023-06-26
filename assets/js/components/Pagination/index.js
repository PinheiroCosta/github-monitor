import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <ul className="pagination justify-content-center">
        <li className="page-item disabled">
          <span className="page-link">Previous</span>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" href="#">Next</a>
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

