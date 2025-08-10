import { gql } from '@apollo/client';

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser @client {
      id
      username
      email
      fullName
      phone
    }
  }
`;

export const GET_MY_PRODUCTS = gql`
  query MyProducts($ownerId: ID!) {
    myProducts(ownerId: $ownerId) {
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

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    getProductById(id: $id) {
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