import React from "react"

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden hover:scale-105 transform ease-in-out cursor-pointer">
      {/* Recipe Image */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-200">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Recipe Content */}
      <div className="p-4 sm:p-5 md:p-6">
        {/* Title */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 hover:text-orange-600 transition-colors duration-300">
          {recipe.title}
        </h2>

        {/* Summary */}
        <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
          {recipe.summary}
        </p>

        {/* View Details Button */}
        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 sm:py-2.5 px-4 rounded-lg transition-all duration-300 hover:scale-105">
          View Recipe
        </button>
      </div>
    </div>
  )
}

export default RecipeCard
