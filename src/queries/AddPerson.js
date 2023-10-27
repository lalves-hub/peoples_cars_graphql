
import { gql } from '@apollo/client';

export const ADD_PERSON = gql`
mutation Mutation(
    $createPersonId: String!, $firstName: String!, $lastName: String!) {
    createPerson(id: $createPersonId, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`