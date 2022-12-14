import React from 'react';
import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span className={styles}>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.descr}>
        К сожалению эта страница отсутствует в нашем интернет-магазине
      </p>
    </div>
  );
};
