import { Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router';

import Home from "../pages/Home"
import Details from '../pages/Details'
import Post from '../pages/Post'

const Routes = () => {
  return (   
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route 
            exact path="/home"
            component={Home}
          />
          <Route 
            exact path="/home/details/:email"
            component={Details}   
          />
          <Route 
            exact path="/home/post"
            component={Post}
          />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter> 
    </IonApp>
  );
};

export default Routes;