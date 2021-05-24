// express
const express = require('express');
const app = express();

// cors
const cors = require('cors');
app.use(cors({origin: 'http://localhost:4200'}));



// Setting up body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//database connection
const { mongoose } = require('./database');

// ROUTES
const taskRouter = require('./routes/task_route');
const messageRoutes = require('./routes/messageRoutes.js');



// listening to port 
app.listen(3000, () => console.log('Server started!'));

//Using routes
app.use('/tasks', taskRouter);
app.use('/messages', messageRoutes);