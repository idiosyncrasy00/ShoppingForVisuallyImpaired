const { Product, Category } = require("../models/")
const validation = require("../validations/product.validation")


const getProduct = async (req, res) => {
    const products = await Product.get()
    res.send(products)
}


const addProduct = async (req, res) => {
    const {error, value} = await validation.addSchema.validate(req.body)
    if (error) {
        res.status(400).send(error.message)
    } else {
        try {
            await Product.add(value.name, value.category, value.description, value.price)
            await Category.add(value.category)
            res.send("OK")
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}


const queryProduct = async (req, res) => {
    if (!req.body.query) {
        res.status(400).send("Request invalid")
    } else {
        let result = await Product.find(req.body.query)
        if (result.length == 0) {
            result = await Product.find_word(req.body.query)
        }
        res.send(result)
    }
}


const buyProduct = async (req, res) => {
    console.log("Product bought:")
    console.log(req.body)
    res.send(req.body)
}


module.exports = {
    getProduct,
    addProduct,
    queryProduct,
    buyProduct
}
