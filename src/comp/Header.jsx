import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav>
      <div className='logo'>
        TREEKLE STORE 
      </div>
      <ul>
        <li><Link to="/">Shop</Link></li>
      </ul>
    </nav>
  )
}

export default Header