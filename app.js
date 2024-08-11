const express = require("express");
const mongoose = require("mongoose");
const app = express();

const users = require("./models/users");

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/signup");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  users.create({
    username,
    password,
  });
  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let user = await users.findOne({ username });
  console.log(user);
  if (user) {
    if (user.username === username && user.password === password) {
      console.log(user);
      res.redirect("/index");
    } else {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
});

app.get("/index", (req, res) => {
  res.render("index");
});

mongoose
  .connect("mongodb://localhost:27017/UserAuth")
  .then(() => {
    app.listen(3000, () => {
      console.log("listening.....");
    });
  })
  .catch((err) => {
    console.log(err);
  });
