import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get exclusive offers on your email</h1>
        <p>Subscribe to our newsletter</p>
        <div>
            <input type='email' placeholder='yourmailaddress@gmail.com'/>
            <button>Subscribe</button>
        </div>

    </div>
  )
}
export default NewsLetter;
