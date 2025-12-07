import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

const RecipeDetail = () => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true)
        const response = await fetch("/src/data.json")
        if (!response.ok) throw new Error("Failed to load recipes")
        const data = await response.json()
        const found = data.find(r => r.id === parseInt(id))
        if (!found) throw new Error("Recipe not found")
        setRecipe(found)
        setError("")
      } catch (err) {
        setError(err.message || "Error loading recipe")
        setRecipe(null)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading recipe...</p>
        </div>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-orange-600 hover:text-orange-700 font-semibold mb-8 inline-block">
             Back to Home
          </Link>
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 shadow-lg">
            <p className="text-red-700 text-lg font-semibold">Error: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/" className="text-orange-600 hover:text-orange-700 font-semibold mb-6 inline-block transition-colors duration-300">
           Back to Home
        </Link>

        {/* Recipe Header with Image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-gray-200">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Recipe Title and Meta */}
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 hover:text-orange-600 transition-colors duration-300">
              {recipe.title}
            </h1>
            <p className="text-gray-600 text-lg mb-6">{recipe.summary}</p>

            {/* Meta Information Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6 bg-gray-50 rounded-lg p-4">
              <div className="text-center hover:bg-gray-100 p-2 rounded transition-colors duration-300">
                <p className="text-orange-600 font-bold text-lg">{recipe.servings}</p>
                <p className="text-gray-600 text-sm">Servings</p>
              </div>
              <div className="text-center hover:bg-gray-100 p-2 rounded transition-colors duration-300">
                <p className="text-orange-600 font-bold text-lg">{recipe.cookTime}</p>
                <p className="text-gray-600 text-sm">Cook Time</p>
              </div>
              <div className="text-center hover:bg-gray-100 p-2 rounded transition-colors duration-300">
                <p className="text-orange-600 font-bold text-lg">{recipe.difficulty}</p>
                <p className="text-gray-600 text-sm">Difficulty</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients and Instructions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Ingredients */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-orange-600">Ingredients</h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start hover:bg-orange-50 p-2 rounded transition-colors duration-300">
                  <span className="text-orange-600 font-bold mr-3"></span>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-orange-600">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex hover:bg-orange-50 p-2 rounded transition-colors duration-300">
                  <span className="text-orange-600 font-bold mr-4 text-lg">{index + 1}.</span>
                  <span className="text-gray-700">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Back Button at Bottom */}
        <div className="flex justify-center">
          <Link to="/" className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
            Back to Recipes
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail
