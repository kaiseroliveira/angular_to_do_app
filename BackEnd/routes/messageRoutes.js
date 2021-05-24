const express = require('express');
const router = express.Router();    //package for routes
const Message = require('../models/message');	//DB model
const ObjectId = require('mongoose').Types.ObjectId;    //for error checking

// getting messages route
router.get('/', (req, res) => {
    // req.query.searchKey will be param sent from front end, 
    // will be userId of currently logged in user,
    // will return all messages that have provided userId(), in back end
    // it relates with "to", as in "Send to"
    Message.find({ to: req.query.searchKey }, (error, docs) => {
        if (!error) { res.send(docs); }
        else { console.log('Error in getting messages'); }
    }).sort({ date: 'desc' }); // to sort desc order add .sort({date:'desc'})
});

// getting specific message with id route
router.get('/:id', (req, res) => {
    // checking if there is message with that specific id
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No message with provided id : ${req.params.id}`);
    // find and return
    Message.findById(req.params.id, (error, doc) => {
        if (!error) { res.send(doc); }
        else { console.log('Error in getting message with specific id'); }
    });
});

// adding new message route
router.post('/', (req, res) => {
    // create message
    var message = new Message({
        title: req.body.title,
        content: req.body.content,
        from: req.body.from,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        to: req.body.to,
    });
    // add message
    message.save((error, doc) => {
        if (!error) { res.send(doc); }
        else { console.log('Error in saving message'); }
    });
});

// update message with given id route
router.put('/:id', (req, res) => {
    // check if existing
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    // create new message
    var message = {
        title: req.body.title,
        content: req.body.content,
        new: req.body.new,
        from: req.body.from,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        to: req.body.to,
    };
    // find and update message
    Message.findByIdAndUpdate(req.params.id, { $set: message }, { new: true }, (error, doc) => {
        if (!error) { res.send(doc); }
        else { console.log('Error in message update'); }
    });
});

// delete message route
router.delete('/:id', (req, res) => {
    // checking if there is message with that specific id
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No message with provided id : ${req.params.id}`);
    // find and delete
    Message.findByIdAndRemove(req.params.id, (error, doc) => {
        if (!error) { res.send(doc); }
        else { console.log('Error in deleting message with specific id'); }
    });
});

//exporting routes
module.exports = router;
