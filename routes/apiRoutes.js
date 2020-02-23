const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
var router = express.Router();

// storage option to keep file name extensions
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function(req, file, cb) {
    var fileExt = file.originalname.split(".");
    var uniqueNum = Date.now();
    for (let i = 0; i < 8; i++) {
      var ranNum = Math.floor(Math.random() * 999999) + 1000;
      uniqueNum += "-" + ranNum;
    }
    var fileName = "pic-" + uniqueNum + "." + fileExt[1];
    cb(null, fileName);
  }
});
//storing storage option "upload"
const upload = multer({ storage: storage });

var db = require("../models");

router.get("/api/pics", function(req, res) {
  db.Picture.findAll({})
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/upload/photo", upload.single("myImage"), (req, res, next) => {
  const file = req.file;
  console.log(file);
  var body = req.body;
  var dbSelect;

  if (body.database === "Picture") {
    dbSelect = db.Picture;
  } else if (body.database === "Pic") {
    dbSelect = db.Pic;
  }

  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }

  var body = {
    pictureLink: file.path,
    picName: body.imageName,
    picColor: body.imageColor
  };
  dbSelect
    .create(body)
    .then(result => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
});

router.post(
  "/upload/multiplePhoto",
  upload.array("myImages", 6),
  (req, res, next) => {
    const files = req.files;
    var fileLength = files.length;
    var count = 0;

    if (!files) {
      const error = new Error("Please choose files");
      error.httpStatusCode = 400;
      return next(error);
    }

    files.forEach(file => {
      var body = {
        pictureLink: file.path
      };
      db.Picture.create(body)
        .then(result => {
          count++;
          if ((count = fileLength)) {
            res.redirect("/");
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
);

router.get("/api/file/:downloadLink", function(req, res) {
  var param = req.params.downloadLink;
  var file = path.join(__dirname, "../public/uploads/" + param);

  if (fs.existsSync(file)) {
    res.download(file);
  } else {
    res.send("No file");
    throw new Error("File Doesn't exist");
  }
});
module.exports = router;
