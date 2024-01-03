import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import 'firebase/storage';
import { storage,app, db } from './firebaseConfig';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL, uploadBytes, StorageReference } from 'firebase/storage';
import 'firebase/storage';
import { useAuth } from './AuthProvider';
import { sendPasswordResetEmail ,getAuth} from 'firebase/auth';

const ForgotPassword
 = ({ navigation }) => {
 
const auth = getAuth()
  
  const [email, setEmail] = useState('');
  


  const addContact = async () => {
try {
    await sendPasswordResetEmail(auth,email,{
        handleCodeInApp: true,
        url: 'https://www.google.com'
    })
    .then(()=>{
        alert("Reset Email sent successfully")
        navigation.navigate('LoginPage');
      })
    
      .catch((error)=>{

        console.log("Error sending password reset email",error.message)
        alert("Failed to send password reset email")
    })
} catch (error) {
    
}
      
  };

 


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>
      <View style={styles.inputContainer}>

        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
   
        

       
        <TouchableOpacity style={styles.addButton} onPress={addContact}>
          <Text style={styles.addButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignContent :"center",
    
    
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  imageContainer: {
    marginTop: 20,
    alignSelf:"center"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'#3cb548',
    alignSelf:"center"
  },
  contactsContainer: {
    flex: 1,
    marginBottom: 16,
    marginTop:50
  },
  contactCard: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 16,
    color: '#555',
  },
  inputContainer: {
    marginBottom: 16,
    marginTop:'10%'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPassword


function uploadData(storageRef: StorageReference, byteArray: Uint8Array, arg2: string) {
  throw new Error('Function not implemented.');
}

