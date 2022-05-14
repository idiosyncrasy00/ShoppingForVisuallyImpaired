const router = require("express").Router()


router.use("/products", require("./product.route"))
router.use("/category", require("./category.route"))


module.exports = router
