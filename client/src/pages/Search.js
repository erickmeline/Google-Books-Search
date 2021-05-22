import React, {useRef} from "react";
import API from "./utils/API";

const Search = () => {
  const inputEl = useRef('');
  const handleClick = () => {
    console.log('search',inputEl.current.value);
    API.getBook(inputEl.current.value);
  }

  return (
    <div>
        <h3>search</h3>
        <input ref={inputEl} type="text" />
        <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default Search;
