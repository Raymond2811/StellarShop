import { gql } from '@apollo/client';

export const ORDERS = gql`
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

export const CART = gql`
query Cart {
  cart {
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