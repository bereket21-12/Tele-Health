import React, { createContext, useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db, useFirebaseAuth } from './firebaseConfig'; // Assuming you have a useFirebaseAuth hook
import { collection, getDocs, query, setDoc, where } from 'firebase/firestore';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { firebase_auth } = useFirebaseAuth(); // Adjust this based on your firebase configuration

  useEffect(() => {
    const unsubscribe = firebase_auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, [firebase_auth]);

  const login = async (email, password) => {

    
    try {
       const userCredential = await signInWithEmailAndPassword(firebase_auth, email, password)
       const loggedInUser = userCredential.user;
       const contactsCollection = collection(db, "user");
       const contactsQuery =  query(contactsCollection, where('email', '==', `${loggedInUser.email}`));
       const contactsSnapshot = await getDocs(contactsQuery);
       const contactsData  =  contactsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
       }));
      setUser(contactsData[0]);
      console.log("Logged \n"+contactsQuery[0])
      console.log(contactsData[0])
      return contactsData

    } catch (error) {
      alert("Incorrect Email or Password")
      console.error('Login error:', error.message);

      return  null

    }


  };

  const update =(userDocRef,name,email,age,gender,weight,height,selectedImage)=>{

     setDoc(userDocRef, {name  ,age ,gender ,weight ,height ,image:selectedImage}, { merge: true })
    .then(async () => {
      const contactsCollection = collection(db, "user");
      const contactsQuery =  query(contactsCollection, where('email', '==', `${email}`));
      const contactsSnapshot = await getDocs(contactsQuery);
      const contactsData  =  contactsSnapshot.docs.map((doc) => ({
           id: doc.id,
           ...doc.data(),
      }));
     setUser(contactsData[0]);

       
    })
    .catch((error) => {
      console.error('Error updating data:', error);
    });
  
  }

  const signOut = async () => {

    try {
      await firebase_auth.signOut();
      console.log("Signout Successfully")

    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login ,signOut,update }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
