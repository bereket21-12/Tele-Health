import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';


const Card = ({ title, content, imageUri, onPress,time }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: imageUri }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{content}</Text>
      <Text style={styles.cardText}>{time}</Text>
    </View>
  </TouchableOpacity>
);

const AppointmentScreen = () => {
  const navigation = useNavigation();
  const [doctor ,setDoctor] = useState(null)


  useEffect(()=>{

    async function loder() {

      const contactsCollection = collection(db, "doctors");
      const contactsQuery =  query(contactsCollection);
      const contactsSnapshot = await getDocs(contactsQuery);
      const contactsData  =  contactsSnapshot.docs.map((doc) => ({
       id: doc.id,
       ...doc.data(),
     }));
     setDoctor( ()=> contactsData);
      
    }

    loder()

   


  },[])

  const handel = (de)=>{

    navigation.navigate('DetailedAppointmentScreen', { doctorName: de })
    
  }




  function convertTo24HourFormat(timeString) {

    const timestampInMilliseconds = timeString.seconds * 1000 + timeString.nanoseconds / 1e6
    const date = new Date(timestampInMilliseconds);
    const hour = date.getHours();
    return hour
}

  return (
    <ScrollView style={styles.container}>
      {/* Header Component */}

      {/* Available Doctors Component */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Doctors</Text>
        {/* {availableDoctors.map((doctor) => (
          <Card
            key={doctor.id}
            title={`${doctor.name}, ${doctor.specialty}`}
            content=""
            time = {doctor.workingtime}
            imageUri={doctor.avatarUri}
             onPress={() =>handel(doctor) }
          />
        ))} */}

        {
            doctor?.map(value => {
              const start = value.start
              const end = value.end
              const startone = convertTo24HourFormat(start);
              const endone = convertTo24HourFormat(end);
              return (
                <Card
                  key={value.id}
                  title={`${value.name}, ${value.area}`}
                  content=""
                  time={`${startone}:00AM-${endone}:00AM`}
                  imageUri={value.image}
                  onPress={() => handel(value)}
                />
              );
            })
        }

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardText: {
    color: '#555',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default AppointmentScreen;
