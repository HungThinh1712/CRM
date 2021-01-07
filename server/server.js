const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 



const app = express();


const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE,{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Routers
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
app.use('/api/book', booksRouter);
app.use('/api/user', usersRouter);



//=================================
//              USERS
//=================================




const port =process.env.PORT || 3002;
app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})


