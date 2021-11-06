import React from "react";

interface IPaginator {
  page: number;
  lastPage: number;
  setPage: (n: number) => void;
}

const Paginator = ({ page, lastPage, setPage }: IPaginator) => {
  const onNext = () => {
    if (page < lastPage) {
      setPage(page + 1);
    }
  };

  const onPrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a href="#" className="page-link" onClick={onPrevious}>
            Previous
          </a>
        </li>
        <li className="page-item">
          <a href="#" className="page-link" onClick={onNext}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Paginator;
