import React from 'react'
import { NavLink, Route, Switch } from "react-router-dom";
import Add from './Add';
import Home from './Home';
import List from './List';
import Search from './Search';
import Update from './Update';
import Pagenotfound from './Pagenotfound'
import Login from './Login';
import Logout from './Logout';
import Protected from './Protected';

function Header() {
    return (
      <div className="header">
            <ul>
                <li><NavLink exact to ='/'activeClassName="active">Home</NavLink></li>
                <li><NavLink to ='/list'activeClassName="active">Resto List</NavLink></li>
                <li><NavLink to ='/add'activeClassName="active">Add Resto</NavLink></li>
                <li>{ localStorage.getItem('login') ? <NavLink to ='/logout'activeClassName="active">Logout</NavLink> : <NavLink to ='/login'activeClassName="active">Login</NavLink> }</li>
            </ul>
            <Switch>
                <Protected exact path='/' component= { Home }/>
                <Protected path='/list' component= { List }/>
                <Protected path='/add' component= { Add }/>
                <Protected path='/logout' component= { Logout }/>
                <Route path='/login' render = { props => (<Login {...props} />)}></Route>
                <Route path='/update/:id' render={ props =>(<Update {...props}/>)}></Route>
                <Route path='*'><Pagenotfound/></Route>
            </Switch>
      </div>
    )
}

export default Header
