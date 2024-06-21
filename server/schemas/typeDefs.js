const typeDefs = `
  type Cart {
    _id: ID
    products: [Product]
    addedOn: [String]
    quantity: [Int]
  }

  type Category {
    _id: ID
    name: String
  }

  type ProductOrder {
    product: Product
    quantity: Int
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [ ProductOrder ]
    totalAmount: Float
    status: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    quantity: Int
    category: Category
    tags: [ Tag ]
  }

  type Tag {
    _id: ID
    name: String
    tagGroup: String
  }
`