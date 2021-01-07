const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        maxlength:100
    },
    description:{
        required: true,
        type: String,
        maxlength:100000
    },
    price:{
        required: true,
        type: Number,
        maxlength: 255
    },
    type:{
        required: true,
        type: String,
        maxlength:50
    },
    amount:{
        default:0,
        type: Number,
        maxlength:50
    },
    coverPrice:{
        required: true,
        type: Number,
        maxlength: 255
    },
    coverType:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    pageAmount:{
        type: Number,
        required: true,
    },
    size:{
        type: String,
        required: true,
    },
    publishHouse:{
        type: String,
        required: true,
    },
    bookImage:{
        type: String,
        required: true,
    }
},{timestamps:true});

const Book = mongoose.model('Book',bookSchema);
module.exports = { Book }