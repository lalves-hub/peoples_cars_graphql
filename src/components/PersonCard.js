import React from 'react';
import Car from './CarList';
import { useState } from 'react';
import UpdatePerson from './UpdatePerson';
import DeletePerson from './DeletePerson'
import { EditOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom'

const PersonCard = ({ person, onEdit, onDelete }) => {
  //console.log("eu tenho acesso: ", person.id)
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);

  const onButtonClickEdit = () => {
    setEdit(!edit)
  }
  const onButtonClickDel = () => {
    setDel(!del)
  }
  return (
    <>
      <div className="person-card">
        {edit ? <UpdatePerson id={person.id} firstName={person.firstName} lastName={person.lastName} onButtonClick={onButtonClickEdit} /> :
          <div>
            <h3>{person.firstName} {person.lastName}</h3>
            <Car id={person.id} />
            <div className="link-card">
              <Link to={`/SeeMore/${person.id}`} >Learn More</Link>
            </div>
            <EditOutlined style={{ marginRight: "370px", marginTop: "10px" }} key="edit" onClick={onButtonClickEdit} />
            <DeletePerson id={person.id} onButtonClick={onButtonClickDel} />


          </div>
        }
      </div>
    </>


  );
};

export default PersonCard;
