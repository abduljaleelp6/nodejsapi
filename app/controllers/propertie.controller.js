const Propertie = require("../models/propertie.model.js");

// Create and Save a new Propertie
exports.create = (req, res) => {
  
};
// Create and Save a new Propertie
exports.fupload = (req, res) => {
  
};

// Retrieve all Properties from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Propertie with a PropertieId
exports.findOne = (req, res) => {
  
};

// Update a Propertie identified by the PropertieId in the request
exports.update = (req, res) => {
  
};

// Delete a Propertie with the specified PropertieId in the request
exports.delete = (req, res) => {
  
};

// Delete all Properties from the database.
exports.deleteAll = (req, res) => {
  
};


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
	name: req.body.name,
	description: req.body.description,
    features: req.body.features,
    location: req.body.location,
    price: req.body.price,
    user_id: req.body.userid,
    img_url: 'http://localhost:3003/uploads/pr2.jpg',
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

/*exports.fupload = (req, res) => {
 var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
})
var upload = multer({ storage: storage }).single('file')

upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })
};
*/
exports.findAll = (req, res) => {
  Propertie.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Properties."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
	console.log("Your id: ",req.params.PropertieId);
  Propertie.findById(req.params.PropertieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Propertie with id ${req.params.PropertieId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Propertie with id " + req.params.PropertieId
        });
      }
    } else res.send(data);
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