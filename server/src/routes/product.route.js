const router = require("express").Router()
const Product = require("../controllers/product.controller")


router.get("/get", Product.getProduct)
router.post("/add", Product.addProduct)
router.post("/query", Product.queryProduct)
router.post("/buy", Product.buyProduct)


module.exports = router
