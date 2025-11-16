import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const FavoritesList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  // Get full recipe objects for favorited IDs
  const favoriteRecipes = favorites
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter((recipe) => recipe !== undefined);

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p style={{ color: '#666' }}>
          No favorite recipes yet. Start adding some!
        </p>
      ) : (
        <div>
          {favoriteRecipes.map((recipe) => (
            <div 
              key={recipe.id}
              style={{
                border: '2px solid #ff6b6b',
                padding: '15px',
                margin: '10px 0',
                borderRadius: '8px',
                backgroundColor: '#fff5f5'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <Link 
                  to={`/recipe/${recipe.id}`}
                  style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}
                >
                  <h3 style={{ margin: '0 0 10px 0' }}>{recipe.title}</h3>
                  <p style={{ margin: '0' }}>{recipe.description}</p>
                </Link>
                <button
                  onClick={() => removeFavorite(recipe.id)}
                  style={{
                    background: '#ff6b6b',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginLeft: '10px'
                  }}
                >
                  ❤️ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;