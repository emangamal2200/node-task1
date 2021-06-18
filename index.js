const express = require("express")
const app = express()
app.use(express.json())

app.get('/',(req, res)=>{
    res.send("todos") 
})
/*app.get('/todos/:id',(req, res)=>{
    console.log(req.params)
    res.send("todos") 
})*/
const todos = []
app.post('/todos',(req, res)=>{
    todos.push(req.body)
    res.status(204).end()
})
app.get('/todos',(req, res)=>{
    res.json(todos)
})
app.get('/todos/:id',(req, res)=>{
    const{ id } = req.params
    const todo = todos.find((todo)=> +todo.id === +id)
    if(!todo){
        res.status(404).json({ message: "not found" });
    }
    res.json(todo)
})
app.patch("/todos/:id", (req, res) => {
    const data_id = req.params.id;
    const data_update = req.body;
    console.log(data_update.name);
    for (let da of todos) {
      if (da.id == data_id) {
        if (data_update.data != null || undefined)
          da.data = data_update.data;
        return res
          .status(200)
          .json({ message: "Updated Succesfully", data: da });
      }
    }
    res.status(404).json({ message: "Invalid Order Id" });
  });
app.delete("/todos/:id", (req, res) => {
    const data_id = req.params.id;
    for (let da of todos) {
      if (da.id == data_id) {
        todos.splice(todos.indexOf(da), 1);
        return res.status(200).json({
          message: "Deleted Successfully"
        });
      }
    }
    res.status(404).json({ message: "Invalid Order Id" });
  });
app.listen(3000, ()=>{
    console.log(`Server is up and running on: //localhost${3000}`)
})