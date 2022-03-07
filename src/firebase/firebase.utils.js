import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCoRtImlP5mpG1D0Fq1FQQp30kJrvRK1tQ",
  authDomain: "crwn-db-efd19.firebaseapp.com",
  projectId: "crwn-db-efd19",
  storageBucket: "crwn-db-efd19.appspot.com",
  messagingSenderId: "1076835675146",
  appId: "1:1076835675146:web:32f38fc50a6badceb943f3",
  measurementId: "G-V3E03DCXCC",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, AdditionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...AdditionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;

  console.log(snapShot);
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
