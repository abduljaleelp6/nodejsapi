const Propertie = require("../models/message.model.js");

// Create and Save a new Propertie
exports.create = (req, res) => {
  
};
// Create and Save a new Propertie



exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Propertie
  const propertie = new Propertie({
    
    id:req.body.pid,
	headline: req.body.name,
	description: req.body.description,
    user_id: req.body.userid,
    type: req.body.type,
  
  });

  // Save Propertie in the database
  Propertie.create(propertie, (err, data) => 
  {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Propertie."
      });
    else res.send(data);
  });
	};




exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Propertie.updateById(
    req.params.PropertieId,
    new Propertie(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Propertie with id ${req.params.PropertieId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Propertie with id " + req.params.PropertieId
          });
        }
      } else res.send(data);
    }
  );
};


exports.delete = (req, res) => {
  Propertie.remove(req.params.PropertieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Propertie with id ${req.params.PropertieId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Propertie with id " + req.params.PropertieId
        });
      }
    } else res.send({ message: `Propertie was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Propertie.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Properties."
      });
    else res.send({ message: `All Properties were deleted successfully!` });
  });
};