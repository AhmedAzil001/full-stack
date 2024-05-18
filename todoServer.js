const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

app.use(bodyParser.json());

let todos = [];

function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == id) return i;
  }
  return -1;
}

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 10000),
    title: req.body.title,
    author: req.body.author,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  let index = findIndex(todos, parseInt(id));
  if (index === -1) res.status(404).send();
  else todos.splice(index, 1);
  res.status(200).json(todos);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


//all other routes will give 404 error
app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
