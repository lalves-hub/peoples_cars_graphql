import { gql } from '@apollo/client';

export const ADD_CAR = gql`
mutation CreateCar($createCarId: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
    createCar(id: $createCarId, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`