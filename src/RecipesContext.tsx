import React, { useState, createContext, ReactNode } from 'react';

interface Recipe {
  title: string;
  image: string;
  ingredients: string[];
  steps: string[];
}

interface RecipesContextProps {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

export const RecipesContext = createContext<RecipesContextProps>({ recipes: [], setRecipes: () => null });

interface RecipesContextProviderProps {
  children: ReactNode;
}

const RecipesContextProvider: React.FC<RecipesContextProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  return <RecipesContext.Provider value={{ recipes, setRecipes }}>{children}</RecipesContext.Provider>;
};

export default RecipesContextProvider;
