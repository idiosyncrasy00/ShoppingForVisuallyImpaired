const router = require("express").Router()
const Util = require("../controllers/util.controller")


router.post("/speak", Util.speak)


module.exports = router
