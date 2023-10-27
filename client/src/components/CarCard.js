import { EditOutlined } from "@ant-design/icons"; import React from 'react';
import { useState } from 'react';
import UpdateCar from './UpdateCar';
import DeleteCar from './DeleteCar';



const CarCard = ({ createCarId, year, make, model, price, personId, onEdit, onDelete }) => {
    const onButtonClickEdit = () => {
        setEdit(!edit)
    }
    const onButtonClickDel = () => {
        setDel(!del)
    }

    const [edit, setEdit] = useState(false);
    const [del, setDel] = useState(false);
    const priceEdit = price.toLocaleString();
    const priceSymbol = "-> $"
    return (
        <>
            {edit ? <UpdateCar id={createCarId} personId={personId} year={year} make={make} model={model} price={price} onButtonClick={onButtonClickEdit} /> :
                <div className="car-card">
                    <div className="car-info">
                        <h4>{year} {make} {model} {priceSymbol} {priceEdit}</h4>
                    </div>
                    <EditOutlined style={{ marginRight: "350px", marginTop: "10px" }} key="edit" onClick={onButtonClickEdit} />
                    <DeleteCar id={createCarId} personId={personId} onButtonClick={onButtonClickDel} />
                </div>

            }
        </>
    );
};

export default CarCard;
