import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);
  const favorites = useRecipeStore((state) => state.favorites);
  const recipes = useRecipeStore((state) => state.recipes);

  useEffect(() => {
    // Generate recommendations when favorites or recipes change
    if (recipes.length > 0) {
      generateRecommendations();
    }
  }, [favorites, recipes, generateRecommendations]);

  if (recommendations.length === 0) {
    return (
      <div style={{ marginTop: '30px' }}>
        <h2>Recommended for You</h2>
        <p style={{ color: '#666' }}>
          {favorites.length === 0 
            ? 'Add some favorites to get personalized recommendations!'
            : 'No recommendations available at the moment. Check back later!'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>Recommended for You</h2>
      <div>
        {recommendations.map((recipe) => (
          <Link 
            key={recipe.id} 
            to={`/recipe/${recipe.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div 
              style={{ 
                cursor: 'pointer',
                border: '2px solid #4CAF50',
                padding: '15px', 
                margin: '10px 0',
                borderRadius: '8px',
                backgroundColor: '#f0fff4',
                transition: 'all 0.2s'
              }}
            >
              <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                ⭐ {recipe.title}
              </h3>
              <p style={{ margin: '0', color: '#666' }}>{recipe.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList;