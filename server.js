const express = require("express");
const path = require("path");
const axios = require("axios");

const PORT = process.env.PORT || 3001;
const app = express();

// Connect to the Mongo DB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/booksDB", { useNewUrlParser: true });
const db = require("./models");


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// hit mongo to fetch all saved books
app.get("/api/books", (req, res) => {
  db.Book.find({}).then((books) => {
    res.json(books);
  }).catch(err => {
      res.status(400).json(err);
  });
});


// save book to mongo req.body
app.post("/api/books", (req, res) => {console.log('save req',req.body);
  db.Book.create(req.body).then((newBook) => {
    res.json(newBook);
  }).catch(err => {
    res.status(400).json(err);
  });
});


// remove book in mongo by id from req.param
app.delete("/api/books/:id", (req, res) => {
  db.Book.findById(req.params.id).then((book) => {
    book.remove();
  }).then(() => {
    res.json(true);
  });
  // OR
  // db.book.deleteOne({_id:req.params.id})
});


// fetch a book by id from saved books
app.get("/api/book/:id", (req, res) => {
  db.Book.findById(req.params.id).then((book) => {
    res.json(book);
  }).catch(err => {
    res.status(400).json(err);
  });
});


// fetch google endpoint with search param
// example: https://www.googleapis.com/books/v1/volumes?q=coraline
app.get("/api/google", (req, res) => {
  if (req.query.query) {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.query.query}`).then((response) => {
      if (response.data.totalItems) {
        const books = response.data.items.map((book) => {
          return {
            _id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null,
            infoLink: book.volumeInfo.infoLink
          }
        });
        res.json(books);
      }
      else {
        res.json([]);
      }
    })
  }
  else {
    res.json(false);
  }
});


// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
