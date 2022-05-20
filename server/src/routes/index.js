const router = require("express").Router()


router.use("/products", require("./product.route"))
router.use("/category", require("./category.route"))
router.use("/util", require("./util.route"))


module.exports = router
