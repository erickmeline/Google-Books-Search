import React from "react";

function Results({ book, handleSave, isSaved }) {
  // const book = props.book;
  // const handleSave = props.handleSave;
  return (
    <li className="card mb-3">
      <div className="card-header">
        <div className="col-sm-5 float-left">
          <h5 className="card-title">{book.title}</h5>
          <h6>Written by: {book.authors}</h6>
        </div>
        <div className="col-sm-5 float-right">
          <a href={book.infoLink} type="button" className="btn btn-dark mt-3 mb-5" target="_blank" rel="noopener noreferrer">View</a>
          &nbsp;
          <button type="button" className="btn btn-dark mt-3 mb-5" onClick={() => handleSave(book)}>{isSaved(book._id) === true ? 'Remove' : 'Save'}</button>
        </div>
      </div>
      <div className="row card-body">
        <div className="col-md-2">
          { book.image?
            (<img className="img-fluid" src={book.image} alt={book.title} />)
            : null
          }
        </div>
        <div className="col-md-10">
          <p className="card-text">{book.description}</p>
        </div>
      </div>
    </li>
  );
}

export default Results;
