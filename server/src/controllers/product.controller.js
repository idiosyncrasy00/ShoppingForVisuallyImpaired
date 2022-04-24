const Product = require("../models/").Product


const getProduct = async (req, res) => {
    const products = await Product.get_product()
    res.send(products)
}


module.exports = { getProduct }
