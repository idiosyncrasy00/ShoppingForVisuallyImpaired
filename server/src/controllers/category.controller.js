const { Category, Product } = require("../models")


const getCategory = async (req, res) => {
    let result = await Category.get()
    res.send(result)
}


const listProduct = async (req, res) => {
    if (!req.body.category) {
        res.status(400).send("Invalid request")
    } else {
        let result = await Product.list(req.body.category)
        res.send(result)
    }
}


module.exports = {
    getCategory,
    listProduct
}
