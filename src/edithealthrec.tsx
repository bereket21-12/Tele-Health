import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useAuth } from './AuthProvider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const EditHealthRecordScreen = ({ route, navigation }) => {
  const { originalData } = route.params
  const {user} = useAuth()
  const userDocRef = doc(db, 'health_rec', originalData.id); 
  const [selectedDate, setSelectedDate] = useState(originalData.selectedDate);
  const [pressure, setPressure] = useState(originalData.pressure);
  const [heartRate, setHearRate] = useState(originalData.heartRate);
  const [step, setStep] = useState(originalData.step);
  const [weight, setWeight] = useState(originalData.weight);
  const[userid,setUserId] = useState(user.id)
  const [showDatePicker, setShowDatePicker] = useState(false);



  const handleDateChange = (event, date) => {

    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
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

  const handleUpdate = () => {
    
        setDoc(userDocRef, {selectedDate :selectedDate, pressure :pressure,heartRate :heartRate,step :step,weight :weight,userid :userid,}, { merge: true })
      .then(() => {
        console.log('Update successful');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
    navigation.goBack();

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
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />

        <Text style={styles.label}>Blood Pressure:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter blood pressure"
          value={pressure}
          onChangeText={(text) => setPressure(text )}
        />

        <Text style={styles.label}>Steps:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter steps"
          keyboardType="numeric"
          value={step}
          onChangeText={(text) => setStep( text)}
        />
        <Text style={styles.label}>Heart Rate:</Text>
          <TextInput
          style={styles.input}
          placeholder="Enter Heart Rate"
          keyboardType="numeric"
          value={heartRate}
          onChangeText={(text) => setHearRate( text)}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
          <Text style={styles.saveButtonText}>update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deletebutton} onPress={handleDelete} >
            <Text style={styles.loginButtonText}>Delete</Text>
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
  },  datePickerButton: {
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
});

export default EditHealthRecordScreen;
