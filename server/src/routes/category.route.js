const router = require("express").Router()
const Category = require("../controllers/category.controller")


router.get("/get", Category.getCategory)


module.exports = router
