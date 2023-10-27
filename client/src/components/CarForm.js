// CarForm.js
import React, { useState } from 'react';
import MyDropdown from './Dropdown';
import { ADD_CAR } from '../queries/AddCar';
import { GET_CAR } from '../queries/GetCar'
import { GET_PEOPLE } from '../queries/GetPeople';
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client';
const { v4: uuidv4 } = require('uuid');

const CarForm = () => {
  const [createCar] = useMutation(ADD_CAR);
  const [inputYear, setInputYear] = useState('');
  const [inputMake, setInputMake] = useState('');
  const [inputModel, setInputModel] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const randomUUID = uuidv4();
  const [id, setId] = useState("");
  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return 'Loading...';
  if (error) console.log(error);



  const handleData = (data) => {
    setId(data);
  }

  const buttomCall = () => {
    //console.log("yoyo");


    console.log("here is the car added:" + typeof (Number(inputYear)))
    createCar({
      variables: {
        createCarId: randomUUID,
        year: Number(inputYear),
        make: inputMake,
        model: inputModel,
        price: Number(inputPrice),
        personId: id,
      },
      update: (cache, { data: { createCar } }) => {
        const data = cache.readQuery({
          query: GET_CAR,
          variables: { personWithCarsId: id }
        })

        console.log(data);


        cache.writeQuery({
          query: GET_CAR, variables: {
            personWithCarsId: id
          },

          data: {
            ...data,
            personWithCars: {
              ...data.personWithCars,
              cars: [
                ...data.personWithCars.cars,
                createCar
              ]
            }
          }

        });
      }
    })
  }


  return (
    <>
      {data.people.length != 0 &&
        <>
          <h2>Add Car</h2>
          <div>
            <label htmlFor="year">* Year: </label>
            <input required id="year" placeholder="Year" value={inputYear} type="number"
              onChange={(e) => setInputYear(e.target.value)}></input>

            <label htmlFor="make">* Make: </label>
            <input required id="make" placeholder="Make" value={inputMake}
              onChange={(e) => setInputMake(e.target.value)}></input>

            <label htmlFor="model">* Model: </label>
            <input required id="model" placeholder="Model" value={inputModel}
              onChange={(e) => setInputModel(e.target.value)}></input>

            <label htmlFor="price">* Price: </label>
            <input required id="price" type="text" prefix="$" placeholder='i.e 45000' value={inputPrice}
              onChange={(e) => setInputPrice(e.target.value)}></input>

            <MyDropdown handleSelectChange={handleData} />

            <button onClick={buttomCall}>Add Car</button>
          </div>
        </>
      }

    </>
  );
};

export default CarForm;