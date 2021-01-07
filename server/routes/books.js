const router = require('express').Router();
const { Book } = require('./../models/book');
const fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'uploads/')
    },
    filename:(req,file,callback)=>{
        callback(null,`${Date.now()}_${file.originalname}`)
    },
});
const upload = multer({storage:storage });

router.route('/list').get((req,res) => {
    const keyword= req.query.name;
    console.log(req.query.name)
    var regex = RegExp("/.*" + keyword + ".*/")
    Book.find({name:new RegExp(keyword)})
        .then(books => res.json(books))
        .catch(err => res.status(400).json('Error: ' +err));
});
router.route('/add').post(upload.single("bookImage"),(req,res)=>{
    const book = new Book({
           name:req.body.name,
           description:req.body.description,
           price:req.body.price,
           type:req.body.type,
           amount:req.body.amount,
           coverPrice:req.body.coverPrice,
           publishHouse:req.body.publishHouse,
           coverType:req.body.coverType,
           author:req.body.author,
           pageAmount:req.body.pageAmount,
           size:req.body.size,
           bookImage:req.file.filename
       })
       book.save()
       .then(() => res.json(book))
       .catch(err => res.status(201).json('Error: '+err));
     
})


router.route('/getbyid').get((req,res) => {
    Book.findById({_id: req.query.id})
        .then(book => res.json(book))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/').delete((req,res) => {
    Book.findById({_id: req.query.id})
        .then(book => {
            fs.unlinkSync(`./uploads/${book.bookImage}`);

            book.deleteOne()
                .then(() => res.json('book deleted !'))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update').put(upload.single("bookImage"),(req,res) => {
    Book.findById(req.body.id)
        .then(book => {
            fs.unlinkSync(`./uploads/${book.bookImage}`);
            book.name=req.body.name,
            book.description=req.body.description,
            book.price=req.body.price,
            book.type=req.body.type,
            book.amount=req.body.amount,
            book.coverPrice=req.body.coverPrice,
            book.publishHouse=req.body.publishHouse,
            book.coverType=req.body.coverType,
            book.author=req.body.author,
            book.pageAmount=req.body.pageAmount,
            book.size=req.body.size,
            book.bookImage=req.file.filename
            book.save()
                .then(() => res.json(book))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/updatewithoutimage').put((req,res) => {
    Book.findById(req.body.id)

        .then(book => {
            book.name=req.body.name,
            book.description=req.body.description,
            book.price=req.body.price,
            book.type=req.body.type,
            book.amount=req.body.amount,
            book.coverPrice=req.body.coverPrice,
            book.publishHouse=req.body.publishHouse,
            book.coverType=req.body.coverType,
            book.author=req.body.author,
            book.pageAmount=req.body.pageAmount,
            book.size=req.body.size,
            book.save()
                .then(() => res.json(book))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;