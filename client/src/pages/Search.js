import React, {useRef, useState} from "react";
import API from "../utils/API";
import Results from "../components/Results"

const Search = () => {
  const inputEl = useRef('');
  const [searchResults, setsearchResults] = useState([]);
  const [searched, setsearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    API.getGoogle(inputEl.current.value).then((res) => {
      setsearchResults(res);
      setsearched(true);
    });
  }

  const handleSave = (book) => {
    API.saveBooks(book).then((res) => {
      console.log('res',res);
    });
  }

  return (
    <div className="container">
      <form className="form-group">
        <h2>Search for and save Books of Interest</h2>
        <input ref={inputEl} className="form-control" type="text" placeholder="Search a Book" />
        <button className="btn btn-dark mt-3 mb-5" onClick={(e) => handleSearch(e)}>Search</button>
      </form>
      {
        !searchResults.length && searched ?
        <h3>No Results</h3> :
        searchResults.length && searched ?
        <div><h3>Results</h3><ul>{searchResults.map((book) => <Results key={book._id} book={book} handleSave={handleSave} />)}</ul></div> :
        null
      }
    </div>
  );
};

export default Search;
