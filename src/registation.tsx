import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView ,Image, Platform} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { db, firebase_auth } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const UserRegistrationScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);


  const handleRegistration = async () => {


    try {


      const storage = getStorage();
      const fileref = `images/${Date.now()}.jpg`
      const storageRef = ref(storage, fileref);

      const response = await fetch(selectedImage);
      const blob = await response.blob();

      
      await uploadBytes(storageRef, blob);
      const dowmloadurl = await getDownloadURL(storageRef)
     
        await addDoc(collection(db, "user"), {
        name,
        email,
        age,
        gender,
        height,
        weight,
        challenges : [],
        image :dowmloadurl
      });
       
      console.log('Download URL:', dowmloadurl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }

    console.log('User registered:', { name, email, password, age, gender, height, weight });
    await  createUserWithEmailAndPassword(firebase_auth ,email,password)


   // notification
   async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }

        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }

          token = (await Notifications.getExpoPushTokenAsync({ projectId: 'b1134ed4-c689-49dc-aadf-2e22206366f8' })).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }

        return token;
     }



    const notificationToken =await registerForPushNotificationsAsync() 
    console.log("notificationToken",notificationToken);

     navigation.navigate('LoginPage');

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
      <Text style={styles.title}>Registration</Text>
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
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
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
      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
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
    padding: 16,
    margin:15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf:"center"
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

export default UserRegistrationScreen;
