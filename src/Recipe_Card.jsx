import React, { useState, useEffect } from 'react'
import { RiPlayCircleLine } from "react-icons/ri";

const Recipe_Card = ({ recipe }) => {
    const [mealDbData, setMealDbData] = useState(null);
    const [fetchingMealDb, setFetchingMealDb] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const defaultImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

    useEffect(() => {
        const fetchMealDetails = async () => {
            if (!recipe.title) return;
            setFetchingMealDb(true);
            try {
                // If we have an ID from App.jsx, use it for lookup, otherwise search by title
                const queryParam = recipe.id ? `i=${recipe.id}` : `s=${encodeURIComponent(recipe.title)}`;
                const endpoint = recipe.id ? 'lookup.php' : 'search.php';
                
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${endpoint}?${queryParam}`);
                const data = await response.json();
                if (data.meals && data.meals.length > 0) {
                    setMealDbData(data.meals[0]);
                }
            } catch (error) {
                console.error("Error fetching from MealDB:", error);
            } finally {
                setFetchingMealDb(false);
            }
        };

        fetchMealDetails();
    }, [recipe.title, recipe.id]);

    const displayImage = mealDbData?.strMealThumb || recipe.image || defaultImage;
    const youtubeUrl = mealDbData?.strYoutube;

    const getIngredients = () => {
        if (!mealDbData) return [];
        let ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = mealDbData[`strIngredient${i}`];
            const measure = mealDbData[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        return ingredients;
    };

    return (
        <>
            <div className='recipe_Card'>
                <div className="image-wrapper">
                    <img
                        src={displayImage}
                        alt={recipe.title}
                        className='recipe-image'
                        onError={(e) => { e.target.src = defaultImage; }}
                    />
                    {mealDbData?.strCategory && (
                        <span className="category-badge">{mealDbData.strCategory}</span>
                    )}
                </div>
                <div className='recipe-content'>
                    <h3 className='recipe_title'>{recipe.title}</h3>
                    <div className="recipe-info">
                        <p className='time'>⏱ {mealDbData?.strArea || 'Global'}</p>
                        {mealDbData?.strTags && <p className='tags'>🏷 {mealDbData.strTags.split(',')[0]}</p>}
                    </div>
                    
                    <div className="card-button">
                        <button className='view-btn' onClick={() => setShowDetails(true)}>
                            Read Recipe
                        </button>
                        <button className='fav-btn'>❤️</button>
                    </div>
                </div>
            </div>

            {showDetails && mealDbData && (
                <div className="recipe-modal-overlay" onClick={() => setShowDetails(false)}>
                    <div className="recipe-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowDetails(false)}>&times;</button>
                        
                        <div className="modal-header">
                            <img src={displayImage} alt={recipe.title} className="modal-hero-img" />
                            <div className="modal-header-text">
                                <h2>{mealDbData.strMeal}</h2>
                                <p className="modal-meta">
                                    <span>{mealDbData.strCategory}</span> • <span>{mealDbData.strArea}</span>
                                </p>
                            </div>
                        </div>

                        <div className="modal-body">
                            <div className="modal-section">
                                <h3>Ingredients</h3>
                                <ul className="ingredients-list">
                                    {getIngredients().map((ing, idx) => (
                                        <li key={idx}>{ing}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="modal-section">
                                <h3>Instructions</h3>
                                <p className="instructions-text">
                                    {mealDbData.strInstructions}
                                </p>
                            </div>

                            {youtubeUrl && (
                                <div className="modal-section">
                                    <button 
                                        className="watch-video-btn" 
                                        onClick={() => window.open(youtubeUrl, "_blank")}
                                    >
                                        <RiPlayCircleLine size={20} /> Watch Video Tutorial
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Recipe_Card;