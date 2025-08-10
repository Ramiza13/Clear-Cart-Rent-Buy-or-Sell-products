import { gql } from '@apollo/client';

export const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      fullName
      phone
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

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $description: String
    $categories: [String!]!
    $price: Float!
    $availableForRent: Boolean!
    $availableForSale: Boolean!
    $ownerId: ID!
  ) {
    addProduct(
      name: $name
      description: $description
      categories: $categories
      price: $price
      availableForRent: $availableForRent
      availableForSale: $availableForSale
      ownerId: $ownerId
    ) {
      id
      name
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String
    $description: String
    $categories: [String!]
    $price: Float
    $availableForRent: Boolean
    $availableForSale: Boolean
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      categories: $categories
      price: $price
      availableForRent: $availableForRent
      availableForSale: $availableForSale
    ) {
      id
      name
      description
      categories
      price
      availableForRent
      availableForSale
    }
  }
`;