const express = require('express')
const multer = require('multer');
var upload = multer({ dest: 'public/images' })

const app = express();

var PORT = process.env.PORT || 8080;

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',function(req,res){
  res.sendFile(__dirname + '/public/home.html');
});


app.post('/upload/photo', upload.single('myImage'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)

});


app.post('/upload/multiplePhoto', upload.array('myFiles', 2), (req, res, next) => {
  const files = req.files
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }

    res.send(files)

})

app.listen(PORT, () => console.log('Server started on port ' + PORT));