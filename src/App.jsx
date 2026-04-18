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

  const API_URL = "https://api.api-ninjas.com/v1/recipe";
  const API_KEY = "DMdVb4MLelGInRco0YBV0deoJoaXtP11XfgNOXoq";

  const performFetch = async (term) => {
    const response = await fetch(`${API_URL}?query=${term}`, {
      headers: { "X-Api-Key": API_KEY },
    });
    if (!response.ok) throw new Error("API Error");
    return await response.json();
  };

  const fetchRecipes = async (searchQuery = query) => {
    if (!searchQuery) return;

    setLoading(true);
    setShowRecipes(true);
    setSearchLabel("");

    const normalizedQuery = searchQuery.trim().replace(/,/g, ' ');

    try {
      console.log("IngreChef: Attempting full search for:", normalizedQuery);
      const data = await performFetch(normalizedQuery);

      if (data && data.length > 0) {
        setRecipes(data);
        console.log("IngreChef: Success with full query.");
      } else {
        // Fallback logic: Try searching for just the first word
        const words = normalizedQuery.split(/\s+/);
        const firstIngredient = words[0];

        if (firstIngredient && words.length > 1) {
          console.log("IngreChef: No results for full query. Falling back to:", firstIngredient);
          setSearchLabel(`No direct match for your list. Showing results for "${firstIngredient}" instead.`);

          const fallbackData = await performFetch(firstIngredient);
          setRecipes(fallbackData || []);
        } else {
          setRecipes([]);
        }
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