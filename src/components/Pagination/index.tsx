import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
  resLength: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
  resLength,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={Math.ceil(resLength / 4)}
      forcePage={currentPage - 1}
      previousLabel='<'
    />
  );
};
