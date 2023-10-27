import React from 'react';
import PersonCard from './PersonCard';
import { useQuery } from '@apollo/client';
import { GET_PEOPLE } from '../queries/GetPeople';

const PeopleList = ({ people, handleEdit, handleDelete }) => {

    const { loading, error, data } = useQuery(GET_PEOPLE);
    if (loading) return 'Loading...';
    if (error) console.log(error);
    const peoples = data;
    //console.log("here", data)

    return (
        <div className="people-list">
            <h2>Records</h2>{peoples.people.map((person) => (
                <PersonCard
                    key={person.id}
                    person={person}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default PeopleList;
