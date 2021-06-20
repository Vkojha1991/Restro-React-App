import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
    const[input, setInput] = useState({
        username:'',
        password:''
    });
    const history = useHistory();
    
    const inputsHandler = (e) => {
        setInput( {
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const loginForm = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/login?q="+input.username)
        .then(resp => resp.json())
        .then(data => {
            if(data.length > 0) {
                localStorage.setItem('login', JSON.stringify(data));
                history.push('/list');
            } else {
                alert('Invalid username and password');
            }
        });
    }

    return (
       <div className="login">
           <h1>Login</h1>
           <form noValidate onSubmit={ loginForm }>
                <table className="add-list">
                    <thead>
                        <tr>
                            <td><input onChange= { inputsHandler } type="text" name="username" placeholder="Username"/></td>
                            <td><input onChange= { inputsHandler } type="password" name="password" placeholder="Password"/></td>
                        </tr>
                        <tr>
                            <td colSpan="2" valign="center">
                                <button type="submit">Login</button>
                            </td>
                        </tr>
                    </thead>
                </table>
           </form>
       </div> 
    )
}

export default Login

