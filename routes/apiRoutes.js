const express = require('express');
const multer = require('multer');
var router = express.Router();


// TODO write a function the changes the filename and keeps extension
// storage option to keep file name extensions
const storage = multer.diskStorage({
 destination: function (req, file, cb) {
   cb(null, 'public/images')
 },
 filename: function (req, file, cb) {
   cb(null, file.originalname)
 }
})
//storing storage option "upload"
const upload = multer({ storage: storage })


var db = require('../models');


router.get("/api/pics", function(req, res) {
  db.Picture.findAll({}).then(result => {
    res.json(result);
  }).catch((err) => {
      console.log(err);
    });
})



router.post('/upload/photo', upload.single('myImage'), (req, res, next) => {
    const file = req.file
    var body = req.body;
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }

    var body = {
        pictureLink: file.path,
        picName: body.imageName,
        picColor: body.imageColor
    }
    db.Picture.create(body).then((result) => {
        res.redirect("/")
        }).catch((err) => {
        console.log(err);
    });
});



router.post('/upload/multiplePhoto', upload.array('myImages', 4), (req, res, next) => {
    const files = req.files
    var fileLength = files.length;
    var count = 0
    console.log(fileLength);

  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
    }

    files.forEach(file => {
        var body = {
        pictureLink: file.path,
    }
        db.Picture.create(body).then((result) => {
            count++
            if (count = fileLength) {
                res.redirect("/")
            }
        }).catch((err) => {
        console.log(err);
    });
    })
})

module.exports = router;


