import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonListHeader,
  IonButton,
  IonButtons 
} from '@ionic/react';
import localforage from 'localforage';
import { UserPreferencesContext } from '../UserPreferencesContext';
import './Settings.css';

interface PrefsType {
  [key: string]: boolean;
}

const dietaryPrefsMapping = {
  glutenFree: 'Gluten Free',
  ketogenic: 'Ketogenic',
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  pescetarian: 'Pescetarian',
  paleo: 'Paleo'
};

const intolerancesMapping = {
  dairy: 'Dairy',
  egg: 'Egg',
  gluten: 'Gluten',
  grain: 'Grain',
  peanut: 'Peanut',
  seafood: 'Seafood',
  sesame: 'Sesame',
  shellfish: 'Shellfish',
  soy: 'Soy',
  sulfite: 'Sulfite',
  treeNut: 'Tree Nut',
  wheat: 'Wheat'
};

const Settings: React.FC = () => {
  const [dietaryPrefs, setDietaryPrefs] = useState<PrefsType>({
    glutenFree: false,
    ketogenic: false,
    vegetarian: false,
    vegan: false,
    pescetarian: false,
    paleo: false,
  });

  const [intolerances, setIntolerances] = useState<PrefsType>({
    dairy: false,
    egg: false,
    gluten: false,
    grain: false,
    peanut: false,
    seafood: false,
    sesame: false,
    shellfish: false,
    soy: false,
    sulfite: false,
    treeNut: false,
    wheat: false
  });

  useEffect(() => {
    const loadPreferences = async () => {
      const storedDietPrefs = await localforage.getItem<PrefsType>('dietary_preferences');
      const storedIntolerances = await localforage.getItem<PrefsType>('intolerances');
    
      if (storedDietPrefs) {
        const filteredPrefs = Object.keys(storedDietPrefs)
          .filter(key => key in dietaryPrefs)
          .reduce((obj, key) => {
            return {
              ...obj,
              [key]: storedDietPrefs[key],
            };
          }, {});
        setDietaryPrefs(prevPrefs => ({ ...prevPrefs, ...filteredPrefs }));
      }
    
      if (storedIntolerances) {
        const filteredIntolerances = Object.keys(storedIntolerances)
          .filter(key => key in intolerances)
          .reduce((obj, key) => {
            return {
              ...obj,
              [key]: storedIntolerances[key],
            };
          }, {});
        setIntolerances(prevIntolerances => ({ ...prevIntolerances, ...filteredIntolerances }));
      }
    };
    loadPreferences();
  }, []);

  const handleCheckboxChange = async (category: string, name: string, checked: boolean) => {
    if (category === "dietary_preferences") {
      const newPrefs = { ...dietaryPrefs, [name]: checked };
      setDietaryPrefs(newPrefs);
      await localforage.setItem('dietary_preferences', newPrefs);
    } else if (category === "intolerances") {
      const newIntolerances = { ...intolerances, [name]: checked };
      setIntolerances(newIntolerances);
      await localforage.setItem('intolerances', newIntolerances);
    }
  };
  

  return (
    <IonPage className='settings-page'>
      <IonHeader className="settings-header">
        <IonToolbar className="settings-toolbar">
          <IonButtons slot="start">
            <IonButton></IonButton>
          </IonButtons>
          <IonTitle className="settings-title">Settings</IonTitle>
          <IonButtons slot="end">
            <IonButton></IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="settings-content">
        <IonHeader collapse="condense" className="settings-header">
          <IonToolbar className="settings-toolbar">
            <IonTitle size="large" className="settings-title">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList className="settings-list">
          <IonListHeader style={{ textAlign: 'center' }} className="settings-list-header">Dietary Preferences</IonListHeader>
          {Object.keys(dietaryPrefs).map((dietPref) => (
            <IonItem lines="none" key={dietPref} className="settings-item">
              <IonLabel className="settings-label">{dietPref}</IonLabel>
              <IonCheckbox
                slot="start"
                value={dietPref}
                checked={dietaryPrefs[dietPref]}
                onIonChange={(e) => handleCheckboxChange('dietary_preferences', dietPref, e.detail.checked)}
              />
            </IonItem>
          ))}

          <IonListHeader style={{ textAlign: 'center' }} className="settings-list-header">Intolerances</IonListHeader>
          {Object.keys(intolerances).map((intolerance) => (
            <IonItem lines="none" key={intolerance} className="settings-item">
              <IonLabel className="settings-label">{intolerance}</IonLabel>
              <IonCheckbox
                slot="start"
                value={intolerance}
                checked={intolerances[intolerance]}
                onIonChange={(e) => handleCheckboxChange('intolerances', intolerance, e.detail.checked)}
              />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
