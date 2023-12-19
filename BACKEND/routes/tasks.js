const express2 = require('express')
const router = express2.Router();
const task = require('../models/tasks');
const { models } = require('mongoose');
const checkauth = require('../check-auth')
// if task is found post a message 
router.get('', checkauth, (req, res) => {
  task.find().then((tasklist) => {
    if (tasklist.length > 0) {
      res.json({
        message: 'Tasks found',
        tasklist: tasklist
      });
    } else {
      res.status(400).json({
        message: 'No Tasks Found',
      });
    }
  });
});

router.post('', checkauth, (req, res) => {
  console.log(req.body); 
  const taskmanage = new task({
    task: req.body.task,
    description: req.body.description,
    status: req.body.status
  });

  taskmanage.save().then((result) => {
    if (result) {
      res.status(201).json({
        message: 'Task created',
        task: taskmanage
      });
    } else {
      res.status(400).json({
        message: 'Task not created',
      });
    }
  });
});

router.delete('/:id', checkauth, (req, res) => {
  task.deleteOne({_id: req.params.id}).then((result) => {
    if (result.n > 0) {
      res.status(200).json({message: "Task deleted"});
    } else {
      
    }
  });
});


  module.exports = router