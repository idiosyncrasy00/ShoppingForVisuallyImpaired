const Joi = require("joi")


const addSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().integer().min(1).required()
})


module.exports = { addSchema }
