import React, { useState} from 'react';
import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonInput,
  IonIcon,
  useIonAlert,
  IonPage,
  IonFooter
} from '@ionic/react';
import axios from 'axios'
import { addCircleOutline } from 'ionicons/icons';


const Post = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [presentAlert] = useIonAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  const data = {
    data: {
      email: email,
      name: name,
    },
    headers: {
      "content-type": "application/json"
    }
  };  

  try {
    const res = await axios.post("https://reqres.in/api/users", data);
    console.log(res.data);
    return (     
      presentAlert({
        header: 'You post data',
        cssClass: 'custom-alert',
        buttons: 
          [{text: 'OK',
          cssClass: 'alert-button-confirm',}             
          ]
        })
      ); 
  } catch (err) {
    console.log(err); 
  }
  };

  return ( 
    <IonPage>
      <IonHeader className='background'>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/home'></IonBackButton>
          </IonButtons>
          <IonTitle>ADD USER PAGE</IonTitle>
        </IonToolbar>
      </IonHeader>
    <IonContent className="ion-padding  background-content">         
      <IonCard className='background-add-card'> 
        <IonCardContent>      
          <form onSubmit={handleSubmit}>
            <IonInput                       
              label="Email"
              fill="solid"
              labelPlacement="floating"
              type="email"
              className='ion-margin-bottom'
              value={email}
              onIonInput={(e) => setEmail(e.target.value)}
              required
            />
            <IonInput
              label="Name"
              fill="solid"   
              labelPlacement="floating"
              minlength={3}
              value={name}
              onIonInput={(e) => setName(e.target.value)}
              required         
            />
            <IonButton 
              className="ion-margin-top" 
              expand="full" 
              type="submit"  
              value="Submit" 
              color="primary" 
            >
              <IonIcon icon={ addCircleOutline } slot="start" />
              post data
            </IonButton>                  
          </form>        
        </IonCardContent>
      </IonCard>
    </IonContent>
      <IonFooter className='background'>
        <IonToolbar>
          <IonTitle className='ion-text-center'><h6>Cypyright &copy; 2023</h6></IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Post;
