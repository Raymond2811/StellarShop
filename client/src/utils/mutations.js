import { gql } from '@apollo/client';

export const CHECKOUT = gql`
mutation Checkout($products: [ProductInput]) {
  checkout(products: $products) {
    session
  }
}
`;

export const ADD_USER = gql`
mutation AddUser(
  $firstName: String!, 
  $email: String!, 
  $password: String!, 
  $lastName: String!
) {
  addUser(
    firstName: $firstName, 
    email: $email, 
    password: $password, 
    lastName: $lastName
  ) {
    token
    user {
      _id
    }
  }
}
`;

export const UPDATE_USER = gql`
mutation UpdateUser(
  $firstName: String, 
  $lastName: String, 
  $email: String, 
  $password: String
) {
  updateUser(
    firstName: $firstName, 
    lastName: $lastName, 
    email: $email, 
    password: $password
  ) {
    _id
    email
    lastName
    password
    firstName
  }
}
`;

export const DELETE_USER = gql`
mutation DeleteUser(
  $email: String!, 
  $password: String!
) {
  deleteUser(
    email: $email, 
    password: $password
  ) {
    message
    success
  }
}
`;

export const LOGOUT = gql`
mutation Mutation {
  logout
}
`;

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
    }
  }
}
`;

export const ADD_TO_CART = gql`
mutation AddToCart($productId: ID!, $quantity: Int!) {
  addToCart(productId: $productId, quantity: $quantity) {
    _id
    product {
      _id
      name
      price
      image
    }
    quantity
  }
}
`;

export const REMOVE_FROM_CART = gql`
mutation RemoveFromCart($productId: ID!) {
  removeFromCart(productId: $productId) {
    _id
    product {
      _id
      image
      name
      price
    }
    quantity
  }
}
`;

export const CLEAR_CART = gql`
mutation ClearCart {
  clearCart {
    _id
    product {
      _id
    }
  }
}
`;

export const UPDATE_PRODUCT =gql`
mutation UpdateProduct($id: ID!, $quantity: Int) {
  updateProduct(_id: $id, quantity: $quantity) {
    _id
    quantity
  }
}
`;

export const ADD_ORDER = gql`
mutation AddOrder($products: [ProductInput]!) {
  addOrder(products: $products) {
    _id
    products {
      product {
        _id
        image
        name
        price
        description
      }
      purchaseQuantity
    }
    purchaseDate
    status
    totalAmount
  }
}
`;