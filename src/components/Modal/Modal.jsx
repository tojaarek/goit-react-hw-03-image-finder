import React, { Component } from 'react';
import axios from 'axios';
import modal from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  state = {
    largeImageURL: '',
    alt: '',
  };

  async componentDidMount() {
    await this.fetchLargeImage();
    window.addEventListener('keydown', this.handleKeyPress);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.selectedImageId !== this.props.selectedImageId) {
      await this.fetchLargeImage();
    }
  }

  componentWillUnmount() {
    this.setState({ largeImageURL: '', alt: '' });
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  async fetchLargeImage() {
    const { selectedImageId } = this.props;
    try {
      const apiKey = '34699239-301f57fe1e87e868102635a18&';
      const response = await axios.get(
        `https://pixabay.com/api/?key=${apiKey}id=${selectedImageId}`
      );
      const largeImageURL = response.data.hits[0].largeImageURL;
      const alt = response.data.hits[0].tags;
      console.log(alt);
      console.log(largeImageURL);
      this.setState({ largeImageURL, alt });
    } catch {
      console.log('error');
    }
  }
  render() {
    const { largeImageURL, alt } = this.state;
    const { onClose } = this.props;

    return (
      <div className={modal.overlay} onClick={onClose}>
        <div>
          <img className={modal.modal} src={largeImageURL} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  selectedImageId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
