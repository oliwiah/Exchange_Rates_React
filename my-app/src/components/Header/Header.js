import React from 'react';
import './Header.css';
import Clock from 'react-live-clock';
import Time from 'react-time';
import {
    NavLink
} from 'react-router-dom';

const Links = () => {
    return (
        <nav className="navbar">
            <NavLink exact className="navbar" activeClassName="active" to="/">Current rates</NavLink>
            <NavLink replace to="/search" className="navbar">Search</NavLink>
        </nav>
    );
}

const MyData = () => {
    let now = new Date();
    return (
        <p>
            <Time value={now} format="YYYY/MM/DD" />
        </p>
    );
}

const Header = () => (
    <div className="header navbar fade-in-animation">
        <p className="title">Exchange Rate</p>
            <Links />
        <div className="data">
            <MyData />
            <Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/Berlin'} />
        </div>
    </div>
)



export default Header;