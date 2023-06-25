const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express();
app.use(cors())
app.use(bodyParser.json())
//get all the todos
app.get("https://todo-app-kvcr.onrender.com/todos", (req, res) => {
    fs.readFile("todos.json", "utf-8", (err, data) => {
      if (err) throw err;
      res.send(JSON.parse(data));
    });
});

//create a new todo
// let counter = 4;
app.post("https://todo-app-kvcr.onrender.com/todos", (req, res) => {
    const { title, description } = req.body;
    // const uniqueId = uuid();
    const uniqueId = Math.floor(Math.random()*100);
    const newTodo = {
      title: title,
      description: description,
      id: uniqueId,
    };
    fs.readFile("todos.json", "utf-8", (err, data) => {
      if (err) throw err;
      const todos = JSON.parse(data);
      todos.push(newTodo);
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        // res.status(201).json(todos)
        // res.status(201).send({ id: uniqueId });
        res.status(201).json(todos)
      });
    });
  });

//delete todo
app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;
    console.log("id:",id)
    let isPresent = false;
    fs.readFile("todos.json", "utf-8", (err, data) => {
      if (err) throw err;
      const todos = JSON.parse(data);
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
          isPresent = true;
          todos.splice(i, 1);
          break;
        }
      }
      if (isPresent) {
        fs.writeFile('todos.json',JSON.stringify(todos),(err)=>{
          if(err) throw err;
          res.status(200).json(todos);
        })
      } else {
        console.log(todos)
        res.sendStatus(404);
      }
    });
  });  

app.listen(5000,()=>{
    console.log('server started at 5000')
})