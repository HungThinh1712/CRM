const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require("moment");
const SALT_I = 10;
require('dotenv').config();

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required: true,
        trim: true
    },
    password:{
        type:String,
        required: true
    },
    firstname:{
        type:String,
        required: true,
        maxlength:100
    },
    lastname:{
        type:String,
        required: true,
        maxlength:100
    },
    token:{
        type:String
    },
    resetToken:{
        type:String
    },
    resetTokenExp:{
        type:Number
    },
});

userSchema.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            });
        })
    } else{
        next()
    }
});

userSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign({user_id:user._id},process.env.SECRET, {expiresIn: '180s'} )

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

const User = mongoose.model('User',userSchema);

module.exports = { User }