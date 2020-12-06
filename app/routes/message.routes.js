module.exports = app => {
  const message = require("../controllers/message.controller.js");

  // Create a new Customer
  app.post("/messages", message.create);

 
};