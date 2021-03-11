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

// get current user's uid
export const currentUserUid = async () => {
    return auth.currentUser;
};

// get current user's data
export const currentUserData = async () => {
    return getUserDocument(auth.currentUser.uid);
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
        const { uid, email, displayName, photoURL } = user;
        try {
            await userRef.set({
                uid,
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

//filter items
export const filterItemDocuments = async (itemName, donated, received, donatedBy, receivedBy, requestedBy, orderBy, desc) =>{
    // orderBy is one of {name, createdAt, description}
    const itemsRef = firestore.collection('items');
    var query = itemsRef.where('name', '!=', "");
    // filter name
    if (itemName && itemName.length > 0){
        console.log("filter name")
      query = query.where('name', ">=", itemName).where('name', "<=", itemName + '\uf8ff');}
    query = donated? query.where('donatorUid', '!=', "") : query.where('donatorUid', '==', "");
    query = received? query.where('receiverUid', '!=', "") : query.where('receiverUid', '==', "");
    // filter by specific user donator, reciever, requester
    if(donatedBy){
        query = query.where('donatorUid', '==', donatedBy);
        console.log("filter donatedBy")
        
    }
    if(receivedBy){
        query = query.where('receiverUid', '==', receivedBy);
        console.log("filter receivedBy")

    }
    if(requestedBy){
        query = query.where('requestUids', 'array-contains', requestedBy);
        console.log("filter requestedBy")
    }
    // sort the query
    if(orderBy){
        if(desc){
            query = query.orderBy(orderBy, "desc");
        }else{
            query = query.orderBy(orderBy);
        }
    }
    const items = query
      .get()
      .then(function (querySnapshot) {
        var result = [];
        querySnapshot.forEach(function (doc) {
          result.push(doc.data());
        });
        return result;
      })
      .catch(function (error) {
        console.log("Error getting item documents: ", error);
      });
    return items;
  
}