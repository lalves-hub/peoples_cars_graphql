
import React, { useState } from 'react';
import { ADD_PERSON } from '../queries/AddPerson';
import { GET_PEOPLE } from '../queries/GetPeople'
import { useMutation } from '@apollo/client';
import { Input } from 'antd';
const { v4: uuidv4 } = require('uuid');


const PersonForm = () => {
  const [createPerson] = useMutation(ADD_PERSON);
  const [inputFName, setInputFName] = useState('');
  const [inputLName, setInputLName] = useState('');

  const randomUUID = uuidv4();

  const buttonCall = () => {
    //console.log("here is person added:", inputFName + inputLName + randomUUID)
    createPerson({
      variables: {
        createPersonId: randomUUID,
        firstName: inputFName,
        lastName: inputLName,
      },
      update: (cache, { data: { createPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE })
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [
              ...data.people, createPerson
            ]

          }

        });
      }
    })
  }

  return (
    <>
      <h2>Add Person</h2>
      <div className="form-container">
        <label htmlFor="fname">* First Name: </label>
        <input id="fname"
          placeholder="First Name"
          value={inputFName}
          onChange={(e) => setInputFName(e.target.value)}></input>

        <label htmlFor="lname">* Last Name: </label>
        <input id="lname"
          placeholder="Last Name"
          value={inputLName}
          onChange={(e) => setInputLName(e.target.value)}></input>
        <button onClick={buttonCall}>Add Person</button>
      </div>

    </>
  );
};

export default PersonForm;
