const sql = require("./db.js");

// constructor
const Propertie = function(propertie) {
  this.id=propertie.id;
  this.headline = propertie.headline;
  this.description = propertie.description;
  this.user_id = propertie.user_id;
  this.type = propertie.type;
  
  //this.active = propertie.active;
};

Propertie.create = (newpropertie, result) => {
	
	if(newpropertie.type=="all")
	{
		
		sql.query("SELECT * FROM messages", (err, res) => {
		//sql.query("SELECT * FROM messages WHERE user_id = ?",[newpropertie.user_id], (err, res) => {
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
		sql.query("DELETE FROM messages WHERE id = ?",[newpropertie.user_id], (err, res) => {
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
	
	else
	{
		delete newpropertie["type"];
		delete newpropertie["id"];
  sql.query("INSERT INTO messages SET ?", newpropertie, (err, res) => {
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


module.exports = Propertie;