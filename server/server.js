require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const todoSchema = require('./model/todoSchema');
const connectDB = require('./connetMDB');
const cors = require('cors');

const app = express()
const port = 4000

app.use(express.text())
app.use(cors());

connectDB();

app.get('/api', async (req, res) => {
  const getAllTodo = await todoSchema.find();
  
  res.send(getAllTodo)
})

app.post('/api/add', async (req, res) => {
  try{
    let newTodo = req.body;
    
    const createTodo = await todoSchema.create({
      todo: newTodo
    })

    res.send(createTodo)
  }catch(err){
    console.log(`Error: added failed, ${err}`)
  }
})

app.delete('/api/delete', async (req, res) => {
  try{
    const id = req.body;
    
    await todoSchema
    .findByIdAndDelete(id)
    
  }catch(err){
    console.log(`Error: delete failed , ${err}`)
    res.sendStatus(405).send('Deleted Failed!')
  }
})

mongoose.connection.once('open', () => {
  console.log('Connected to mongoDB');
  app.listen(port, () => console.log(`Listening on port ${port}`))
})