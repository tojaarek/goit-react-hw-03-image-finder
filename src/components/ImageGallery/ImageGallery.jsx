import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';
import Button from 'components/Button/Button';
import gallery from './ImageGallery.module.css';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  handleImageClick = key => {
    this.props.onImageClick(key);
  };

  render() {
    const { images, handleLoadMore, totalHits, onOpen } = this.props;

    return (
      <div className={gallery.box}>
        <ul className={gallery.list}>
          {images &&
            images.map(image => (
              <ImageGalleryItem
                key={image.id}
                imageUrl={image.webformatURL}
                alt={image.tags}
                onOpen={() => onOpen(image.id)}
              />
            ))}
        </ul>
        {images.length < totalHits && <Button loadMore={handleLoadMore} />}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ).isRequired,
  handleLoadMore: PropTypes.func.isRequired,
  totalHits: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default ImageGallery;
