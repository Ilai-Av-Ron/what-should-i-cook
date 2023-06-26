import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { camera, settings, book } from 'ionicons/icons';
import Scan from './pages/Scan';
import Settings from './pages/Settings';
import Recipes from './pages/Recipes';
import RecipesContextProvider from './RecipesContext'; 

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <RecipesContextProvider>
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/Scan">
              <Scan />
            </Route>
            <Route path="/Settings">
              <Settings />
            </Route>
            <Route path="/Recipes">
              <Recipes/>
            </Route>
            <Route exact path="/">
              <Redirect to="/Scan" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="Scan" href="/Scan">
              <IonIcon aria-hidden="true" icon={camera} />
              <IonLabel>Scan</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Settings" href="/Settings">
              <IonIcon aria-hidden="true" icon={settings} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Recipes" href="/Recipes">
              <IonIcon aria-hidden="true" icon={book} />
              <IonLabel>Recipes</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  </RecipesContextProvider>
);

export default App;