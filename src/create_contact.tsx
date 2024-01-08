import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import 'firebase/storage';
import { db } from './firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadBytes, StorageReference } from 'firebase/storage';
import 'firebase/storage';
import { useAuth } from './AuthProvider';

const CreateContactScreen
 = ({ navigation }) => {
 

  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
 const {user} = useAuth()

  const addContact = async () => {
    if (newContactName && newContactNumber) {
      setContacts([...contacts, { name: newContactName, number: newContactNumber }]);
      setNewContactName('');
      setNewContactNumber('');
    }
    try {


        const storage = getStorage();
        const fileref = `images/${Date.now()}.jpg`
        const storageRef = ref(storage, fileref);
  
        const response = await fetch(selectedImage);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob);
  
       
        const dowmloadurl = await getDownloadURL(storageRef)
       
        await addDoc(collection(db, "contacts"), {
            name: newContactName,
            phonenum: newContactNumber,
            image : dowmloadurl,
            email : user.email
        });
         
        console.log('Download URL:', dowmloadurl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
      
      navigation.navigate('Contacts');

  };

  const pickImage = async () => {
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
    
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Contacts</Text>
      <View style={styles.inputContainer}>
      <View >
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
        </View>
      )}
    </View>
        <TextInput
          style={styles.input}
          placeholder="Contact Name"
          value={newContactName}
          onChangeText={(text) => setNewContactName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={newContactNumber}
          onChangeText={(text) => setNewContactNumber(text)}
          keyboardType="phone-pad"
        />
        

       
        <TouchableOpacity style={styles.addButton} onPress={addContact}>
          <Text style={styles.addButtonText}>Add Contact</Text>
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
    color:'#3cb548'
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

export default CreateContactScreen


function uploadData(storageRef: StorageReference, byteArray: Uint8Array, arg2: string) {
  throw new Error('Function not implemented.');
}

