import { setDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView ,Image} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { db } from './firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from './AuthProvider';

const EditProfile = ({navigation}) => {
  const {user} = useAuth()
  const{update} = useAuth()

  const [name, setName] = useState(user[0].name);
  const [email, setEmail] = useState(user[0].email);
  const [age, setAge] = useState(user[0].age);
  const [gender, setGender] = useState(user[0].gender); // Default to male
  const [height, setHeight] = useState(user[0].height);
  const [weight, setWeight] = useState(user[0].weight);
  const [selectedImage, setSelectedImage] = useState(user[0].image);
  const userDocRef = doc(db, 'user', user[0].id); // Pass the original data from the health 
  useEffect(() => {
    
  }, [user])
  


  const handleUpdate = () => {

  update(userDocRef, name , email ,age ,gender ,weight ,height ,selectedImage)
  navigation.goBack();

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>User Registration</Text>
      <View >
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.imagespicertext}>Pick an image</Text>
      </TouchableOpacity>
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
        </View>
      )}
    </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          keyboardType="numeric"
          value={age}
          onChangeText={(text) => setAge(text)}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Gender:</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Select Gender', value: null }}
          onValueChange={(value) => setGender(value)}
          items={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Height (cm):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your height"
          keyboardType="numeric"
          value={height}
          onChangeText={(text) => setHeight(text)}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Weight (kg):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your weight"
          keyboardType="numeric"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 16,
    margin:15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  imagespicertext: {
    fontSize: 18,
    color: 'blue',
  },
});

export default EditProfile;
