import React, { useState, useContext } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import localforage from 'localforage';
import axios from 'axios';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLoading, IonToast, IonAlert } from '@ionic/react';
import { RecipesContext } from '../RecipesContext';
import { UserPreferencesContext } from '../UserPreferencesContext';
import './Scan.css';

const Scan: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [serverResponse, setServerResponse] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);
  const { setRecipes } = useContext(RecipesContext);
  const [showDebugAlert, setShowDebugAlert] = useState(false);
  const [debugOptions, setDebugOptions] = useState<{
    dietary_preferences: { [key: string]: boolean };
    intolerances: { [key: string]: boolean };
  }>({ dietary_preferences: {}, intolerances: {} });

  const takePhoto = async () => {
    setIsLoading(true);
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });
  
      const imageUrl = image.webPath;
      setPhoto(imageUrl);

      const storedDietPrefs = await localforage.getItem('dietary_preferences');
      const storedIntolerances = await localforage.getItem('intolerances');

      let dietPrefsOptions: {[key: string]: boolean} = {};
      let intolerancesOptions: {[key: string]: boolean} = {};

      if (storedDietPrefs) {
        dietPrefsOptions = Object.entries(storedDietPrefs)
          .filter(([key, value]) => value === true)
          .reduce((obj, [key, value]) => ({...obj, [key]: value}), {});
      }

      if (storedIntolerances) {
        intolerancesOptions = Object.entries(storedIntolerances)
          .filter(([key, value]) => value === true)
          .reduce((obj, [key, value]) => ({...obj, [key]: value}), {});
      }

      const currentSelectedOptions = {
        dietary_preferences: dietPrefsOptions,
        intolerances: intolerancesOptions
      };
      
      setDebugOptions(currentSelectedOptions); // Add this line
      

      if (imageUrl) {
        const formData = new FormData();
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        formData.append('file', blob, 'photo.jpg');
        formData.append('options', JSON.stringify(currentSelectedOptions));
        setShowDebugAlert(true);

        const serverResponse = await axios.post(
          'http://13.48.27.134:5000/upload-image',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (serverResponse.data.success) {
          const recipes = serverResponse.data.recipes;

          if (!recipes || recipes.length === 0) {
            setServerResponse('No recipes found.');
            return;
          }

          const recipeContexts = recipes.map((recipe: any) => {
            const steps = recipe.analyzedInstructions[0].steps.map((step: any) => step.step);
            const ingredients = recipe.extendedIngredients.map((ingredient: any) => ingredient.original);

            return {
              title: recipe.title,
              image: recipe.image,
              steps: steps,
              ingredients: ingredients,
            };
          });

          setRecipes(recipeContexts);
          setAlertMessage('Recipes updated successfully.');
          setShowAlert(true);
          setServerResponse(null);
        } else {
          setServerResponse('Failed to process image.');
        }
      }
    } catch (error) {
      if ((error as any).message === "User cancelled photos app") {
        // Camera was canceled by the user. No action required.
      } else {
        console.error('Something went wrong:', error);
        setServerResponse('Something went wrong, please close the app and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage className="scan-page">
      <IonHeader>
        <IonToolbar className="scan-toolbar">
          <IonTitle className="scan-title">Start Cooking!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="scan-content">
        <IonButton expand="full" onClick={takePhoto} disabled={isLoading} className="scan-button">
          Take a picture of your fridge
        </IonButton>
        {photo && <img src={photo} alt="Captured" style={{ width: '100%', height: 'auto' }} className="scan-image" />}
        <IonLoading isOpen={isLoading} message={'Processing image...'} />
        <IonToast
          isOpen={!!serverResponse}
          onDidDismiss={() => setServerResponse(null)}
          message={serverResponse || ''}
          duration={3000}
        />
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Scan Results'}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Scan;