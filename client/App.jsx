import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import style from './css/app.css';
import PageCount from './components/PageCount';
import Arrow from './components/Arrow';
import ProductList from './components/ProductList';
import FeedbackToggle from './components/FeedbackToggle';
import FeedbackModal from './components/FeedbackModal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: [],
      showFeedbackLinks: false,
      numItemsToDisplay: 10,
      firstItemInView: 0,
      itemsInView: [],
      itemGap: 10,
      notRelated: {},
      feedbackSent: false,
    };
    this.getRelatedProducts = this.getRelatedProducts.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.openModal = this.openModal.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.startOver = this.startOver.bind(this);
    this.toggleFeedback = this.toggleFeedback.bind(this);
    this.updateNumItemsToDisplay = this.updateNumItemsToDisplay.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    const params = new URLSearchParams(document.location.search.substring(1));
    const id = params.get('id');
    this.getRelatedProducts(id);
    window.addEventListener('resize', this.updateNumItemsToDisplay);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateNumItemsToDisplay);
  }

  getRelatedProducts(id) {
    axios.get(`/api/related_products/${id}`)
      .then((results) => {
        const formatted = results.data.map((product) => {
          product.price = Number.parseFloat(product.price).toFixed(2);
          return product;
        });
        // eslint-disable-next-line no-unused-vars
        this.setState((state) => ({
          relatedProducts: formatted,
        }));
      })
      .then(() => {
        this.updateNumItemsToDisplay();
      })
      .catch((err) => console.error('Failed to load product data.'));
  }

  openModal(e, product) {
    e.preventDefault();
    this.setState({
      notRelated: product,
    });
  }

  hideModal() {
    this.setState({
      notRelated: {},
      feedbackSent: false,
    });
  }

  sendFeedback(unrelated) {
    const params = new URLSearchParams(document.location.search.substring(1));
    const id = params.get('id');
    axios.post(`/api/related_products/${id}/feedback/${unrelated}`)
      .then((results) => {
        this.setState({
          feedbackSent: true,
        });
      })
      .catch((err) => console.error('Feedback not saved.'));
    }

  previous() {
    const { firstItemInView, numItemsToDisplay, relatedProducts } = this.state;
    if (firstItemInView > numItemsToDisplay - 1) {
      this.setState((state) => ({
        firstItemInView: state.firstItemInView - numItemsToDisplay,
      }));
    } else {
      this.setState((state) => ({
        firstItemInView: 0,
      }));
    }
    this.setState((state) => ({
      itemsInView: relatedProducts.slice(state.firstItemInView, state.firstItemInView + state.numItemsToDisplay),
      showFeedbackLinks: false,
    }));
  }

  next() {
    const { firstItemInView, numItemsToDisplay, relatedProducts } = this.state;
    if (firstItemInView < relatedProducts.length - numItemsToDisplay) {
      this.setState((state) => ({
        firstItemInView: state.firstItemInView + numItemsToDisplay,
      }));
      this.setState((state) => ({
        itemsInView: relatedProducts.slice(state.firstItemInView, state.firstItemInView + state.numItemsToDisplay),
        showFeedbackLinks: false,
      }));
    }
  }

  startOver(e) {
    e.preventDefault();
    // This should return the first item in view to be at index 0.
    this.setState((state) => ({
      firstItemInView: 0,
      showFeedbackLinks: false,
    }));
    this.setState((state) => ({
      itemsInView: state.relatedProducts.slice(state.firstItemInView, state.numItemsToDisplay),
    }));
  }

  toggleFeedback(e) {
    e.preventDefault();
    this.setState((state) => ({ showFeedbackLinks: !state.showFeedbackLinks }));
  }

  updateNumItemsToDisplay() {
    const { relatedProducts } = this.state;
    const appWidth = document.getElementById('sponsored-related-products').clientWidth;
    const itemCount = Math.floor((appWidth - 92) / 170);
    const newGap = (appWidth - 92 - (itemCount * 160)) / itemCount;
    this.setState((state) => ({
      numItemsToDisplay: itemCount,
      itemsInView: relatedProducts.slice(state.firstItemInView, state.firstItemInView + itemCount),
      itemGap: newGap,
    }));
  }

  render() {
    const {
      itemsInView,
      showFeedbackLinks,
      itemGap,
      firstItemInView,
      relatedProducts,
      numItemsToDisplay,
      notRelated,
      feedbackSent,
    } = this.state;
    const totalPages = Math.ceil(relatedProducts.length / numItemsToDisplay);
    const currentPage = Math.ceil(firstItemInView / numItemsToDisplay) + 1;
    if (itemsInView.length > 0) {
      return (
        <div className={style['sponsored-products-module-wrapper']}>
          <div className={style['sponsored-products-meta']}>
            <h2>Sponsored products related to this item</h2>
            <PageCount
              firstItem={firstItemInView}
              page={currentPage}
              pages={totalPages}
              startOver={this.startOver}
            />
          </div>
          <div className={style['sponsored-products-list']}>
            <Arrow direction="left" nextPane={this.previous} />
            <ProductList
              products={itemsInView}
              showLinks={showFeedbackLinks}
              itemGap={itemGap}
              openModal={this.openModal}
              sendFeedback={this.sendFeedback}
              hideModal={this.hideModal}
            />
            <Arrow direction="right" nextPane={this.next} />
          </div>
          <FeedbackToggle showLinks={showFeedbackLinks} toggleFeedback={this.toggleFeedback} />
          <FeedbackModal product={notRelated} send={this.sendFeedback} sent={feedbackSent} hide={this.hideModal} />
        </div>
      );
    }
    return null;
  }
}

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('sponsored-related-products'));
