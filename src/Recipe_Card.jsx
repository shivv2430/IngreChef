import React from 'react'

const Recipe_Card = ({ recipe }) => {
    // API Ninjas typically returns: title, ingredients, servings, instructions
    // This component handles those fields while providing fallbacks for missing image/time data.

    const defaultImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

    return (
        <div className='recipe_Card'>
            <img
                src={recipe.image || defaultImage}
                alt={recipe.title}
                className='recipe-image'
                onError={(e) => { e.target.src = defaultImage; }}
            />
            <div className='recipe-content'>
                <h3 className='recipe_title'>{recipe.title}</h3>
                <div className="recipe-info">
                    <p className='time'>⏱ {recipe.servings ? `${recipe.servings} Servings` : 'Quick Prep'}</p>
                </div>
                <p className='recipe_desc'>
                    {recipe.ingredients ? recipe.ingredients.slice(0, 80) : (recipe.instructions ? recipe.instructions.slice(0, 80) : "No description available")}...
                </p>

                <div className="card-button">
                    <button className='view-btn'>Read Recipe</button>
                    <button className='fav-btn'>❤️</button>
                </div>
            </div>
        </div>
    );
};

export default Recipe_Card;