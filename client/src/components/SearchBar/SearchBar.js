import React from "react";
import "./style.css";

function SearchBar() {
  return (
    <div className="search-bar">
      <div className="search-fields">
        <input
          type="text"
          name="location"
          placeholder="Location"
          label="Location"
        />
        <input type="text" name="tags" placeholder="Tags" label="Tags" />
        <input type="number" name="rooms" placeholder="Rooms" label="Rooms" />
        <button className="search-button">Search</button>
      </div>
    </div>
  );
}

export default SearchBar;
