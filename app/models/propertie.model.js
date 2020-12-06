const sql = require("./db.js");

// constructor
const Propertie = function(propertie) {
  this.id=propertie.id;
  this.name = propertie.name;
  this.description = propertie.description;
  this.features = propertie.features;
  this.location = propertie.location;
  this.price = propertie.price;
  this.user_id = propertie.user_id;
  this.img_url = propertie.img_url;
  this.type = propertie.type;
  
  //this.active = propertie.active;
};

Propertie.create = (newpropertie, result) => {
	
	if(newpropertie.type=="single")
	{
		 console.log("id: ",newpropertie.id);
	sql.query(`SELECT * FROM properties WHERE id = ?`,[newpropertie.id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found propertie: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Propertie with the id
    result({ kind: "not_found" }, null);
  });
	}
	else if(newpropertie.type=="all")
	{
		
		sql.query("SELECT * FROM properties", (err, res) => {
		//sql.query("SELECT * FROM properties WHERE user_id = ?",[newpropertie.user_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("messages: ", res);
    result(null, res);
  });
		 
	}
	else if(newpropertie.type=="delete")
	{
		sql.query("DELETE FROM properties WHERE id = ?",[newpropertie.user_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Propertie with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted properties with id: ", id);
    result(null, res);
  });
	}
	else if(newpropertie.type=="update")
	{
		 sql.query("UPDATE properties SET  name = ?,description = ?, features = ? WHERE id = ?",
    [newpropertie.name,newpropertie.description, newpropertie.features, newpropertie.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Propertie with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated propertie: ", { id: newpropertie.id, ...newpropertie});
      result(null, { id: newpropertie.id, ...newpropertie });
    }
  );
	}
	else
	{
		delete newpropertie["type"];
		delete newpropertie["id"];
  sql.query("INSERT INTO properties SET ?", newpropertie, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created propertie: ", { id: res.insertId, ...newpropertie });
    result(null, { id: res.insertId, ...newpropertie });
  });
	}
};
Propertie.fupload = (newpropertie, result) => {
	
	
  
};
 
Propertie.findById = (PropertieId, result) => {
	
 // sql.query(`SELECT * FROM properties WHERE id = ${PropertieId}`, (err, res) => {
  sql.query(`SELECT * FROM properties WHERE id = 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found propertie: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Propertie with the id
    result({ kind: "not_found" }, null);
  });
};

Propertie.getAll = result => {
  sql.query("SELECT * FROM properties", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("properties: ", res);
    result(null, res);
  });
};

Propertie.updateById = (id, propertie, result) => {
  sql.query(
    "UPDATE properties SET description = ?, name = ?, active = ? WHERE id = ?",
    [propertie.description, propertie.name, propertie.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Propertie with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated propertie: ", { id: id, ...propertie });
      result(null, { id: id, ...propertie });
    }
  );
};

Propertie.remove = (id, result) => {
  sql.query("DELETE FROM properties WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Propertie with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted properties with id: ", id);
    result(null, res);
  });
};

Propertie.removeAll = result => {
  sql.query("DELETE FROM properties", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} properties`);
    result(null, res);
  });
};

module.exports = Propertie;