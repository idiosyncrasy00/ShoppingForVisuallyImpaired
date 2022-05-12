const MongoClient = require("mongodb").MongoClient
const path = require("path")

require("dotenv").config({
    path: path.resolve(__dirname, "../../.env")     // For development
})

const DB_ENDPOINT = process.env.DB_ENDPOINT
const DB_NAME = "shopping"
const db = {}
db.collections = {}
db.modules = {}


function _init(db_module) {
    db.collections[db_module.name] = {}
    let modules = db_module.func(db.collections[db_module.name])
    db.modules[db_module.name] = modules
    return modules
}

db.connect_db = async () => {   // Must be called first
    console.log("Connecting to database ...")
    db.client = new MongoClient(DB_ENDPOINT)
    try {
        await db.client.connect()
        console.log("Database connected")
        db.db = db.client.db(DB_NAME)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
    // Init db
    for (var col_name in db.collections) {
        console.log(`Set collection: ${col_name}`)
        db.collections[col_name].collection = db.db.collection(col_name)
    }
    for (var col_name in db.modules) {
        if (db.modules[col_name]._init) {
            await db.modules[col_name]._init()
        }
    }
}

// Set collection

db.Product = _init(require("./product.model"))
db.Category = _init(require("./category.model"))


module.exports = db
