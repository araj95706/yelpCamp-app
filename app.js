var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var campGroundsSchema = new mongoose.Schema({
  name: String,
  image: String,
});

var campGrounds = mongoose.model("campGrounds", campGroundsSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campGrounds", (req, res) => {
  res.render("campGrounds", { campGrounds: campGrounds });
});

app.post("/campGrounds", (req, res) => {
  var name1 = req.body.name;
  var image1 = req.body.image;
  campGrounds.insertMany({ name: name1, image: image1 });

  res.redirect("/campGrounds");
});

app.get("/campGrounds/new", (req, res) => {
  res.render("new");
});

var server = app.listen("4444", () => {
  console.log("the sever has been started.");
});
