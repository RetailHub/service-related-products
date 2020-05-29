/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import style from '../css/feedback.css';

const FeedbackModal = ({
  product, send, sent, hide,
}) => {
  if (product.productId) {
    if (sent) {
      return (
        <div className={style['feedback-modal-background']} onClick={hide}>
          <div className={style['popover-wrapper']}>
            <header className={style['popover-header']}>
              <h4 className={style['popover-header-content']}>
                Share your feedback
              </h4>
            </header>
            <div className={style['popover-inner']}>
              <div className={style['feedback-content']}>
                <div className={style['feedback-success']}>
                  <div className={style['alert-container']}>
                    <h4 className={style['feedback-sent']}>Feedback sent</h4>
                    <i />
                    <div className={style['alert-container']}>
                      Thank you for sharing your feedback. A specialist has been notified and will review the feedback you provided.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style['popover-footer']}>
              <div className={style['sponsored-products-feedback-footer']}>
                <button className={`${style['close-window']} ${style['popover-button']}`} onClick={hide}>Close window</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={style['feedback-modal-background']} onClick={hide}>
        <div className={style['popover-wrapper']}>
          <header className={style['popover-header']}>
            <h4 className={style['popover-header-content']}>
              Share your feedback
            </h4>
          </header>
          <div className={style['popover-inner']}>
            <div>
              <div className={style['item-display']}>
                <img src={product.imageUrl} />
                <div>
                  <div className={style['product-name']}>{product.name}</div>
                  <div className={style['product-price']}>{product.price}</div>
                </div>
              </div>
              <form className={style['feedback-form']}>
                <fieldset>
                  <legend className={style['form-label']}>This item is:</legend>
                  <label>
                    <input type="radio" name="type" value="unrelated" />
                    {' '}
                    Unrelated
                  </label>
                  <label>
                    <input type="radio" name="type" value="inappropriate" />
                    {' '}
                    Inappropriate
                  </label>
                  <label>
                    <input type="radio" name="type" value="other" />
                    {' '}
                    Other
                  </label>
                </fieldset>
                <label className={style['form-label']} htmlFor="comment">
                  Comments
                </label>
                <textarea id="comment" />
              </form>
            </div>
          </div>
          <div className={style['popover-footer']}>
            <div className={style['sponsored-products-feedback-footer']}>
              <button className={`${style['popover-button']}`} onClick={hide}>Cancel</button>
              <button className={`${style['close-window']} ${style['popover-button']}`} onClick={send}>Send Feedback</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default FeedbackModal;
