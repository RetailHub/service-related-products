/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import propTypes from 'prop-types';

import style from '../css/prime.css';

const Prime = ({ isPrime }) => {
  if (isPrime) {
    return (
      <a href="#">
        <span className={style['prime-wrapper']}>
          <i className={style.prime} />
        </span>
      </a>
    );
  }
  return null;
};

export default Prime;
