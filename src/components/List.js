import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function List() {
    const [data, setData] = useState();

    const getData = () => {
        fetch("http://localhost:3000/resto")
        .then(resp => resp.json())
        .then(data => {
            if(data.length > 0) {
                    setData(data);
            }
        });
    }

    useEffect(() => {
        getData()
    },[data]);

    const deleteItem = (id) => {
        fetch("http://localhost:3000/resto/"+id, {
            method: 'DELETE',
        })
        .then(result => {
            result.json().then((resp) => {
                alert('Resturent deleted successfully.');
                getData();
            })
        }) 
    }

    return (
        <div>
        <h1>Listed Resto</h1>
        { (data?.length) ? <table>
            <thead>
                <tr>
                    <th>SN.</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Rating</th>
                    <th>Email</th>
                    <th>Operations</th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.map((items, i) =>
                    <tr key = {i}>
                        <td>{items.id}</td>
                        <td>{items.name}</td> 
                        <td>{items.place}</td>
                        <td>{items.rating}</td>
                        <td>{items.email}</td>
                        <td><Link to={'/update/'+items.id} >Edit</Link> / <Link onClick={()=> deleteItem(items.id) }> Delete</Link></td>
                    </tr>   
                )}
            </tbody>
        </table> : 'No data found' }
        
        </div>
    )
}

export default List
