import { useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const navigate = useNavigate();
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div>
      <h2>All Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add your first recipe!</p>
      ) : (
        <div>
          {recipes.map((recipe) => (
            <div 
              key={recipe.id} 
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              style={{ 
                cursor: 'pointer', 
                border: '1px solid #ddd', 
                padding: '10px', 
                margin: '10px 0',
                borderRadius: '5px'
              }}
            >
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;