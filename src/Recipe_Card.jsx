import React from 'react'

const Recipe_Card = ({ recipe }) => {

    return (
        <div className='recipe_Card'>
            <img src={recipe.image} alt={recipe.title} className='recipe-image' />
            <div className='recipe-content'>
                <h3 className='recipe_title'>{recipe.title}</h3>
                <p className='time'>⏱ {recipe.time}mins</p>
                <p className='recipe_desc'>{recipe.description.slice(0, 80)}...</p>

                <div className="card-button">
                    <button className='view-btn'>View</button>
                    <button className='fav-btn'>❤️</button>
                </div>
            </div>
        </div>
    );
};

export default Recipe_Card;