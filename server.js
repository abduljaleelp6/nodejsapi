const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var multer = require('multer')
var cors = require('cors');
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

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
// parse requests of content-type: application/json
app.use(bodyParser.json());
app.use(cors());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
require("./app/routes/customer.routes.js")(app);
require("./app/routes/propertie.routes.js")(app);
require("./app/routes/login.routes.js")(app);
require("./app/routes/message.routes.js")(app);
// set port, listen for requests
app.listen(3003, () => {
  console.log("Server is running on port 3003.");
});