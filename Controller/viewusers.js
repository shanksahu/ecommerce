const userdata = require("../SchemaModel/singupSchema")


exports.viewusers = async (req, res)=>{
        
        //  userdata.find(({}), (err, item)=>{
        //      if(err){
        //          res.status(401).json({err: "error"})
        //      }
        //      res.json(item)
        //      console.log("data is called");
        //  })

        const user =  await userdata.find({role : {$ne:"shankadmin"}})
        // const user =  await userdata.find({})
        // user.exclude(user.role);
        res.send(user)
        console.log("User Database is called");
}