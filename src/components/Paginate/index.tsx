import React, { useEffect, useState } from 'react';
import { IPaginate } from 'src/api/config/type';

const Paginate = ({
  paginate,
  hanleChange,
}: {
  paginate: IPaginate;
  hanleChange: any;
}) => {
  // eslint-disable-next-line no-undef
  const [pagination, setPagination] = useState<JSX.Element[]>([]);

  const fetchPaginationV2 = (currentPage: number, onSides: number) => {
    let pages = [];
    if (paginate) {
      for (let i = 1; i <= paginate.total; i++) {
        let offset = i == 1 || paginate.total ? onSides + 1 : onSides;
        if (
          i == 1 ||
          (currentPage - offset <= i && currentPage + offset >= i) ||
          i == currentPage ||
          i == paginate.total ||
          i == paginate.total - 1
        ) {
          pages.push(
            <li
              className={
                ' cursor-pointer page-item ' +
                (currentPage == i ? 'active' : '')
              }
              key={i}
            >
              <a className="page-link" onClick={() => hanleChange({ page: i })}>
                {i}
              </a>
            </li>,
          );
        } else if (
          i == currentPage - (offset + 1) ||
          i == currentPage + (offset + 1)
        ) {
          if (i == currentPage - (offset + 1)) {
            pages.push(
              <li
                onClick={() => hanleChange({ page: i })}
                className={'custom-dots cursor-pointer page-item'}
              >
                <a className="page-link">
                  <span>...</span>
                </a>
              </li>,
            );
          }
          if (i == currentPage + (offset + 1)) {
            pages.push(
              <li
                onClick={() => hanleChange({ page: i })}
                className={'cursor-pointer page-item'}
              >
                <a className="page-link">
                  <span>...</span>
                </a>
              </li>,
            );
          }
        }
      }
    }
    setPagination(pages);
  };
  useEffect(() => {
    fetchPaginationV2(paginate?.page || 1, 1);
  }, [paginate]);
  return (
    <nav aria-label="...">
      <ul className="pagination flex-wrap">
        <li className="pr-2 mb-1">
          <select
            onChange={(e) =>
              hanleChange({ offset: e.target.value, page: paginate.page })
            }
            value={paginate.offset}
            className="form-control"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </li>
        <li
          onClick={() =>
            hanleChange({ page: paginate?.page ? paginate.page - 1 : 1 })
          }
          className={`page-item mb-1 cursor-pointer ${
            paginate.page == 1 && 'disabled'
          }`}
        >
          <span className="page-link text-dark">Previous</span>
        </li>
        {pagination}
        <li
          onClick={() =>
            hanleChange({ page: paginate?.page ? paginate.page + 1 : 1 })
          }
          className={`page-item mb-1 cursor-pointer ${
            paginate.page == paginate.total && 'disabled'
          }`}
        >
          <a className="page-link text-dark">Next</a>
        </li>
      </ul>
    </nav>
  );
};
export default Paginate;
