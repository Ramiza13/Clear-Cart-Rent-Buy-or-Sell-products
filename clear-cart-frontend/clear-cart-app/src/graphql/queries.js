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