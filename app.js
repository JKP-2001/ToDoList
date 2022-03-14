const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')
const app = express();
app.use(cors())
connectToMongo();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hey");
})

app.use("/api/auth",require('./routes/auth.js'));
app.use("/api/notes",require('./routes/notes.js'));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}



app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server Run On Port 5000");
    }
})

