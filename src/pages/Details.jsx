import { useEffect,  useState} from "react";
import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonBackButton, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonButton ,  
  IonImg, 
  IonIcon,
  IonFooter
} from "@ionic/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { cameraOutline } from 'ionicons/icons';

const Details = () => {  
  const params = useParams();
  const [user, setUser] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
  const singleUserApiUrl = `https://reqres.in/api/users/${params.email}`
    axios
    .get(singleUserApiUrl)
    .then((res) => {setUser(res.data.data)})
    .catch((err) => console.log(err))
  }, [params]);

  const captureImage = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      qaulity: 100,
    });
    const image = `data:image/jpeg;base64,${photo.base64String}`
    setImage(image);
  };

  return (
    <IonPage>
      <IonHeader className='background'>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/home'></IonBackButton>
          </IonButtons>
          <IonTitle>{user?.email}</IonTitle>
        </IonToolbar>
      </IonHeader>
    <IonContent className="background-content">
      <IonCard className="ion-text-center background-user-card ">
        <IonCardHeader>
          <IonCardTitle>
            {user?.first_name} {user?.last_name}
          </IonCardTitle>
          <IonCardContent>  
          <img src={user?.avatar} alt="img" />  
          </IonCardContent>
        </IonCardHeader>
      </IonCard>
      <IonCard className="ion-text-center background-user-card " >
        <IonCardContent>
          <IonButton fill="outline" onClick={captureImage}>
            <IonIcon icon={ cameraOutline } slot="end" /> 
            Capture Image
          </IonButton>
            <IonImg src={image}/>
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
    </IonPage>
  );
};

export default Details;