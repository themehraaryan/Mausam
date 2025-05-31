import React, {useState} from "react";
import axios from "axios";

const Navbar = ({onSearchModeToggle, onSearch}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=e6d92c11c9384c31aba94149240109&q=${query}`
      );

      const suggestionNames = response.data.map((item) => item.name);
      setSuggestions(suggestionNames);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };



  const handleSubmit = (e) => {

    e.preventDefault();
    onSearchModeToggle(true);
    setSuggestions([]);
    if (onSearch) {
      onSearch(query);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);

  };
  return (
    <nav
      className="navbar navbar-expand-lg 
        isDarkTheme navbar-dark bg-dark fixed-top"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="https://mister-aryanmehra.github.io/Mausam/">
          MAUSAMI
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <form className="d-flex ms-auto me-3" onSubmit={handleSubmit}>
          <div className="position-relative">
            <input
              type="text"
              className="form-control me-2 custom-search-width"
              placeholder="Search for a city"
              value={query}
              onChange={handleInputChange}
            />
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="suggestion-item"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="btn btn-outline-info" type="submit">
            Search
          </button>
        </form>

        <div
          className="offcanvas offcanvas-end text-bg-dark"
          id="offcanvasNavbar"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a
                  className="nav-link text-info link-warning"
                  target="_blank" rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/mister-aryanmehra/"
                >
                  About Maker
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-info link-danger"
                  target="_blank" rel="noopener noreferrer"
                  href="https://en.wikipedia.org/wiki/Climate_change"
                >
                  Climate Change
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
