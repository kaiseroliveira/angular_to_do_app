const express = require('express');
const { isValidObjectId } = require('mongoose');

const router = express.Router();
const { task } = require('../models/tasks');
const ObjectId = require('mongoose').Types.ObjectId;

// this function will return all tasks on the database on ascendant order
router.get('/', (req, res) => {
  task.find((err, docs) => {
    if (!err) {res.send(docs);}
    else {console.log("Error found!"); console.log(err);}
  }).sort({ endDate: 'asc' });
});

// this function will created a new task on the database with the values passed as parameter
router.post('/', (req, res) => {
  let newTask = new task({
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    reminder: req.body.reminder,
    status: req.body.status,
    priority: req.body.priority,
    ownerID: req.body.ownerID,
    sharedWith: req.body.sharedWith
  });

  newTask.save((err, doc) => {
    if (!err) {res.send(doc);}
    else { console.log("Error Creating the post!"); console.log(err);}
  });
});

// this function will return the task passed as parameter, task id will be passed on url
router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record of given id: ${req.params.id}`);

  task.findById(req.params.id, (err, doc) => {
    if (!err) {res.send(doc);}
    else { console.lig("Error Creating the post!"); console.log(err);}
  });
});

// this function will find and update task passed as parameter, task id will be passed on url
router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record of given id: ${req.params.id}`);

  let updateTask = {
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    reminder: req.body.reminder,
    status: req.body.status,
    priority: req.body.priority,
    ownderID: req.body.ownerID,
    sharedWith: req.body.sharedWith
  };    

  task.findByIdAndUpdate(req.params.id, {$set: updateTask}, {new:true}, (err, doc) => {
    if (!err) {res.send(doc);}
    else { console.lig("Error Creating the post!"); console.log(err);}
  });
});

// This function will find and delete task passed as parameter, task id will be passed on url
router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record of given id: ${req.params.id}`);

  task.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {res.send(doc);}
    else { console.lig("Error Creating the post!"); console.log(err);}
  });
});


module.exports  = router;