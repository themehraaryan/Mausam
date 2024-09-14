import React, { useState } from 'react';
import './App.css';
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import SearchResult from './components/SearchResult.js';

function App() {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearchModeToggle = (searching) => {
    setIsSearchMode(searching);
  };

  return (
    <div>
      <Navbar 
        onSearchModeToggle={handleSearchModeToggle} 
        onSearch={(q) => setQuery(q)} // Pass the query to the state
      />
      {isSearchMode ? <SearchResult query={query} /> : <Home />}
    </div>
  );
}

export default App;
