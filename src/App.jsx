import React from 'react'
import './index.css'
import logo from './assets/IngreChef logo design.png'
import { RiMenuLine } from "react-icons/ri";

const App = () => {
  return (
    <div className="app-container">
      <nav className='Navbar'>
        <div className="logo-container">
          <img src={logo} alt="IngreChef Logo" className='logo' />
          <h2>
            <span style={{ color: 'var(--accent-green)' }}>Ingre</span>
            <span style={{ color: 'var(--accent-orange)' }}>Chef</span>
          </h2>
        </div>
        <RiMenuLine className='menu-icon' size={30} color='var(--primary)' />
      </nav>

      <main className='main'>
        <section className="hero-content">
          <h1 className="title">Cook with what <br /> you have</h1>
          <p className="sub-title">
            Enter your ingredients and discover chef-quality recipes instantly.
            No waste, no stress, just great food.
          </p>

          <div className="search-container">
            <input
              type="text"
              placeholder='Add ingredients (e.g. tomato, onion, cheese)'
            />
            <button>Find Recipes</button>
          </div>

          <div className="chips-container">
            <span>Popular Categories</span>
            <ul className="chips">
              <li>Pasta</li>
              <li>Curry</li>
              <li>Dessert</li>
              <li>Salads</li>
              <li>Quick Meals</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App