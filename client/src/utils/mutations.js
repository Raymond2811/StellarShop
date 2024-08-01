import { gql } from '@apollo/client';

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