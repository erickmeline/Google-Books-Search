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

  const handleSave = ({ _id} ) => {
    API.deleteBook(_id).then((res) => {
      console.log('res',res);
      // setsavedResults(res); TODO: LOAD SAVED BOOKS
    });
  }

  return (
    <div className="container">
      {
        savedResults.length ? <div><h3>Your Saved Books</h3>{savedResults.map((book) => <Results key={book._id} book={book} saved={true} handleSave={handleSave} />)}</div>
        : <h3>Nothing Saved Yet</h3>
      }
    </div>
  );
};

export default Saved;
