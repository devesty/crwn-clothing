import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const config = {
    apiKey: "AIzaSyDlU6uDtAybD5BJsV5rMue6fCPMkD-lBA4",
  authDomain: "crwn-db-5e5e7.firebaseapp.com",
  projectId: "crwn-db-5e5e7",
  storageBucket: "crwn-db-5e5e7.appspot.com",
  messagingSenderId: "867717038424",
  appId: "1:867717038424:web:7be7d46df42cdb2577a52d",
  measurementId: "G-D9TVNL8VKE"
};

firebase.initializeApp(config);

 
export const createUserProfileDocument = async(userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
      
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef;
}






export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider =new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;
