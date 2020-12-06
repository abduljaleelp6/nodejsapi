module.exports = app => {
  const login = require("../controllers/login.controller.js");

  // Create a new Customer
  app.post("/login", login.create);

  // Retrieve all Customers
  app.get("/login", login.findAll);

  // Retrieve a single Customer with customerId
  app.get("/login/:propertieId", login.findOne);

  // Update a Customer with customerId
  app.put("/login/:propertieId", login.update);

  // Delete a Customer with customerId
  app.delete("/login/:propertieId", login.delete);

  // Create a new Customer
  app.delete("/login", login.deleteAll);
};