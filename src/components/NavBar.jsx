import React from 'react'
import { Link } from 'react-router-dom'
import "../css/home.css"
function NavBar() {
  return (
    <div>
        <div className='menu'>
            <h1 className='logo'>liveshoper</h1>
            <ul>
                <Link to="/home" className='link'><li><pre>Home</pre></li></Link>
                <Link to="/orders" className='link'><li><pre>Orders</pre></li></Link>
                <Link to="/rejectedOrders" className='link'><li><pre>Rejected Orders</pre></li></Link>
                <Link to="/earnings" className='link'><li><pre>Earnings</pre></li></Link>
                <Link to="/profile" className='link'><li><pre>Profile</pre></li></Link>

            </ul>
        </div>
    </div>
  )
}

export default NavBar