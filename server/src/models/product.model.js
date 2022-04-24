
module.exports = {
    name: "Product",
    func: (col) => {
        return {
            add_product: async (name, date, description) => {
                await col.collection.insertOne({
                    name, date, description
                })
            },
            get_product: async () => {
                return await col.collection.find().toArray()
            }
        }
    }
}
