import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { initializeFirebase } from './firebaseConfig';
initializeFirebase();
import { useEffect, useState } from 'react';
import 'firebase/auth';
import { User } from 'firebase/auth';


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
import MealList from './pages/MealList';

setupIonicReact();


import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
import AuthPage from './pages/AuthPage';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(),(user: User | null) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/meals" component={MealList} />
           <Route path="/auth" render={(props) => <AuthPage {...props} setUser={setUser} />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
  
};

export default App;
