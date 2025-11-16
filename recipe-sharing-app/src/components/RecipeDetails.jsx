import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === parseInt(id))
  );
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const isFavorite = favorites.includes(parseInt(id));

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(parseInt(id));
    } else {
      addFavorite(parseInt(id));
    }
  };

  if (!recipe) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Recipe not found</h2>
        <button onClick={() => navigate('/')}>Back to Recipes</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate('/')}>← Back to Recipes</button>
      
      <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <h1 style={{ margin: 0 }}>{recipe.title}</h1>
          <button
            onClick={handleFavoriteToggle}
            style={{
              background: isFavorite ? '#ff6b6b' : '#ddd',
              color: isFavorite ? 'white' : '#333',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
          </button>
        </div>
        
        <p style={{ marginTop: '15px', fontSize: '16px', lineHeight: '1.6' }}>
          {recipe.description}
        </p>
        
        <div style={{ marginTop: '30px' }}>
          <EditRecipeForm recipe={recipe} />
          <DeleteRecipeButton recipeId={recipe.id} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;