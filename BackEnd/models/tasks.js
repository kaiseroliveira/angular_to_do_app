const mongoose = require('mongoose');

// TASK SCHEMA FOR MONGOOSE DATABASE
const taskSchema = new mongoose.Schema({
  title: {    type: String, required: true },
  description: {    type: String, },
  startDate: {    type: Date, required: true},
  endDate: {    type: Date},
  reminder: {    type: Date },
  status: {    type: String, required: true},
  priority : {    type: String},
  ownerID : {type: String, required: true},
  sharedWith : {type: String}
});


const task = mongoose.model('task', taskSchema);
module.exports = { task };