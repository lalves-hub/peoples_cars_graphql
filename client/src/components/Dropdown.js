import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PEOPLE } from '../queries/GetPeople';

function MyDropdown({ handleSelectChange }) {
  const [selectedOption, setSelectedOption] = useState('');
  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return 'Loading...';
  if (error) console.log(error);
  const people = data;
  //console.log("here", data)


  const handleSelectChanged = (event) => {
    const newSelectedOption = event.target.value;
    setSelectedOption(newSelectedOption);
    handleSelectChange(newSelectedOption);
  };

  return (
    <select style={{ borderWidth: "2px", borderColor: "rgba(175, 170, 170, 0.185)", padding: "8px", marginRight: "10px", marginLeft: "10px", marginTop: "10px", borderRadius: "8px" }} placeholder="Select a person " value={selectedOption} onChange={handleSelectChanged}>
      <option>Select a Person</option>
      {data.people.map((person) => (
        <option key={person.id} value={person.id}>
          {person.firstName} {person.lastName}
        </option>
      ))}
    </select>

  );
}

export default MyDropdown;
