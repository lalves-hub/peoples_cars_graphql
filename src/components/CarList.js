import { GET_CAR } from '../queries/GetCar';
import { useQuery } from '@apollo/client';
import CarCard from './CarCard'


const Car = ({ id }) => {
    console.log(id);

    const { loading, error, data } = useQuery(GET_CAR, {
        variables: {
            personWithCarsId: id
        }
    });
    if (loading) return 'Loading...';
    if (error) console.log(error);


    const cars = data;
    console.log(cars)


    return (
        <div>
            {data.personWithCars.cars.map((car) => (
                <CarCard
                    key={car.id}
                    createCarId={car.id}
                    year={car.year}
                    make={car.make}
                    model={car.model}
                    price={car.price}
                    personId={car.personId}
                />
            ))}
        </div>
    )

}

export default Car