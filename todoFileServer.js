const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());

app.get("/", (req,res)=> {
    fs.readFile("todos.json", "utf-8", (err,data)=> {
        if(err) throw err;
        //converting the data from json to object format 
        const todos=JSON.parse(data);
        res.status(200).json(todos)
    })
})

app.post("/todos", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 10000),
    title: req.body.title,
    author: req.body.author,
  };
  //first read file
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    //array of data is returned in json format if it was not parsed then it would be in string format and give error
    const todos = JSON.parse(data);
    //pushing new item
    todos.push(newTodo);
    //again writing the same file in string manner
    //converts object to json
    fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(200).json(newTodo);
    });
  });
});

app.listen(3000, () => {
  console.log("Server running");
});
