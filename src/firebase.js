import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// const { createLogicalNot } = require("typescript")
// To Deploy: firebase login; firebase init; firebase deploy;



const firebaseConfig = {
    apiKey: "AIzaSyDwJER9rMqsKhscQbsmw0JW0Ofaab8X6jA",
    authDomain: "neighbor-care.firebaseapp.com",
    projectId: "neighbor-care",
    storageBucket: "neighbor-care.appspot.com",
    messagingSenderId: "1039600995756",
    appId: "1:1039600995756:web:defdfad277f92cc16abe09",
    measurementId: "G-JQDW38JLNW"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

/** ********************************************************** */
/** **************Login and Registration Related************** */
/** ********************************************************** */
// signin with google using popup methods
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};
// update current user's document with given data
export const updateUserDocument = (profile) => {
    console.log("profile")
    console.log(profile)
    return firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .set(profile)
        .catch((error) => console.error("Error: ", error));
};
// store user info into database <users> collection
export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;

    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { email, displayName, photoURL } = user;
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData,
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};
// get user document by user id
export const getUserDocument = async (uid) => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();

        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};
// get current user's data
export const currentUserData = async () => {
    return getUserDocument(auth.currentUser.uid);
};
