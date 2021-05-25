import axios from "axios";

export default {
  // Gets books with query
  getGoogle: function (query) {
    // return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    return axios.get(`/api/google?query=${query}`).then(result => result.data);
  },
  // Deletes the book with the given id
  deleteBooks: function (_id) {
    return axios.delete("/api/books/" + _id).then(result => result.data);
  },
  // Saves a book to the database
  saveBooks: function (bookData) {
    return axios.post("/api/books", bookData).then(result => result.data);
  },
  // Get saved books from the database
  getBooks: function () {
    return axios.get("/api/books").then(result => result.data);
  }
};
