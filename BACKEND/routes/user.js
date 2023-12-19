const express = require('express')

const app = express();

const router = express.Router();
const User = require('../models/user')
const encrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
router.post('/signup',(req,res)=>{
    encrypt.hash(req.body.password,10)
    .then(hash =>{


        const users = new User(

            {
                username: req.body.username,
                department:req.body.department,
                role:req.body.role,
                password : hash
            });

            users.save()
            .then(result=>{
                res.status(201).json({
            
            
                    message: 'user created',
                    result:result
                });




            })
            .catch(err =>{

res.status(500).json({

error:err});
            });
        
        });

})
var BruteProtection = require('express-brute');
 
var savestate = new BruteProtection.MemoryStore(); 
var bruteforce = new BruteProtection(savestate);


// here we proect from bruteforce and check the password and username
router.post('/login', bruteforce.prevent, (req, res) => {
    let GetUser;
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "authentication failure"
                });
            }
            GetUser = user;
     
            encrypt.compare(req.body.password, GetUser.password, (err, result) => {
                if (err || !result) {
                    return res.status(401).json({
                        message: "authentication failure"
                    });
                }
                const usertoken = jwt.sign({ username: GetUser.username, userid: GetUser._id },
                    'blah_blah_should_be_something_about_longer_than_it_is',
                    { expiresIn: '1h' });
                return res.status(200).json({ token: usertoken ,
                message:"user logged in"})
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "authentication failures"
            });
        })
})


module.exports = router