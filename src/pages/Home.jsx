import React, {useEffect, useState, useContext} from 'react'
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList,
  IonItem, 
  IonLabel, 
  IonAvatar, 
  IonImg, 
  IonIcon, 
  IonButton,
  IonGrid,
  IonRow, 
  IonCol,
  IonFooter,
  IonSpinner,
  IonSearchbar,
} from "@ionic/react";
import { AuthContext } from "../auth/AuthContextProvider";
import axios from "axios";
import { arrowForward, add, exit } from 'ionicons/icons';

const Home = () => {
  const { Auth, setIsAuth } = useContext(AuthContext);
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([]);
  
  const getUsers = async () => {

  try {
    const res = await axios.get("https://reqres.in/api/users");
    setUsers(res.data.data);
    //console.log(res.data.data);
  } catch (err) {
    console.log(err);
  }     
  };
  
  useEffect(() => {
    getUsers();
  }, []); 
  
  const getLogOut = () => {
    setIsAuth(!Auth)
  };
  
  return (
    <IonPage>
      <IonHeader className='background'>
        <IonToolbar>
          <IonGrid fixed={true}>
            <IonRow>
              <IonCol className='vertical'>
                <IonTitle>Users</IonTitle>
              </IonCol>
              <IonCol className='ion-text-end'>
                <IonButton 
                  fill='clear'
                  color="tertiary" 
                  routerLink={`home/post`}>add user
                  <IonIcon icon={ add } slot="end"/>
                </IonButton>                           
              </IonCol>
            </IonRow>
          </IonGrid>    
        </IonToolbar>
      </IonHeader>
    <IonContent className="background-content" fullscreen>
      <IonSearchbar
        placeholder='Search...'
        onIonInput={(e) => setQuery(e.target.value)}>
      </IonSearchbar>
      {users.length ? (
      <>
      {users
      .filter((user) => 
      user.first_name.toLowerCase().includes(query))
      .map((user) => {
        return (
          <IonList key={user.id}>     
            <IonItem  routerLink={`home/details/${user.id}`}>
              <IonAvatar slot="start">
                <IonImg src={user.avatar}/>
              </IonAvatar>
                <IonIcon icon={ arrowForward } slot="end"/>
              <IonLabel>{user.first_name} {user.last_name} 
                <p>{user.email}</p>
              </IonLabel>
            </IonItem>   
          </IonList>
        )
      })}
      </>
      )
      : <IonSpinner name="lines-sharp"/>
      }
    </IonContent>
      <IonFooter className='background'>
        <IonToolbar className='ion-text-center'>
          <IonButton 
            shape="round"
            color="medium" 
            onClick={getLogOut}>Log Out
            <IonIcon icon={ exit } slot="end" />       
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;