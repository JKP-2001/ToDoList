const connectToMongo = require("./db");
const express = require("express");
connectToMongo();
const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hey");
})

app.use("/api/auth",require('./routes/auth.js'));
app.use("/api/notes",require('./routes/notes.js'));

app.listen(5000,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server Run On Port 5000");
    }
})

