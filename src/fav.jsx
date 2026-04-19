import React from 'react'
import { RiDislikeLine } from "react-icons/ri";
const fav = () => {
    return (
        <div>
            <div>
                <img src={recipe.image} alt={recipe.title} />
                <h2>{recipe.title}</h2>
                <p>{recipe.ingredients}</p>
                <button>< RiDislikeLine /></button>
            </div>
        </div>
    )
}

export default fav