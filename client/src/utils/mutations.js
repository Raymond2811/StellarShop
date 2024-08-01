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