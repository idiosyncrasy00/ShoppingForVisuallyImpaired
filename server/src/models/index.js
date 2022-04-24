const MongoClient = require("mongodb").MongoClient
require("dotenv").config()

const DB_ENDPOINT = process.env.DB_ENDPOINT
const db = {}
db.collections = {}


function _init(db_module) {
    db.collections[db_module.name] = {}
    return db_module.func(db.collections[db_module.name])
}

db.connect_db = async () => {   // Must be called first
    console.log("Connecting to database ...")
    db.client = new MongoClient(DB_ENDPOINT)
    try {
        await db.client.connect()
        console.log("Database connected")
        db.db = db.client.db("mydb")
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
    // Init db
    for (var col_name in db.collections) {
        db.collections[col_name].collection = db.db.collection(col_name)
        console.log(`Set collection: ${col_name}`)
    }
}

// Set collection

db.Product = _init(require("./product.model"))


module.exports = db
