const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/notebookDB";

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