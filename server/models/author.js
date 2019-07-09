const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const authorSchema = new Schema ({
    name: String,
    age: Number,
    authorId: String
});

mongoose.exports = mongoose.model('Author', authorSchema);