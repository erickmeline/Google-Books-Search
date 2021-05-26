import React from "react";

function Results({ book, handleSave, saved }) {

  const handleClick = ({infoLink}) => {
    window.location = infoLink;
  }

  return (
    <li className="card mb-3">
      <div className="card-header">
        <div className="col-sm-5 float-left">
          <h5 className="card-title">{book.title}</h5>
          <h6>Written by: {book.authors}</h6>
        </div>
        <div className="col-sm-5 float-right">
          <button onClick={() => {handleClick(book)}} type="button" className="btn btn-dark mt-3 mb-5">View</button>
          &nbsp;
          <button type="button" className="btn btn-dark mt-3 mb-5" onClick={() => handleSave(book)}>{saved === true ? 'Remove' : 'Save'}</button>
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
