import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";


function Update(props) {
    const[input, setInput] = useState({
        id:'',
        name:'',
        place:'',
        rating:'',
        email:''
    });
    const history = useHistory();

    useEffect(() => {
        fetch("http://localhost:3000/resto/"+ props.match.params.id)
        .then(resp => resp.json())
        .then(data => setInput({
            id: data.id,
            name: data.name,
            place: data.place,
            rating: data.rating,
            email: data.email
        }));
    },[])

    const inputsHandler = (e) => {
        setInput( {
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const UpdateItems = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/resto/"+ props.match.params.id, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({...input})
        }).then(result => {
            result.json().then((resp) => {
                alert('Resturent updated successfully.');
                setInput({
                    id:'',
                    name:'',
                    place:'',
                    rating:'',
                    email:''
                });
                history.push('/list');
            })
        })
    }

    return (
        <div>
        { console.log(input.id)}
        <h1>Update Resto</h1>
        <form noValidate onSubmit= { UpdateItems }>
                <table className="add-list">
                    <thead>
                        <tr>
                            <td><input value = { input.id } onChange= { inputsHandler } type="text" name="id" placeholder="Enter id" readOnly/></td>
                            <td><input value = { input.name } onChange= { inputsHandler } type="text" name="name" placeholder="Enter name"/></td>
                            <td><input value = { input.place } onChange= { inputsHandler } type="text" name="place" placeholder="Enter place"/></td>
                            <td><input value = { input.rating } onChange= { inputsHandler } type="text" name="rating" placeholder="Enter ratings"/></td>
                            <td><input value = { input.email } onChange= { inputsHandler } type="text" name="email" placeholder="Enter email"/></td>
                        </tr>
                        <tr>
                            <td colSpan="5" valign="center">
                                <button type="submit">Update Resto</button>
                            </td>
                        </tr>
                    </thead>
                </table>
            </form>
        </div>
    )
}

export default Update
