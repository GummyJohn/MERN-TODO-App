const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

async function connectDB(){
  try{
    await mongoose.connect(uri)
  }catch(err){
    console.log(`Error: Connection to MongoDB failed, ${err}`)
  }
}


module.exports = connectDB;