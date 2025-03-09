const express = require('express')
const app= express()
const todos = require('./mongo')
const cors  = require('cors')
require('dotenv').config();

const path = require('path')

const __dirname =path.resolve()

app.use(express.json())
app.use(cors())


app.get('/get/todos', async(req,resp)=>{
    let data = await  todos.find()
    resp.send(data)
})
 
app.post('/api/todos',async(req,resp)=>{ 
   console.log(req.body)
     let data = new todos(req.body)
     let result = await data.save()
     resp.send(result)
})

app.delete('/api/todos/:id',async(req,resp)=>{
  let data = await todos.deleteOne({_id:req.params.id})
  resp.send(data)
})


app.use(express.static(path.join(__dirname , "../frontend/dist")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
