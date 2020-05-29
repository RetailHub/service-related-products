/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import propTypes from 'prop-types';

import style from '../css/product-list-item.css';
import FeedbackLink from './FeedbackLink';
import Prime from './Prime';

const ProductListItem = ({ product, showLinks, openModal }) => {
  const {
    productid, name, imageurl, price, prime,
  } = product;
  const avgrating = product.rating;
  const numreviews = product.reviews;
  console.log('product is: ', product, avgrating, numreviews, price);
  const fullUrl = `https://sdc-related-products.s3.us-east-2.amazonaws.com/images/${imageurl}`;
  return (
    <div className={style['single-product']}>
      <FeedbackLink
        showLinks={showLinks}
        openModal={openModal}
        product={product}
      />
      <a href="#">
        <img src={fullUrl} alt={name} />
        <div className={style['product-title']}>{name}</div>
      </a>
      <div>
        <a className={style['no-change-on-hover']} href="#">
          <i className={avgrating > 4.7 ? style['stars-5']
            : avgrating > 4.2 ? style['stars-4-5']
              : avgrating > 3.7 ? style['stars-4']
                : avgrating > 3.2 ? style['stars-3-5']
                  : avgrating > 2.7 ? style['stars-3']
                    : avgrating > 2.2 ? style['stars-2-5']
                      : avgrating > 1.7 ? style['stars-2']
                        : avgrating > 1.2 ? style['stars-1-5']
                          : avgrating > 0.7 ? style['stars-1']
                            : avgrating > 0.2 ? style['stars-0-5']
                              : style['stars-0']}
          />
          <span className={style['total-reviews']}>{numreviews}</span>
        </a>
      </div>
      <div className="product-pricing">
        <a className={style['no-change-on-hover']} href="#">
          <span className={style.price}>{product.price}</span>
        </a>
        <Prime isPrime={prime} />
      </div>
    </div>
  );
};

ProductListItem.propTypes = {
  product: propTypes.shape({}).isRequired,
};

export default ProductListItem;
