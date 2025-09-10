// index.js
const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require("./router/auth_users").authenticated;
const genl_routes = require("./router/general").general;
const books = require("./booksdb");

const app = express();

app.use(express.json());

app.use("/customer", session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true
}));

app.get("/booksdata/all", (req, res) => {
    return res.status(200).json(books);
  });

 
app.get("/booksdata/author/:author", (req, res) => {
    const author = req.params.author.toLowerCase();
    const filteredBooks = Object.entries(books)
      .filter(([_, book]) => book.author.toLowerCase() === author)
      .map(([isbn, book]) => ({ isbn, ...book }));
  
    if (filteredBooks.length > 0) {
      res.status(200).json(filteredBooks);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  });
  
// Middleware to verify token
app.use("/customer/auth/*", function auth(req, res, next) {
  if (!req.session.authorization) {
    return res.status(403).json({ message: "User not logged in" });
  }

  const token = req.session.authorization.token;

  try {
    const decoded = jwt.verify(token, "fingerprint_customer");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
});

app.use("/customer", customer_routes);
app.use("/", genl_routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

