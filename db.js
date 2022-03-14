require("dotenv").config();
const mongoose = require("mongoose");
const uri = "mongodb+srv://Admin-Jay:"+process.env.PASSWORD+"@cluster0.4v9bd.mongodb.net/notebookDB?retryWrites=true&w=majority";

const connectToMongo = ()=>{
    mongoose.connect(uri,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Connected To MongodDB");
        }
    })
}


module.exports = connectToMongo;