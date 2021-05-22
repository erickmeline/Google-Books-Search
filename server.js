const express = require("express");
const path = require("path");
const axios = require("axios");
const PORT = process.env.PORT || 3001;
const app = express();
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

// Define API routes here
app.get("/api/books", (req, res) => {
// hit mongo to fetch all books as json
  db.Book.find({}).then((books) => {
    res.json(books);
    console.log('books',books);
  }).catch(err => {
      res.status(400).json(err);
  });
});
app.post("/api/books", (req, res) => {
// save book to mongo req.body
  db.create(req.body).then((newBook) => {
    res.json(newBook);
  }).catch(err => {
      res.status(400).json(err);
  });
});
app.delete("/api/books/:id", (req, res) => {
// remove book in mongo by id from req.param
  db.book.findById(req.params.id).then((book) => {
    book.remove();
  }).then(() => {
    res.json(true);
  });
  // OR
  // db.book.deleteOne({_id:req.params.id})
});
app.get("/google", (req, res) => {
// fetch google endpoint with search param
// https://www.googleapis.com/books/v1/volumes?q=coraline
  if (req.query.title) {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.query.title}`).then((response) => {
      console.log(response.data.items);
      res.json(response.data.items);
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
