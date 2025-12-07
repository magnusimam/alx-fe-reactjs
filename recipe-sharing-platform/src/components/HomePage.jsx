import React, { useState, useEffect } from "react"
import RecipeCard from "./RecipeCard"

const HomePage = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true)
        const response = await fetch("/src/data.json")
        if (!response.ok) throw new Error("Failed to load recipes")
        const data = await response.json()
        setRecipes(data)
        setError("")
      } catch (err) {
        setError(err.message || "Error loading recipes")
        setRecipes([])
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header with hover shadow effect */}
      <div className="max-w-6xl mx-auto mb-12 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 hover:text-orange-600 transition-colors duration-300">
          Recipe Sharing Platform
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg hover:text-gray-700 transition-colors duration-300">
          Discover delicious recipes from around the world. Share your culinary creations with our community.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center bg-white p-8 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading recipes...</p>
          </div>
        </div>
      )}

      {/* Error State with shadow */}
      {error && (
        <div className="max-w-6xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4 mb-8 shadow-md hover:shadow-lg transition-shadow duration-300">
          <p className="text-red-700 font-semibold">Error: {error}</p>
        </div>
      )}

      {/* Recipe Grid */}
      {!loading && recipes.length > 0 && (
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && recipes.length === 0 && !error && (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-gray-600 text-lg">No recipes found.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
