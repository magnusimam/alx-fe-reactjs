import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  favorites: [],
  searchTerm: '',
  filteredRecipes: [],
  recommendations: [],
  
  // Recipe actions
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, newRecipe] 
  })),
  
  setRecipes: (recipes) => set({ recipes }),
  
  updateRecipe: (updatedRecipe) => set((state) => ({
    recipes: state.recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  })),
  
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter((recipe) => recipe.id !== id),
    favorites: state.favorites.filter((favId) => favId !== id)
  })),
  
  // Search actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  filterRecipes: () => set((state) => ({
    filteredRecipes: state.recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
    )
  })),
  
  // Favorites actions
  addFavorite: (recipeId) => set((state) => ({ 
    favorites: [...state.favorites, recipeId] 
  })),
  
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter((id) => id !== recipeId)
  })),
  
  // Recommendations actions
  generateRecommendations: () => set((state) => {
    // Generate recommendations based on favorites
    // If user has favorites, recommend similar recipes (excluding already favorited ones)
    const recommended = state.recipes.filter((recipe) =>
      !state.favorites.includes(recipe.id) && Math.random() > 0.5
    );
    return { recommendations: recommended.slice(0, 3) };
  })
}));

export default useRecipeStore;