
const db = require("./index");

const Product = db.Product;


(async () => {
    await db.connect_db()

    // console.log("Add")
    // await Product.add("Mango in a tree", "Tree", "This is a tree")

    // console.log("Get")
    // console.log(await Product.get())

    // console.log("List")
    // console.log(await Product.list("Tree"))

    console.log(await Product.find("mangok"))
})();
