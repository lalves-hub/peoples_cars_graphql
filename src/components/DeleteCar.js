import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { DELETE_CAR } from '../queries/DeleteCar'
import { GET_CAR } from '../queries/GetCar'

const DeleteCar = ({ id, personId }) => {
    const [deleteCar] = useMutation(DELETE_CAR)

    const handleButtonClick = () => {
        let result = window.confirm("You are about to delete this car. Would you like to continue?")
        if (result) {
            deleteCar({
                variables: {
                    deleteCarId: id
                },
                update: (cache) => {
                    const { personWithCars } = cache.readQuery({
                        query: GET_CAR,
                        variables: {
                            personWithCarsId: personId
                        }
                    })

                    const updatedCars = personWithCars.cars.filter(car => car.id !== id)

                    cache.writeQuery({
                        query: GET_CAR,
                        variables: {
                            personWithCarsId: personId
                        },
                        data: {
                            personWithCars: {
                                ...personWithCars,
                                cars: updatedCars
                            }
                        }
                    })
                }
            })
        }
    }

    return (
        <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }} />
    )
}

export default DeleteCar