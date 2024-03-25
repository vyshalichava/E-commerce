import React from 'react'
import './Navbar.css'  
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'

export const Navbar = () => {
  return (
    <div classname ='navbar' >
        <div className="nav-logo">
            <img src = {logo} alt = ''/>
            <p>Shopper</p>
        </div>
        <ul className="nav-menu"></ul>
        <li>Shop</li>
        <li>Men</li>
        <li>Women</li>
        <li>Kids</li>
        <div className="nav-login-cart">
            <button>Login</button>
            <img src = {cart_icon} alt = ''/>
        </div>

    </div>
  )
}
