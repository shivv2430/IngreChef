import React, { useState } from 'react'
import './index.css'
import logo from './assets/IngreChef logo design.png'
import { RiMenuLine } from "react-icons/ri";
import Recipe_Card from './Recipe_Card';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [showRecipes, setShowRecipes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLabel, setSearchLabel] = useState("");

  const performFetch = async (term) => {
    // TheMealDB works best with single ingredients for filtering
    const ingredient = term.split(/[ ,]+/)[0]; 
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    if (!response.ok) throw new Error("API Error");
    const data = await response.json();
    
    // Map MealDB format to our app format
    return data.meals ? data.meals.map(meal => ({
      title: meal.strMeal,
      image: meal.strMealThumb,
      id: meal.idMeal
    })) : [];
  };

  const fetchRecipes = async (searchQuery = query) => {
    if (!searchQuery) return;

    setLoading(true);
    setShowRecipes(true);
    setSearchLabel("");

    try {
      console.log("IngreChef: Searching MealDB for:", searchQuery);
      const recipesFound = await performFetch(searchQuery);

      if (recipesFound.length > 0) {
        setRecipes(recipesFound);
      } else {
        setRecipes([]);
        setSearchLabel(`No recipes found for "${searchQuery}". Try a different ingredient!`);
      }
    } catch (error) {
      console.error("IngreChef: Error:", error);
      setRecipes([]);
      setSearchLabel("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

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
              placeholder='Add ingredients (e.g. tomato onion cheese)'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchRecipes()}
            />
            <button onClick={() => fetchRecipes()} disabled={loading}>
              {loading ? "Searching..." : "Find Recipes"}
            </button>
          </div>

          <div className="chips-container">
            <span>Popular Categories</span>
            <ul className="chips">
              {['Pasta', 'Curry', 'Dessert', 'Salads', 'Quick Meals'].map((cat) => (
                <li
                  key={cat}
                  onClick={() => { setQuery(cat); fetchRecipes(cat); }}
                  style={{ cursor: 'pointer' }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {showRecipes && (
          <div className="results-wrapper">
            {searchLabel && <p className="search-fallback-label">{searchLabel}</p>}

            <div className="recipes-grid">
              {loading ? (
                <div className="loading-state">
                  <p>Searching for delicious recipes...</p>
                </div>
              ) : recipes.length > 0 ? (
                recipes.map((recipe, index) => (
                  <Recipe_Card key={index} recipe={recipe} />
                ))
              ) : (
                <div className="no-results-state">
                  <p className="no-results">No recipes found for "{query}".</p>
                  <p className="hint">Tip: Try searching for a single main ingredient!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;