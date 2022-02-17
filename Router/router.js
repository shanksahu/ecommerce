var express = require('express')
const router = express.Router()
const signup = require("../Controller/signup")
const login = require("../Controller/login")
const upload = require("../multer/multer")
const token = require("../token/tokenverify")

const allproduct = require("../Controller/allProduct")
const viewuser = require("../Controller/viewusers")
const addtocart = require("../Controller/addtocart")

router.get('/', (req, res)=>{
    res.json({message: "Hello world welcome to my website"})
})

router.post("/api/signup", signup.checkDuplicateUsernameOrEmail, signup.postsingup)

router.post("/api/login", login.postlogin)

router.post('/api/addproduct', upload.single('image'), allproduct.postaddproduct)

router.delete('/api/addproduct/:id',  allproduct.deleteaddproduct)

// router.post('/api/addproduct/:id', upload.single('image'), allproduct.editproduct)

router.get('/api/addproduct',  allproduct.getaddproduct)
// router.get('/api/electronicproduct',  allproduct.getelectronicproduct)

router.get('/api/addproduct/:id',  allproduct.getviewproduct)
router.post('/api/addproduct/:id', upload.single('image'), allproduct.editproduct)

router.get('/api/viewusers', viewuser.viewusers)


router.post('/api/addtocart',  token.verifyToken,  addtocart.postaddtocart)
router.get('/api/addtocart', token.verifyToken, addtocart.getfromcart)

router.post('/api/deletefromcart', token.verifyToken, addtocart.deletefromcart)


// router.get('/api/addproduct', token.verifyToken, addproduct.getaddproduct)

module.exports = router 