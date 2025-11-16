import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const navigate = useNavigate();
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  // Initialize filtered recipes when component mounts or recipes change
  useEffect(() => {
    filterRecipes();
  }, [recipes, filterRecipes]);

  // Determine which recipes to display
  const displayRecipes = searchTerm ? filteredRecipes : recipes;

  return (
    <div>
      <h2>All Recipes</h2>
      {displayRecipes.length === 0 ? (
        <p>
          {searchTerm 
            ? `No recipes found matching "${searchTerm}"`
            : 'No recipes yet. Add your first recipe!'}
        </p>
      ) : (
        <div>
          {displayRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              style={{ 
                cursor: 'pointer', 
                border: '1px solid #ddd', 
                padding: '15px', 
                margin: '10px 0',
                borderRadius: '8px',
                backgroundColor: '#fff',
                transition: 'all 0.2s'
              }}
            >
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          ))}
        </div>
      )}
      {searchTerm && displayRecipes.length > 0 && (
        <p style={{ color: '#666', marginTop: '10px' }}>
          Found {displayRecipes.length} recipe(s) matching "{searchTerm}"
        </p>
      )}
    </div>
  );
};

export default RecipeList;