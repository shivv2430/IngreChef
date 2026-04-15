import React from 'react'
import './index.css'
import logo from './assets/IngreChef logo design.png'

const App = () => {
  return (
    <div>
      <div className='Navbar'>
        <img src={logo} alt="logo" className='logo' />
        <h2 >IngreChef</h2>

      </div>
    </div>
  )
}

export default App