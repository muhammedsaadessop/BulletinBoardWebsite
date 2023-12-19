// here we generate the tokens 
const jwt = require('jsonwebtoken');
module.exports=(req,res,next)=>{

try{
const token = req.headers.authorization.split(" ")[1];
jwt.verify(token,'blah_blah_should_be_something_about_longer_than_it_is')

next();

}
catch(error)
{
    res.status(401).json({

message:"Invalid token"
    });
}

};
