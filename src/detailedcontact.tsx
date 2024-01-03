// DetailedContactScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const DetailedContactScreen = ({ route, navigation }) => {

  const { originalData } = route.params

  const [name, setName] = useState(originalData.name);
  const [phoneNumber, setPhoneNumber] = useState(originalData.phonenum);
  const [selectedImage, setSelectedImage] = useState(originalData.image);

  const userDocRef = doc(db, 'contacts', originalData.id);


  const handleUpdate = () => {
    
        setDoc(userDocRef, { name: name, phonenum: phoneNumber, image:selectedImage }, { merge: true })
      .then(() => {
        console.log('Update successful');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
    navigation.goBack();

  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.canceled) {
      // await uploadImageToFirestore();
      setSelectedImage(result.uri);
    }
  };

  const handleDelete = () => {
    
    deleteDoc(userDocRef)
    .then(() => {
      console.log('Document successfully deleted');
    })
    .catch((error) => {
      console.error('Error deleting document:', error);
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text>Phone Number:</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
          <TouchableOpacity style={styles.updatebutton} onPress={handleUpdate} >
            <Text style={styles.loginButtonText}>update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deletebutton} onPress={handleDelete} >
            <Text style={styles.loginButtonText}>Delete</Text>
          </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 19,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  update:{
    marginBottom:12,
    marginTop:12
  },
  updatebutton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%', // Make button full width
    marginTop:16
  },
  deletebutton: {
    backgroundColor: '#e31212',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%', // Make button full width
    marginTop:16
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  imageContainer: {
    marginTop: 20,
    alignSelf:"center"
  },
  
});

export default DetailedContactScreen;
