import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContextProvider";
import { 
  IonApp, 
  IonHeader, 
  IonCard, 
  IonInput, 
  IonCardContent,
  IonButton, 
  IonIcon, 
  useIonAlert, 
  IonFooter,
  IonToolbar, 
  IonTitle, 
  IonContent
} from '@ionic/react';
import { logIn } from 'ionicons/icons';


const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [presentAlert] = useIonAlert(); 
  
  const { handleLogin } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

  const data = {
    email,
    password
  };
    
  await axios
    .post("https://reqres.in/api/login", data)
    .then((res) => {
      handleLogin(res.data.token);
      //console.log(res.data.token);
  })
    .catch((err) => {
      console.log(err);
      presentAlert({
        header: "Invalid login details!",
        message: 'Try again',
        cssClass: 'custom-alert',
        buttons: 
          [{text: ['OK'],
          cssClass: 'alert-button-cancel'}            
          ]
      })
    })
  };

  return ( 
    <IonApp>
      <IonHeader className='background'>
        <IonToolbar>
          <IonTitle className='ion-text-center'>User App</IonTitle>
        </IonToolbar>
      </IonHeader>
    <IonContent className="ion-padding ion-text-center background-content">       
      <IonCard className='background-card'> 
        <IonCardContent >
          <h1 className="ion-padding-bottom">Login</h1>
            <form onSubmit={handleSubmit}>     
              <IonInput          
                shape="round"
                label="Email"
                fill="outline"
                labelPlacement="floating"
                type="email"
                className='ion-margin-bottom'
                value={email}
                onIonInput={(e) => setEmail(e.target.value)}      
              />         
              <IonInput
                shape="round"
                label="Password"
                fill="outline"      
                labelPlacement="floating"
                type="password"
                minlength={8}
                value={password}
                onIonInput={(e) => setPassword(e.target.value)}          
              />
              <IonButton 
                className="ion-margin-top" 
                expand="full" 
                type="submit"  
                value="Submit" 
                color="tertiary" 
              >
                <IonIcon icon={ logIn } slot="start" />
                Login
              </IonButton>       
            </form>         
        </IonCardContent>
      </IonCard>
    </IonContent>
      <IonFooter className='background'>
        <IonToolbar>
          <IonTitle className='ion-text-center'>
            <h6>Cypyright &copy; 2023</h6>
          </IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonApp>
  );
};

export default Form;