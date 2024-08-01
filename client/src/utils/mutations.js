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