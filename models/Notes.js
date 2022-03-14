const mongoose = require("mongoose");
const User = require("./User");

const NoteSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    title:{type:String,required:true},
    description:{type:String,required:true},
    tag:{type:String,default:"General"},
    date:{type:String,default:Date.now}
});

module.exports = mongoose.model("Note",NoteSchema);