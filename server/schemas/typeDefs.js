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
`