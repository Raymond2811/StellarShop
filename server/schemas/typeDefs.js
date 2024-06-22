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

  type UserDeleted {
    success: Boolean
    message: String
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

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    deleteUser(email: String!, password: String!): UserDeleted
    addOrder(products: [ID]!): Order
    updateProduct(_id: ID!, quantity: Int, description: String, price: Float): Product
    login(email: String!, password: String!): Auth
    logout: String
    addToCart(product: ID!, quantity: Int): Cart
    removeFromCart(product: ID!): Cart
    clearCart: Cart
  }
`;

module.exports = typeDefs;