import React, { useState } from 'react'
import './index.css'
import logo from './assets/IngreChef logo design.png'
import { RiMenuLine } from "react-icons/ri";
import Recipe_Card from './Recipe_Card';

const App = () => {
  const [showRecipes, setShowRecipes] = useState(false);

  const recipes = [
    {
      id: 1,
      title: "Creamy Tomato Pasta",
      time: 20,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "A delicious and quick creamy tomato pasta made with fresh ingredients and a hint of basil."
    },
    {
      id: 2,
      title: "Spicy Chicken Curry",
      time: 45,
      image: "https://images.unsplash.com/photo-1603894584373-5ac129b2474c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "An authentic spicy chicken curry that packs a punch of flavor with traditional spices."
    },
    {
      id: 3,
      title: "Fresh Avocado Salad",
      time: 15,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "A light and refreshing avocado salad perfect for a quick healthy lunch or side dish."
    }
  ];

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
            <button onClick={() => setShowRecipes(true)}>Find Recipes</button>
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

        {showRecipes && (
          <div className="recipes-grid">
            {recipes.map(recipe => (
              <Recipe_Card key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </main>

    </div>
  )
}

export default App