import React from 'react';
import PersonForm from '../components/PersonForm';
import CarForm from '../components/CarForm';
import PeopleList from '../components/PeopleList';

export default function Home() {
  return (
    <div className="App">
      <h1>PEOPLE AND THEIR CARS</h1>
      <PersonForm />
      <CarForm />
      <PeopleList />
    </div>
  );
}