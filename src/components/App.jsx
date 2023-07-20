import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import axios from 'axios';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    searchInput: '',
    isLoading: false,
    page: 1,
    totalHits: 0,
    isModalOpen: false,
    selectedImageId: null,
  };

  async fetchImages(data) {
    try {
      const { page } = this.state;
      const apiKey = '34699239-301f57fe1e87e868102635a18&';
      const response = await axios.get(
        `https://pixabay.com/api/?key=${apiKey}q=${data}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
      );
      const images = response.data.hits;
      const hits = response.data.totalHits;
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        isLoading: false,
      }));
      this.setState({ totalHits: hits });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  }

  fetchMoreImages = () => {
    const { searchInput } = this.state;
    this.fetchImages(searchInput);
  };

  handleSearch = data => {
    const searchValue = data.searchValue;
    this.setState({ images: [], isLoading: true, searchInput: searchValue });
    this.fetchImages(searchValue);
  };

  handleLoadMore = event => {
    event.preventDefault();
    this.setState(prevState => {
      const nextPage = prevState.page + 1;
      return { isLoading: true, page: nextPage };
    }, this.fetchMoreImages);
  };

  handleOpenModal = id => {
    this.setState({ isModalOpen: true, selectedImageId: id });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { images, isLoading, totalHits, isModalOpen, selectedImageId } =
      this.state;

    return (
      <div>
        <SearchBar searchValue={this.handleSearch} />
        {isLoading && <Loader />}

        <ImageGallery
          totalHits={totalHits}
          images={images}
          handleLoadMore={this.handleLoadMore}
          onOpen={this.handleOpenModal}
        />

        {isModalOpen && (
          <Modal
            onClose={this.handleCloseModal}
            selectedImageId={selectedImageId}
          />
        )}
      </div>
    );
  }
}

export default App;
