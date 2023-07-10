const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/data", (req, res) => {
  const data = { message: "Hello world" };
  res.json(data);
});

app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  const response = { message: "Sign in success" };
  res.json(response);
});

app.use(express.static(path.join(__dirname, "public")));

const port = 3000;
app.listen(port, () => {
  console.log("Server start port");
});
