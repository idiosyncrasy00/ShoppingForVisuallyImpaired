const router = require("express").Router()
const Product = require("../controllers/product.controller")


router.get("/get", Product.getProduct)


module.exports = router
