import React from 'react';
import { Redirect } from 'react-router';

function Logout() {
    localStorage.clear();
    return (
        <Redirect to = '/login' />
    )
}
 
export default Logout

