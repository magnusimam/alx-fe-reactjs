import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const AddRecipeForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    servings: "",
    cookTime: "",
    difficulty: "Easy",
    ingredients: "",
    instructions: ""
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Recipe title is required"
    }

    if (!formData.summary.trim()) {
      newErrors.summary = "Recipe summary is required"
    }

    if (!formData.servings.trim()) {
      newErrors.servings = "Servings is required"
    }

    if (!formData.cookTime.trim()) {
      newErrors.cookTime = "Cook time is required"
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required"
    } else {
      const ingredientList = formData.ingredients.split("\n").filter(i => i.trim())
      if (ingredientList.length < 2) {
        newErrors.ingredients = "Please add at least 2 ingredients"
      }
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = "Preparation steps are required"
    } else {
      const instructionList = formData.instructions.split("\n").filter(i => i.trim())
      if (instructionList.length < 2) {
        newErrors.instructions = "Please add at least 2 preparation steps"
      }
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true)
      console.log("Form submitted:", formData)
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          title: "",
          summary: "",
          servings: "",
          cookTime: "",
          difficulty: "Easy",
          ingredients: "",
          instructions: ""
        })
        setSubmitted(false)
        navigate("/")
      }, 2000)
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link to="/" className="text-orange-600 hover:text-orange-700 font-semibold mb-6 inline-block transition-colors duration-300">
           Back to Home
        </Link>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8 md:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 text-orange-600">
            Add New Recipe
          </h1>
          <p className="text-gray-600 mb-8">Share your culinary creation with our community</p>

          {/* Success Message */}
          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg shadow-md animate-pulse">
              <p className="text-green-700 font-semibold"> Recipe submitted successfully! Redirecting...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recipe Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 hover:text-orange-600 transition-colors duration-300">
                Recipe Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Spaghetti Carbonara"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1 font-semibold">{errors.title}</p>}
            </div>

            {/* Recipe Summary */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 hover:text-orange-600 transition-colors duration-300">
                Recipe Summary *
              </label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Brief description of your recipe"
                rows="3"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-300 hover:border-orange-300"
              ></textarea>
              {errors.summary && <p className="text-red-500 text-sm mt-1 font-semibold">{errors.summary}</p>}
            </div>

            {/* Servings, Cook Time, Difficulty Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 hover:text-orange-600 transition-colors duration-300">
                  Servings *
                </label>
                <input
                  type="text"
                  name="servings"
                  value={formData.servings}
                  onChange={handleChange}
                  placeholder="e.g., 4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300"
                />
                {errors.servings && <p className="text-red-500 text-sm mt-1 font-semibold">{errors.servings}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 hover:text-orange-600 transition-colors duration-300">
                  Cook Time *
                </label>
                <input
                  type="text"
                  name="cookTime"
                  value={formData.cookTime}
                  onChange={handleChange}
                  placeholder="e.g., 30 minutes"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300"
                />
                {errors.cookTime && <p className="text-red-500 text-sm mt-1 font-semibold">{errors.cookTime}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 hover:text-orange-600 transition-colors duration-300">
                  Difficulty Level
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 hover:text-orange-600 transition-colors duration-300">
                Ingredients * (one per line, minimum 2)
              </label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                placeholder="Add ingredients here, one per line&#10;Example:&#10;2 cups flour&#10;3 eggs&#10;1 cup milk"
                rows="5"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-300 hover:border-orange-300"
              ></textarea>
              {errors.ingredients && <p className="text-red-500 text-sm mt-1 font-semibold">{errors.ingredients}</p>}
            </div>

            {/* Preparation Steps */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 hover:text-orange-600 transition-colors duration-300">
                Preparation Steps * (one per line, minimum 2)
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Add preparation steps here, one per line&#10;Example:&#10;Preheat oven to 350F&#10;Mix dry ingredients in a bowl&#10;Combine wet ingredients separately"
                rows="5"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-300 hover:border-orange-300"
              ></textarea>
              {errors.instructions && <p className="text-red-500 text-sm mt-1 font-semibold">{errors.instructions}</p>}
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
              >
                Submit Recipe
              </button>
              <Link
                to="/"
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddRecipeForm
