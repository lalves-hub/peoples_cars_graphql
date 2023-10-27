import { gql } from '@apollo/client';

export const GET_PEOPLE = gql`
 {
    people {
        id
        firstName
        lastName
      }
    }  
`;
