const addproduct = require("../SchemaModel/allProduct")
const fs = require("fs")
const path = require("path")





exports.postaddproduct = (req, res, next) => {

    console.log(
        req.file.filename
    );
    var obj = {

        productname: req.body.productname,

        cat: req.body.cat,

        modelno: req.body.modelno,

        color: req.body.color,

        price: req.body.price,

        description: req.body.description,

        image: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png',
            filename: req.file.filename
        }
    }
    addproduct.create(obj, (err, item) => {
        if (err) {
            console.log(err);
            res.json("got an error")
        }
        else {
            item.save();
            res.json({ message: "Product Added successfully" })
        }
    });
}

exports.getaddproduct = (req, res) => {
    addproduct.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {

            res.json(items)
            console.log("all product sent");

        }
    })
}

exports.getviewproduct = (req, res) => {
    addproduct.findById(req.params.id, (err, item) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {

            res.json(item)
            console.log("single product is sent");

        }
    })
}

exports.editproduct = (req, res) => {
    addproduct.findByIdAndUpdate(req.params.id, (err, item) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {

            res.json({Message: "Product is updated"})
            console.log("single product is sent");

        }
    })
}

exports.getelectronicproduct = (req, res) => {
    addproduct.find({ cat: "Eclectronics" }, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {

            res.json(items)
            console.log("all product sent");

        }
    })
}


exports.editproduct = async (req, res) => {
    console.log(req.params.id);
    const edited = await addproduct.updateOne(
        { _id: req.params.id },
        {
            productname: req.body.productname,

            productname: req.body.productname,

            cat: req.body.productname,

            modelno: req.body.productname,

            color: req.body.productname,

            price: req.body.productname,

            description: req.body.productname,

            image: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png',
                filename: req.file.filename
            }
        })

    res.send(edited)
    console.log("product edited successfully");

}

exports.deleteaddproduct = async (req, res)=>{
    try {
        console.log(req.params.id, "product id");
        const deleteProduct = await addproduct.findByIdAndDelete(req.params.id)
        res.json({message:"Product is deleted Successfully"}) 
        console.log("Product is deleted Successfully");    
    } catch (error) {
        res.json({error:error})
        console.log("error");
    }
}