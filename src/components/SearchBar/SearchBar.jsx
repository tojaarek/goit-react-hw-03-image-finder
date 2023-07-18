import searchBar from './SearchBar.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  handleSearch = event => {
    event.preventDefault();

    const formHTML = event.currentTarget;
    const searchValue = formHTML.elements.searchInput.value;

    this.props.searchValue({ searchValue });
  };

  render() {
    return (
      <header className={searchBar.header}>
        <form className={searchBar.form} onSubmit={this.handleSearch}>
          <button type="submit" className={searchBar.button}>
            <span className="button-label">Search</span>
          </button>

          <input
            name="searchInput"
            className={searchBar.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  searchValue: PropTypes.func.isRequired, // Oczekuje funkcji, wymagane
};

export default SearchBar;
