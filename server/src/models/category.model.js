
module.exports = {
    name: "Category",
    func: (col) => {
        return {
            _init: async () => {
                await col.collection.createIndex({ category: 1 }, { unique: true })
            },
            add: async (category) => {
                await col.collection.updateOne({
                    category: category
                }, {
                    $setOnInsert: {
                        category: category
                    }
                }, {
                    upsert: true
                })
            },
            get: async () => {
                let result = await col.collection.find().toArray()
                return result
            }
        }
    }
}
