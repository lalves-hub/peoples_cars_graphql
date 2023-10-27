
import { gql } from '@apollo/client';

export const UPDATE_PERSON = gql`
mutation Mutation($updatePersonId: String!, $firstName: String, $lastName: String) {
  updatePerson(id: $updatePersonId, firstName: $firstName, lastName: $lastName) {
    id
    firstName
    lastName
  }
}
`