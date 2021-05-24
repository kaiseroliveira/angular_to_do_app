const mongoose = require('mongoose');
// database setup for mongoose
mongoose.connect('mongodb+srv://Lucas:nhMWVk5ZD8MP3pP@cluster0.rusk1.mongodb.net/Cluster0?retryWrites=true&w=majority', {useNewUrlParser : true}).then( () => {
  console.log("Connected to MongooseDB!");
}).catch((err) => {
  console.log("Error to connect to MongooseDB!");
  console.log(err);
});


// fixing deprecation warnings
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


module.exports = mongoose;
