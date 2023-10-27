import React, { useState, useEffect } from 'react';
import MyDropdown from './Dropdown';
import { UPDATE_CAR } from '../queries/UpdateCar';
import { GET_CAR } from '../queries/GetCar';
import { GET_PEOPLE } from '../queries/GetPeople';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Input, InputNumber } from 'antd';

const UpdateCar = ({ id, personId, year, make, model, price, onButtonClick }) => {
    const [updateCar] = useMutation(UPDATE_CAR);
    const [formData, setFormData] = useState({
        year,
        make,
        model,
        price,
        person: personId,
    });
    const [personnId, setPersonnId] = useState(personId);

    const handleData = (data) => {
        setPersonnId(data);
    };

    const handleInputChange = (fieldName, value) => {
        setFormData({ ...formData, [fieldName]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        updateCar({
            variables: {
                updateCarId: id,
                year: formData.year,
                make: formData.make,
                model: formData.model,
                price: formData.price,
                personId: personnId,
            },
            update: (cache, { data: { updateCar } }) => {
                if (formData.person !== personId) {
                    const data = cache.readQuery({
                        query: GET_CAR,
                        variables: { personWithCarsId: formData.person },
                    });

                    const { personWithCars } = cache.readQuery({
                        query: GET_CAR,
                        variables: { personWithCarsId: personId },
                    });

                    const updatedCars = personWithCars.cars.filter((car) => car.id !== id);

                    cache.writeQuery({
                        query: GET_CAR,
                        variables: { personWithCarsId: personId },
                        data: {
                            personWithCars: {
                                ...personWithCars,
                                cars: updatedCars,
                            },
                        },
                    });

                    cache.writeQuery({
                        query: GET_CAR,
                        variables: { personWithCarsId: formData.person },
                        data: {
                            ...data,
                            personWithCars: {
                                ...data.personWithCars,
                                cars: [...data.personWithCars.cars, updateCar],
                            },
                        },
                    });
                }
            },
        });

        onButtonClick();
    };

    const { loading, error, data } = useQuery(GET_PEOPLE);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <>
            <h2>Edit Car's Info</h2>
            <div>
                <label htmlFor="year">Year:</label>
                <InputNumber
                    style={{ width: "100px", marginTop: "10px", marginLeft: "4px" }}
                    name="year"
                    placeholder="Year i.e 2012"
                    value={formData.year}
                    onChange={(value) => handleInputChange("year", value)}
                />
            </div>

            <div>
                <label htmlFor="make">Make:</label>
                <Input
                    style={{ width: "200px", marginTop: "10px", marginLeft: "5px" }}
                    name="make"
                    placeholder="Make"
                    value={formData.make}
                    onChange={(e) => handleInputChange("make", e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="model">Model:</label>
                <Input
                    style={{ width: "200px", marginTop: "10px", marginLeft: "4px" }}
                    name="model"
                    placeholder="Model"
                    value={formData.model}
                    onChange={(e) => handleInputChange("model", e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="price">Price:</label>
                <InputNumber
                    style={{ width: "100px", marginTop: "10px", marginLeft: "4px" }}
                    name="price"
                    prefix="$"
                    placeholder="i.e 30000"
                    value={formData.price}
                    onChange={(value) => handleInputChange("price", value)}
                />
            </div>

            <div>
                <label htmlFor="person">Person:</label>
                <MyDropdown handleSelectChange={handleData} />
            </div>

            <Button
                style={{ margin: "10px" }}
                type="primary"
                onClick={handleSubmit}
            >
                Update Info
            </Button>
            <Button onClick={onButtonClick}>Cancel</Button>
        </>
    );
};

export default UpdateCar;
