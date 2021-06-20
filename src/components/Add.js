import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


function Add() {
    const[input, setInput] = useState({
        id:'',
        name:'',
        place:'',
        rating:'',
        email:''
    });
    const history = useHistory();

    const inputsHandler = (e) => {
        setInput( {
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const addItems = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/resto", {
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({...input})
        }).then(result => {
            result.json().then((resp) => {
                alert('Resturent added successfully.');
                history.push('/list');
            })
        })
    }

    return (
        <div>
            <h1>Add Resto</h1>
            <form noValidate onSubmit= { addItems }>
                <table className="add-list">
                    <thead>
                        <tr>
                            <td><input onChange= { inputsHandler } type="text" name="name" placeholder="Enter name"/></td>
                            <td><input onChange= { inputsHandler } type="text" name="place" placeholder="Enter place"/></td>
                            <td><input onChange= { inputsHandler } type="text" name="rating" placeholder="Enter ratings"/></td>
                            <td><input onChange= { inputsHandler } type="text" name="email" placeholder="Enter email"/></td>
                        </tr>
                        <tr>
                            <td colSpan="4" valign="center">
                                <button type="submit">Add Resto</button>
                            </td>
                        </tr>
                    </thead>
                </table>
            </form>
        </div>
    )
}

export default Add
