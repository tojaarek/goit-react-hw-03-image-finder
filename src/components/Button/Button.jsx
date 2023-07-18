import React, { Component } from 'react';
import PropTypes from 'prop-types';
import button from './Button.module.css';

class Button extends Component {
  render() {
    const { loadMore } = this.props;

    return (
      <button className={button.more} type="button" onClick={loadMore}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
