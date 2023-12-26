import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { db, firebase_auth } from './firebaseConfig';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from './AuthProvider';


const CreateRecord = ( {navigation} ) => {
   
   const {user} = useAuth()

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pressure, setPressure] = useState('');
  const [heartRate, setHearRate] = useState('');
  const [step, setStep] = useState('');
  const [weight, setWeight] = useState('');
  const[userid,setUserId] = useState(user[0].id)
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, date) => {

    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
    
  };

  const handleRegistration = async () => {


    try {
     
      await addDoc(collection(db, "health_rec"), {
      selectedDate,
      pressure,
      heartRate,
      step,
      weight,
      userid
     });

    } catch (error) {
      console.error('Error uploading image:', error);
    }


   
    navigation.navigate('HealthRecordScreen');
  };

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Add Health Record</Text>

        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.datePickerButtonText}>
          {selectedDate.toDateString()}
        </Text>
      </TouchableOpacity>
        {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}

        />
      )}

        <Text style={styles.label}>Weight (kg):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter weight"
          keyboardType="numeric"
          onChangeText={(text) => setWeight(text)}
        />

        <Text style={styles.label}>Blood Pressure:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter blood pressure"
          onChangeText={(text) => setPressure(text )}
        />

        <Text style={styles.label}>Steps:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter steps"
          keyboardType="numeric"
          onChangeText={(text) => setStep( text)}
        />
        <Text style={styles.label}>Heart Rate:</Text>
          <TextInput
          style={styles.input}
          placeholder="Enter Heart Rate"
          keyboardType="numeric"
          onChangeText={(text) => setHearRate( text)}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleRegistration}>
          <Text style={styles.saveButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  datePickerButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
   
    alignItems: 'center',
    paddingVertical: 12,
  
  },
  datePickerButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CreateRecord;
