// here we set the user schema 
// username and password for login
// role for the role they play in the derpartment 
//depertmant which area of work they belong to 
const mongoose = require("mongoose")
const userschema = mongoose.Schema(
    {
        username: {type:String ,required: true},
        department: {type:String ,required: false},
        role:{type:String ,required: false},
        password: {type:String, requred:true}
    }
)

module.exports = mongoose.model('Users',userschema)
