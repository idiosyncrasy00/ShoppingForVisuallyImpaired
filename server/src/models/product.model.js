
module.exports = {
    name: "Product",
    func: (col) => {
        return {
            add: async (name, category, description, price) => {
                await col.collection.insertOne({
                    name: name,
                    category: category,
                    description: description,
                    price: price,
                    date: new Date(),
                    voiceline: `tên sản phẩm. ${name}. danh mục. ${category}. giá sản phẩm. ${price} đồng. chi tiết. ${description}.`
                })
            },
            get: async () => {
                return await col.collection.find().toArray()
            },
            list: async (category) => {
                let result = await col.collection.find({
                    category: category
                }).toArray()
                return result
            },
            find: async (query) => {
                let result = await col.collection.find({
                    name: {
                        $regex: new RegExp(query, 'i')
                    }
                }).toArray()
                return result
            },
            find_word: async (query) => {
                let result = await col.collection.find({
                    name: {
                        $regex: new RegExp(query.replace(/ /g, "|"), 'i')
                    }
                }).toArray()
                return result
            }
        }
    }
}
