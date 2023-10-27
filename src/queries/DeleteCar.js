import { gql } from '@apollo/client';

export const DELETE_CAR = gql`
mutation DeleteCar($deleteCarId: String!) {
  deleteCar(id: $deleteCarId) {
    id
    year
    make
    model
    price
    personId
  }
}
`