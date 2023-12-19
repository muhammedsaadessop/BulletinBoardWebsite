// as per the case study we have task for the name of the task 
//description what is the task about 
//status is open closed in prgress or canceled or suspened 
const mongoose = require('mongoose')
const taskschema = mongoose.Schema(
    {
        task:{type:String,required:true},
        description:{type:String,required:true},
        status:{type:String,required:true}
    }
)
module.exports = mongoose.model('Tasks',taskschema)