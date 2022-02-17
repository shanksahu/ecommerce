const config = require("../config/auth.config");
const addtocart = require("../SchemaModel/addtocart")
var bodyParser = require('body-parser');



var jwt = require("jsonwebtoken");



exports.verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    console.log("Authorized! token");

    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
    console.log("Unuthorized! token");

      return res.status(401).send({ message: "Unauthorized!" });
    }


    req.user_id = decoded.id;
    next();
  });
};