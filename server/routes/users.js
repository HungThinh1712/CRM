const router = require('express').Router();
const { User } = require('../models/user');



router.route('/register').post((req,res)=>{
    const user = new User(req.body);

    user.save((err,doc)=>{
        if(err) return  res.status(201).json(err);
        res.status(200).json({
            success: true,
            userdata:doc
        })
    })
});

router.route('/login').post((req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.status(201).json("Email không tồn tại");

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.status(201).json("Sai mật khẩu");
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.status(200).json(
                    user.token)
            })
        })
    })
})

module.exports = router;