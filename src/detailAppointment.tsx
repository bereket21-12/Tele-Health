import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform,Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { useAuth } from './AuthProvider';

const DetailedAppointmentScreen = ({ route, navigation }) => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const {user} = useAuth();
  const { doctorName } = route.params;
  
  const start = doctorName.start
  const end = doctorName.end
  const startone = convertTo24HourFormat(start);
  const endone = convertTo24HourFormat(end);

  const handleDateChange = (event, date) => {

    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
    
  };

  function convertTo24HourFormat(timeString) {

        const timestampInMilliseconds = timeString.seconds * 1000 + timeString.nanoseconds / 1e6
        const date = new Date(timestampInMilliseconds);
        const hour = date.getHours();
        return hour
    }

  const handleTimeChange = (event, time) => {
    setShowTimePicker(Platform.OS === 'ios');


    const selectedHour = time.getHours();
      const selectedMinute = time.getMinutes();
      const isWithinRange = selectedHour >= startone &&( selectedHour < endone );
      if (isWithinRange) {
        setSelectedTime(time);
      } else {
        // You can display an alert or any feedback to the user here
       alert(`Please select a time between ${startone}:00 AM to ${endone}:00 AM`);
      }
    console.log(endone )

  };

  const handleBookAppointment = async () => {
    await addDoc(collection(db, "myappointment"), {
      selectedDate,
      selectedTime,
      userid:user[0].id,
      name:doctorName.name

     }).then(()=>console.log
     ("appointment created"))
  };

  return (
    <View style={styles.container}>
         <View style={styles.maincard}>
         <Image source={{ uri: doctorName.image }} style={styles.avatar} />
      <Text style={styles.name}>{doctorName.name}</Text>
      <Text style={styles.specialization}>{doctorName.area}</Text>
      <Text style={styles.workingTime}>{`Working Time: ${startone}:00AM-${endone}:00AM `}</Text>

    </View>
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

      <TouchableOpacity style={styles.timePickerButton} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.timePickerButtonText}>
          {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  datePickerButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width:  '100%',
    alignItems: 'center',
  },
  datePickerButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  timePickerButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width:  '100%',
    alignItems: 'center',
  },
  timePickerButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  bookButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  specialization: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  workingTime: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  otherInfo: {
    fontSize: 16,
    color: '#555',
    // Add styles for other details
  },
  maincard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
    alignContent:"center",
    alignItems:"center"
  },
});

export default DetailedAppointmentScreen;
