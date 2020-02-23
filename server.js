const express = require("express");
const app = express();

var PORT = process.env.PORT || 8080;

app.use(express.static("public"));
var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var htmlRoutes = require("./routes/htmlRoutes");
var apiRoutes = require("./routes/apiRoutes");

app.use(htmlRoutes);
app.use(apiRoutes);

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
