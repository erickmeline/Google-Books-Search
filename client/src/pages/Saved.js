import React, {useEffect, useState} from "react";
import API from "../utils/API";
import Results from "../components/Results"

const Saved = () => {
  const [savedResults, setsavedResults] = useState([]);

  useEffect(() => {
    API.getBooks().then(res => {
      setsavedResults(res);
    });
    },
  []);

  const handleSave = (book) => {
    console.log('save',book);
    API.saveBook(book).then((res) => {
      console.log('res',res);
      setsavedResults(res);
    });
  }

  return (
    <div className="container">
      {
        savedResults.length ? (savedResults.map((book) => <Results key={book.id} book={book} handleSave={handleSave} />))
        : <h3>Nothing Saved Yet</h3>
      }
    </div>
  );
};

export default Saved;
