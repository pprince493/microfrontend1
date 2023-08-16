import React, { Component } from 'react';
import nagarro_img from '../../assets/nagarro_img.png';
import '../Header/Header.css';

function Header() {
    return ( 
        
        <header className="header-container1 bordertopbottomheader">
                    <img src={nagarro_img} className='header_img1' alt="" />
        </header>
        
     );
}

export default Header;