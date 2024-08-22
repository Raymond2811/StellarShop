const typeDefs = `
  type Cart {
    _id: ID
    product: Product
    purchaseQuantity: [Int]
  }

  type Category {
    _id: ID
    name: String
    products: [Product]
  }

  type ProductOrder {
    product: Product
    purchaseQuantity: Int
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
    description: String
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
    categories: [Category]
    category(_id: ID!): Category
    product(_id: ID!): Product
    products(category: ID, name: String, tag: String): [Product]
    orders: [Order]
    cart: [Cart]
  }

  type Mutation {
    checkout(products: [ProductInput]): Checkout
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    deleteUser(email: String!, password: String!): UserDeleted
    addOrder(products: [ProductInput]!): Order
    updateProduct(_id: ID!, quantity: Int, description: String, price: Float): Product
    login(email: String!, password: String!): Auth
    logout: String
    addToCart(productId: ID!, purchaseQuantity: Int!): [Cart]
    removeFromCart(productId: ID!): [Cart]
    clearCart: [Cart]
  }
`;

module.exports = typeDefs;