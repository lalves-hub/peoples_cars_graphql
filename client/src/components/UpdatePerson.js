import React, { useState } from 'react';
import { UPDATE_PERSON } from '../queries/UpdatePerson';
import { useMutation } from '@apollo/client';
import { Input, Button } from 'antd';

const UpdatePerson = (props) => {
  const { id, firstName, lastName } = props;
  const [formData, setFormData] = useState({
    firstName,
    lastName,
  });
  const [updatePerson] = useMutation(UPDATE_PERSON);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call your API to update the person
    const { firstName, lastName } = formData;
    updatePerson({
      variables: {
        updatePersonId: id,
        firstName,
        lastName,
      },
    });
    props.onButtonClick();
  };

  return (
    <>
      <h2>Edit Person's Info</h2>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <Input
          style={{ width: "400px", marginTop: "10px", marginLeft: "4px" }}
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="lastName">Last Name:</label>
        <Input
          style={{ width: "400px", marginTop: "10px", marginLeft: "4px" }}
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </div>

      <Button
        style={{ margin: "10px" }}
        type="primary"
        onClick={handleSubmit}
      >
        Update Info
      </Button>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </>
  );
};

export default UpdatePerson;
