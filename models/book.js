const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  _id: { type: String },
  title: { type: String },
  authors: { type: Array },
  description: { type: String },
  image: { type: String },
  infoLink: { type: String }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
