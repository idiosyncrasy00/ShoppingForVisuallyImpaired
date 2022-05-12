const { Category } = require("../models")


const getCategory = async (req, res) => {
    let result = await Category.get()
    res.send(result)
}


module.exports = {
    getCategory
}
