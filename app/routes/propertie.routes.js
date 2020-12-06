module.exports = app => {
  const properties = require("../controllers/propertie.controller.js");

  // Create a new Customer
  app.post("/properties", properties.create);
  app.post("/upload", properties.fupload);

  // Retrieve all Customers
  app.get("/properties", properties.findAll);

  // Retrieve a single Customer with customerId
  app.put("/properties/:propertieId", properties.findOne);

  // Update a Customer with customerId
  app.put("/properties/:propertieId", properties.update);

  // Delete a Customer with customerId
  app.delete("/properties/:propertieId", properties.delete);

  // Create a new Customer
  app.delete("/properties", properties.deleteAll);
};