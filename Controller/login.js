const bcrypt = require("bcrypt");
const userdata = require("../SchemaModel/singupSchema")
// const admindata = require("../SchemaModel/admindata")
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");

exports.postlogin = async (req, res) => {
  const body = req.body;
  console.log(req.body);
  
  const user = await userdata.findOne({ email: body.email });
  if (user) {

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).json({
        success: true,
        accesstoken: token,
        fullname: user.fullname,
        role: user.role
      });
      console.log(user.role, "role");

    } else {
      res.status(400).json({
        success: false,
        message: "Invalid Password"
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "User does not exist"
    });
  }

}