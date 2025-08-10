import { gql } from '@apollo/client';

export const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      fullName
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $password: String!
    $email: String!
    $fullName: String!
    $phone: String!
  ) {
    registerUser(
      username: $username
      password: $password
      email: $email
      fullName: $fullName
      phone: $phone
    ) {
      id
      username
      email
      fullName
      phone
    }
  }
`;