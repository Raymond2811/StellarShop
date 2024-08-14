import { gql } from '@apollo/client';

export const QUERY_ORDERS = gql`
  query Orders {
    orders {
      _id
      products {
        product {
          _id
          name
          image
          description
          price
        }
        purchaseQuantity
      }
      purchaseDate
      status
      totalAmount
    }
  }
`;

export const QUERY_CART = gql`
query Cart {
  cart {
    _id
    product {
      _id
      name
      price
      image
    }
    purchaseQuantity
  }
}
`;

export const QUERY_PRODUCT = gql`
query Product($id: ID!) {
  product(_id: $id) {
    _id
    description
    image
    name
    price
    quantity
  }
}
`;

export const QUERY_CATEGORIES = gql`
query Categories {
  categories {
    name
    _id
  }
}
`;

export const QUERY_CATEGORY = gql`
query Category($id: ID!) {
  category(_id: $id) {
    _id
    name
    products {
      _id
      description
      image
      name
      price
      quantity
    }
  }
}
`;

export const QUERY_USER = gql`
query User {
  user {
    _id
    email
    firstName
    lastName
  }
}
`;

export const QUERY_PRODUCTS = gql`
query Products($category: ID, $name: String, $tag: String) {
  products(category: $category, name: $name, tag: $tag) {
    _id
    name
    quantity
    description
    price
    image
  }
}
`;