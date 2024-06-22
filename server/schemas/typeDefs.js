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

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    orders: [ Order ]
    cart: [ Cart ]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input ProductInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }

  type Query {
    user: User
    category: [Category]
    product(_id: ID!): Product
    products(category: ID, name: String, tag: String): [Product]
    order(_id: ID!): Order
    orders: [Order]
    cart(_id: ID!): Cart
    checkout(products: [ProductInput]): Checkout
  }
`;

module.exports = typeDefs;