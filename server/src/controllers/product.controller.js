const { Product, Category } = require("../models/")
const validation = require("../validations/product.validation")


var lastquerry = []
var selectedProduct = null


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
        lastquerry = result
        res.send(result)
    }
}


const selectProduct = async (req, res) => {
    if (!req.body.index) {
        res.status(400).send("Request invalid")
    } else {
        let index = parseInt(req.body.index, 10)
        if (index > lastquerry.length) {
            res.status(400).send("Invalid product")
        } else {
            selectedProduct = lastquerry[index - 1]
            res.send(selectedProduct)
        }
    }
}


const buyProduct = async (req, res) => {
    if (!selectedProduct) {
        res.status(400).send("No product selected yet")
    } else {
        res.send(selectedProduct)
        // Buy
    }
}


module.exports = {
    getProduct,
    addProduct,
    queryProduct,
    selectProduct,
    buyProduct
}
