import React, {useRef, useState} from "react";
import API from "../utils/API";
import Results from "../components/Results"

const Search = () => {
  const inputEl = useRef('');
  const [searchResults, setsearchResults] = useState([]);
  const [searchTerm, setsearchTerm] = useState('');

  const handleChange = (e) => {
    setsearchTerm(e.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    API.getGoogle(inputEl.current.value).then((res) => {
      if (res.data.totalItems) {
        const books = res.data.items.map(bookData => book(bookData));
        setsearchResults(books);
      }
      else {
        setsearchResults([]);
      }
    });
  }

  const handleSave = (book) => {
    console.log('save',book);
    API.saveBooks(book).then((res) => {
      console.log('res',res);
    });
  }

  const book = (bookData) => {
    return {
      _id: bookData.id,
      title: bookData.volumeInfo.title,
      authors: bookData.volumeInfo.authors,
      description: bookData.volumeInfo.description,
      image: bookData.volumeInfo.imageLinks ? bookData.volumeInfo.imageLinks.thumbnail : null,
      infoLink: bookData.volumeInfo.infoLink
    }
  }

  return (
    <div className="container">
      <form className="form-group">
        <h2>Search for and save Books of Interest</h2>
        <input ref={inputEl} className="form-control" type="text" onChange={(e) => {handleChange(e)}} placeholder="Search a Book" />
        <button className="btn btn-dark mt-3 mb-5" onClick={(e) => handleClick(e)}>Search</button>
      </form>
      {
        !searchResults.length && searchTerm.length ?
        <h3>No Results</h3> :
        searchResults.length && searchTerm.length ?
        <div><h3>Results</h3><ul>{searchResults.map((book) => <Results key={book._id} book={book} handleSave={handleSave} />)}</ul></div> :
        null
      }

    </div>
  );
};

export default Search;
