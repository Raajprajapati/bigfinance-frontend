import React from 'react';
import '../styles/Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className="heading">
                <h1>Player management system</h1>
            </div>
            <ul>
                <li><NavLink to="/create"> Add a player</NavLink></li>
                <li><NavLink to="/" activeClassName="active"> Players</NavLink></li>
                <li><NavLink to="/search"> Find players </NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar