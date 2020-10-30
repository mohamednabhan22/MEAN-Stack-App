const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./models/post");
const mongoose = require("mongoose");

const app = express();

mongoose.connect('mongodb+srv://venkatkotha:92V2vaQ93bPVNVW@cluster0.yznje.mongodb.net/angular-nodeApp?retryWrites=true&w=majority')
.then(() => console.log('Connected to Server'))
.catch(() => console.log('Connection Failed!'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//MongoKey//92V2vaQ93bPVNVW

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/posts", (req, res, next) => {
Post.find().then(documents =>
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: documents
  }))

});

module.exports = app;
