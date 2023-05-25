import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import app from  './firebaseConfig';
import AuthPage from './pages/AuthPage';
import { useEffect } from 'react';


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
import firebaseConfig from './firebaseConfig';


setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    firebaseConfig;
  }, []);

  return(
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path= "/auth" component={AuthPage}/>
        <Redirect exact from="/" to="/auth"/>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);
  };

export default App;
