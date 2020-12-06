const sql = require("./db.js");

// constructor
const Login = function(propertie) {
  this.username = propertie.username;
  this.email = propertie.email;
  this.password = propertie.password;
  this.type = propertie.type;
  
  //this.active = propertie.active;
};

Login.create = (newpropertie, result) => {
	console.log("submitted",newpropertie);
	if(newpropertie.type=='checkuser')
	{
  sql.query("SELECT * FROM login WHERE email =? and password=?",
  [newpropertie.email, newpropertie.password], (err, res) => {
    if (err) 
	{
      console.log("result: ", err);
      result(err, null);
      return;
    }

    if (res.length) 
	{
      console.log("result: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Propertie with the id
    result("result : ", null);
	console.log("result",result);
  });
	}
	else
	{
		//sql.query("INSERT INTO login SET ?", newpropertie, (err, res) => {
		sql.query("INSERT INTO login VALUES(0,?,?,?)",
		[newpropertie.username, newpropertie.email, newpropertie.password], (err, res) => {
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

Login.findById = (propertie, result) => {
	console.log("Submitted data: ", propertie);
 /* sql.query(`SELECT * FROM login WHERE username = ${propertie.username} and password=${propertie.password}`, (err, res) => {
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
  });*/
};

Login.getAll = result => {
  sql.query("SELECT * FROM login", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("properties: ", res);
    result(null, res);
  });
};

Login.updateById = (id, propertie, result) => {
  sql.query(
    "UPDATE login SET username = ?, email = ?, password = ? WHERE id = ?",
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

Login.remove = (id, result) => {
  sql.query("DELETE FROM login WHERE id = ?", id, (err, res) => {
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

Login.removeAll = result => {
  sql.query("DELETE FROM login", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} properties`);
    result(null, res);
  });
};

module.exports = Login;