import React from 'react';
import { useParams } from 'react-router-dom';
import Car from '../components/CarList';
import { useNavigate } from 'react-router-dom';


export default function SeeMore() {
  let { personId } = useParams();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <>
      <div className="App">
        <Car id={personId} />
      </div>
      <button className="back-button" onClick={handleGoBack} >Go Back</button>
    </>
  );
}