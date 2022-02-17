const bcrypt = require("bcrypt");
const userdata = require("../SchemaModel/singupSchema")


exports.checkDuplicateUsernameOrEmail = (req, res, next) => {

    const body = req.body;
    if (!(body.email && body.password)) { 
      return res.status(400).send({ error: "Data not formatted properly" });
    }
    userdata.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(200).send({ message: "Failed! Email is already in use!" });
        console.log("Failed! Email is already in use!");
        return;
      }

      next();
    });
  };





exports.postsingup =  async (req, res, next)=>{
  const body = req.body;
  console.log(req.body);
    // if (!(body.email && body.password)) { 
    //   return res.status(400).send({ error: "Data not formatted properly" });
    // }

     const user = new userdata(body); 
     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(user.password, salt);
     user.cnfpassword = await bcrypt.hash(user.password, salt);
     user.save().then((doc) => res.status(201).json({message: "successfully singup"}));
}