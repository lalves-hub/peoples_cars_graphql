import { gql } from '@apollo/client';

export const GET_CAR = gql`
query ExampleQuery($personWithCarsId: String!) {
    personWithCars(id: $personWithCarsId) {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
        personId
      }
    }
  }
`