const express = require('express');
const axios = require('axios');
let books = require("../booksdb.js");
const public_users = express.Router();

// Since your book data is local, we'll simulate async with axios by calling your own API endpoints

// Task 10: Get list of all books (async/await with axios)
public_users.get("/", async (req, res) => {
  try {
    // Simulate fetching all books by calling the same endpoint locally (or directly send books)
    const response = await axios.get('http://localhost:5000/booksdata/all'); // You need to create this route or adjust accordingly
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});

// Task 11: Get book details by ISBN
public_users.get("/isbn/:isbn", async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(`http://localhost:5000/booksdata/isbn/${isbn}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({ message: "Book not found", error: error.message });
  }
});

// Task 12: Get book details by Author
public_users.get("/author/:author", async (req, res) => {
  const author = req.params.author;
  try {
    const response = await axios.get(`http://localhost:5000/booksdata/author/${author}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({ message: "Books not found", error: error.message });
  }
});

// Task 13: Get book details by Title
public_users.get("/title/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const response = await axios.get(`http://localhost:5000/booksdata/title/${title}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({ message: "Books not found", error: error.message });
  }
});

module.exports.general = public_users;


