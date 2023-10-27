
import { gql } from '@apollo/client';

export const UPDATE_CAR = gql`
mutation Mutation($updateCarId: String!, $year: Int, $make: String, $model: String, $price: Float, $personId: String) {
    updateCar(id: $updateCarId, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`