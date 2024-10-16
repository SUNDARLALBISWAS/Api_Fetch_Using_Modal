import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
const Header = () => {
  return (
    <nav>
        <div className='navList'>
            <ul>
                <li><Link to='/Allcoin'>Allcoin</Link></li>
            </ul>
        </div>
    </nav>
  )
}

export default Header