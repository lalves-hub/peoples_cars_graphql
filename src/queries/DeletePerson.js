
import { gql } from '@apollo/client';

export const DELETE_PERSON = gql`
mutation Mutation($deletePersonId: String!) {
    deletePerson(id: $deletePersonId) {
      id
      firstName
      lastName
    }
  }
`