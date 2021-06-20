import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Search() {
    const[search, setSearch] = useState('');

    const searchItems = (keys) => {
        fetch("http://localhost:3000/resto?q="+keys)
        .then(resp => resp.json())
        .then(data => {
            if(data.length > 0) {
                setSearch(data);
                console.log(search);
            } else {
                console.log('No search found');
            }
        }); 
    }

    const deleteItem = (id) => {
        fetch("http://localhost:3000/resto/"+id, {
            method: 'DELETE',
        })
        .then(result => {
            result.json().then((resp) => {
                alert('Resturent deleted successfully.');
            })
        }) 
    }

    return (
        <div>
        <h2>Search Resto</h2>
            <input name="search"type ="text" onChange ={(e) => searchItems(e.target.value) } placeholder="Search resto..." className="search-resto" />
            <div className="search-response">
                {
                    search ? <div>
                                <table>
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
                                            search?.map((items, i) =>
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
                                </table>
                    </div> : 'No seach data'
                }
            </div>
        </div>
        
    )
}

export default Search