import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { useAuth } from './AuthProvider';

const HealthRecordScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const { user } = useAuth();
  const contactsCollection = collection(db, "health_rec");
  const contactsQuery = query(contactsCollection, where('userid', '==', `${user[0].id}`));

  useEffect(() => {
    async function dataloader() {
      try {
        const contactsSnapshot = await getDocs(contactsQuery);
        const contactsData = contactsSnapshot.docs.map((doc) => {
          const selectedDate = doc.data().selectedDate?.toDate();
          
          if (selectedDate instanceof Date) {
            return {
              id: doc.id,
              selectedDate,
              weight: doc.data().weight,
              pressure: doc.data().pressure,
              step: doc.data().step,
              heartRate: doc.data().heartRate,
              // Add other fields as needed
            };
          } else {
            console.warn(`Invalid selectedDate for document with ID: ${doc.id}`);
            return null; // Skip this item in the mapping
          }
        });

        // Remove null entries from the array
        const filteredContactsData = contactsData.filter(item => item !== null);

        setData(filteredContactsData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    dataloader();
  }, [data]); // Only run on mount

  const handeledit = (recordId) => {
    navigation.navigate('EditHealthRecordScreen', { originalData: data.find(record => record.id === recordId) });
  };

  const handelcreate = () => {
    console.log("create clicked")
    navigation.navigate('CreateRect');
  };

  const renderHealthRecordCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handeledit(item.id)}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardDate}>{item.selectedDate ?.toLocaleString()}</Text>
        <Icon name="edit" size={20} color="#fff" />
      </View>
      <View style={styles.recordItem}>
        <Icon name="weight" size={24} color="#349867" />
        <Text style={styles.recordLabel}>Weight:</Text>
        <Text style={styles.recordValue}>{item.weight}</Text>
      </View>
      <View style={styles.recordItem}>
        <Icon name="heartbeat" size={24} color="#e74c3c" />
        <Text style={styles.recordLabel}>Blood Pressure:</Text>
        <Text style={styles.recordValue}>{item.pressure}</Text>
      </View>
      <View style={styles.recordItem}>
        <Icon name="walking" size={24} color="#2ecc71" />
        <Text style={styles.recordLabel}>Steps:</Text>
        <Text style={styles.recordValue}>{item.step}</Text>
      </View>
      <View style={styles.recordItem}>
        <Icon name="heart" size={24} color="#f39c12" />
        <Text style={styles.recordLabel}>Heart Rate:</Text>
        <Text style={styles.recordValue}>{item.heartRate}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderHealthRecordCard}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => handelcreate()}>
        <Icon name="plus" size={30} color="#3498db" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: "5%"
  },
  card: {
    backgroundColor: '#1d4e62',
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardDate: {
    fontSize: 16,
    color: '#fff',
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  recordLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  recordValue: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
  },
});

export default HealthRecordScreen;
