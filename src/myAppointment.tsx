import { collection, query, getDocs, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db } from './firebaseConfig';
import { useAuth } from './AuthProvider';

const MyAppointmentScreen = () => {

    const [challenge, setChallenge] = useState(null);
    const {user} = useAuth()

  useEffect(() => {
    async function loader() {
      const contactsCollection = collection(db, "myappointment");
      const contactsQuery = query(contactsCollection, where('userid', '==', `${user.id}`));

      // const contactsQuery = query(contactsCollection);
      const contactsSnapshot = await getDocs(contactsQuery);
      const contactsData = contactsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChallenge(() => contactsData);
    }
  
    loader();
  }, []); 

  const renderAppointmentItem = ({ item }) => {
    const selectedDate = item.selectedDate?.toDate();
  
    if (!selectedDate) {
      return null;
    }
  
    const currentDate = new Date();
    const isFutureDate = selectedDate > currentDate;
  
    return (
      <View style={[styles.appointmentItem, isFutureDate ? styles.futureAppointment : styles.pastAppointment]}>
        <Text style={styles.appointmentTime}>
          {selectedDate.toLocaleString()}
        </Text>
        <Text style={styles.appointmentDoctor}>{item.name}</Text>
        <Text style={[styles.appointmentStatus, isFutureDate ? styles.futureStatus : styles.pastStatus]}>
          {isFutureDate ? 'Future Appointment' : 'Past Appointment'}
        </Text>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
  
      <FlatList
        data={challenge}
        keyExtractor={(item) => item.id}
        renderItem={renderAppointmentItem}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf:"center"
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }, appointmentItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  appointmentTime: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  appointmentDoctor: {
    fontSize: 16,
    color: '#666',
  },
  appointmentStatus: {
    marginTop: 8,
    fontSize: 14,
  },
  futureAppointment: {
    backgroundColor: '#e6f7ff', // Light blue for future appointments
  },
  pastAppointment: {
    backgroundColor: '#ffe6e6', // Light red for past appointments
  },
  futureStatus: {
    color: '#008ae6', // Dark blue for future status text
  },
  pastStatus: {
    color: '#e60000', // Dark red for past status text
  },
});

export default MyAppointmentScreen;
