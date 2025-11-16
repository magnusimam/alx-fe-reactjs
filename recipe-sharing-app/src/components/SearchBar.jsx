import { useEffect } from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, filterRecipes]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          border: '2px solid #ddd',
          borderRadius: '8px',
          boxSizing: 'border-box'
        }}
      />
    </div>
  );
};

export default SearchBar;