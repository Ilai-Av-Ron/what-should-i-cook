import React, { useContext, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import { RecipesContext } from '../RecipesContext';
import './Recipes.css';

const Recipes: React.FC = () => {
  const { recipes } = useContext(RecipesContext);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

  const currentRecipe = recipes ? recipes[currentRecipeIndex] : undefined;

  const handleNext = () => {
    if (currentRecipeIndex < (recipes?.length ?? 0) - 1) {
      setCurrentRecipeIndex(currentRecipeIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentRecipeIndex > 0) {
      setCurrentRecipeIndex(currentRecipeIndex - 1);
    }
  };

  return (
    <IonPage className="recipes-page">
      <IonHeader>
        <IonToolbar className="recipes-toolbar">
          <IonTitle className="recipes-title">Recipes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="recipes-content">
        {!recipes || recipes.length === 0 ? (
          <div className="empty-recipes-message">
            <p>No recipes found</p>
            <IonButton href="/Scan" className="scan-redirect-button">Take a picture of your fridge!</IonButton>
          </div>
        ) : (
          <>
            <IonCard className="recipe-card">
              <IonCardHeader className="ion-card-header">
                <IonCardTitle className="ion-card-title">{currentRecipe?.title}</IonCardTitle>
                {currentRecipe?.image && <IonImg className="ion-img" src={currentRecipe?.image} alt={currentRecipe?.title} />}
              </IonCardHeader>
              <IonCardContent className="ion-card-content">
                <h2>Ingredients:</h2>
                <ul>
                  {currentRecipe?.ingredients?.map((ingredient: string, index: number) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h2>Cooking steps:</h2>
                <ol>
                  {currentRecipe?.steps?.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </IonCardContent>
            </IonCard>
            <IonButton className="ion-button" onClick={handlePrevious} disabled={currentRecipeIndex === 0}>
              Previous Recipe
            </IonButton>
            <IonButton className="ion-button"
              onClick={handleNext}
              disabled={currentRecipeIndex === (recipes?.length ?? 0) - 1}
            >
              Next Recipe
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Recipes;
