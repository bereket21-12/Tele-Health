import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { db } from './firebaseConfig';
import { useAuth } from './AuthProvider';
import Communications from 'react-native-communications';
import { Linking } from 'react-native';

const EmergencyContactsScreen = ({ navigation }) => {

  const [data, setData] = useState(null);
  const [name , setName] = useState(null)
  const [phonenum , setPhonnum] = useState(null)
  const {user} = useAuth();
  const emergencyContacts = [
 
      {
        id: '1',
        name: 'Emergency Contact 1',
        number: '+123456789',
        image: data?.[0]?.image || 'https://placekitten.com/100/100',
      },
      {
        id: '2',
        name: 'Emergency Contact 2',
        number: '+987654321',
        image: data?.[0]?.image || 'https://placekitten.com/100/100',
      },
  
    
      {
      id: '4',
      name: 'Emergency Contact 2',
      number: '+987654321',
      image: data?.[0]?.image || 'https://placekitten.com/101/100', // Replace with actual contact image URL
    },
      {
      id: '5',
      name: 'Emergency Contact 2',
      number: '+987654321',
      image: 'https://placekitten.com/101/100', // Replace with actual contact image URL
    },
      {
      id: '6',
      name: 'Emergency Contact 2',
      number: '+987654321',
      image: 'https://placekitten.com/101/100', // Replace with actual contact image URL
    },
      {
      id: '7',
      name: 'Emergency Contact 2',
      number: '+987654321',
      image: 'https://placekitten.com/101/100', // Replace with actual contact image URL
    },
      {
      id: '8',
      name: 'Emergency Contact 2',
      number: '+987654321',
      image: 'https://placekitten.com/101/100', // Replace with actual contact image URL
    },
      {
      id: '9',
      name: 'Emergency Contact 2',
      number: '+987654321',
      image: 'https://placekitten.com/101/100', // Replace with actual contact image URL
    },
      {
      id: '11',
      name: 'Emergency Contact 2',
      number: '+987654321',
      image: 'https://placekitten.com/101/100', // Replace with actual contact image URL
    },
      {
      id: '22',
      name: 'Emergency Contact 2',
      number: '+987654321',
      image: 'https://placekitten.com/101/100', // Replace with actual contact image URL
    },
    // Add more emergency contacts as needed  H47JxrmyV3zDjEZQlMyj
  ];

  const contactsCollection = collection(db, "contacts");
  const contactsQuery = query(contactsCollection, where('email', '==', `${user[0].email}`));

  useEffect(() => {
    async function dataloader() {
      try {

        const contactsSnapshot = await getDocs(contactsQuery);
        const contactsData  =  contactsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData( ()=> contactsData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  
    dataloader();
  }, [data]);
  
  const renderEmergencyContactCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCallContact(item.id)}>
      <Image source={{ uri: item.image}} style={styles.contactImage} />
      <View style={styles.contactTextContainer}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactNumber}>{item.phonenum}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() =>makeCall(item.phonenum)} >
          <Icon name="md-call" size={30} color="#3498db" style={styles.icon} />
        </TouchableOpacity>
        {/* Add more icons as needed */}
      </View>
    </TouchableOpacity>
  );

  const handleCallContact = (recordId) => {
    // Add logic to initiate a call to the provided phone number
    console.log("\n data"+JSON.stringify(data.find(record => record.id === recordId)))
    navigation.navigate('DetailedContactScreen', { originalData: data.find(record => record.id === recordId) });
  };

  const makeCall = async (phoneNumber) => {
    // Communications.phonecall(phoneNumber, true);
    if (Platform.OS === 'android') {
      // For Android, check if there's an app that can handle the intent
      const canOpen = await Linking.canOpenURL(phoneNumber);
      if (canOpen) {
        Linking.openURL(phoneNumber);
      } else {
        // console.error('Cannot open phone app on this device');
        Communications.phonecall(phoneNumber, true);

      }
    } else {
      // For iOS and other platforms, simply try to open the URL
      Linking.openURL(phoneNumber);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderEmergencyContactCard}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateContactScreen')}
      >
        <Icon name="md-add" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ecf0f1',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 16,
    color: '#555',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 30,
  },
});

export default EmergencyContactsScreen;
