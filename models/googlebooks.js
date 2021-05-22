const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const book = new Schema({
  title: { type: String, required: true },
  authors: { type: String, required: true },
  description: { type: String },
  link: { type: String },
  image: { type: String }
});

const Book = mongoose.model("Book", book);

module.exports = Book;
