const addtocart = require("../SchemaModel/addtocart")
const addproduct = require("../SchemaModel/allProduct")

var mongoose = require('mongoose');


exports.postaddtocart = async (req, res) => {


    console.log(req.body.productId, "addtocart");

    // const productexist = await addtocart.findOne({ userid: req.user_id })
    const productexist = await addtocart.findOneAndUpdate({ userid: req.user_id }, { $push: { productId: req.body.productId } }, {upsert:true} )
    res.status(201).send(productexist);
    console.log("products are added to addtocart");

    // if (!productexist) {
    //     const user = new addtocart({
    //         userid: req.user_id,
    //         productId: req.body.productId
    //     });
    //     user.save().then((doc) => res.status(201).send(user));
    //     console.log("added2");

    // }
    // else if (productexist) {
    //     const user = await addtocart.updateOne(
    //         { userid: req.user_id },
    //         { $push: { productId: req.body.productId } }
    //     )
    //     res.status(201).json(user);
    //     console.log("User cart alrady created");
    //     console.log(req.user_id);
    // }
}


// exports.getfromcart = async (req, res) => {
//     const productinCart = await addtocart.findOne({ userid: req.user_id })
//     if (productinCart) {
//         addproduct.find({ _id: productinCart.productId }).exec(function (err, items) {
//             if (err || !items) { ({ message: "error" }) }
//             else {
//                 res.json({
//                     product: items,
//                     cartId: productinCart._id
//                 })
//                 console.log("cart has been sent");
//             }
//         })
//     } else {
//         console.log("add to cart is empty");
//     }
// }

exports.getfromcart = async (req, res) => {
    const productinCart = await addtocart.findOne({ userid: req.user_id })
    if (productinCart) {
        res.json({
            product: productinCart.productId,
            cartId: productinCart._id
        })
        console.log(productinCart.productId);
        console.log("add to cart product is sent");


    } else {
        res.json({ message: "add to cart is empty" })
        console.log("empty cart is sent");
    }
}

exports.deletefromcart = async (req, res) => {
    var cartId = req.body.cartId
    console.log(cartId, "cart ID");
    const productinCart = await addtocart.findOne({ userid: req.user_id })
    if (cartId) {
        var deletecart = await addtocart.findByIdAndDelete(req.body.cartId)
        res.json({ message: "Cart is cleared" })
        console.log("Cart is cleared");
    }

    else if (productinCart.productId.length == 1) {
        var deletecart = await addtocart.findByIdAndDelete(productinCart._id)
        res.json({ message: "Cart is empty" })
        console.log("Cart is empty");
    }
    else {
        console.log(req.body.productId, "product id");

        const cart = await addtocart.updateOne(
            { userid: req.user_id },
            { $pull: { productId: { $in: req.body.productId } } })
        res.send(cart)
        console.log("product is removed");
    }
}






