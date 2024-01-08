import { collection, query, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { db } from './firebaseConfig';
import { useAuth } from './AuthProvider';

const HealthAppParticipants = ({ route, navigation }) => {

  const { challenge } = route.params
  const {user} = useAuth()


  const [member,setMember] = useState(null)

  useEffect(() => {
    const loader = async () => {
      try {
        const contactsCollection = collection(db, "user");
        const contactsQuery = query(contactsCollection);
        const contactsSnapshot = await getDocs(contactsQuery);
  
        if (contactsSnapshot.empty) {
          console.log('No documents found in the "user" collection.');
          return;
        }
  
        const contactsData = contactsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        console.log('Contacts Data:', contactsData);
  
        const filteredContacts =  contactsData.filter((contact) =>
          contact.challenges.includes(challenge.id)
        );
  
        console.log('\nFiltered Contacts:', filteredContacts);
  
        if (filteredContacts.length > 0) {
          
           setMember(filteredContacts);
        } else {
          console.log('No matching documents found for challenge ID:', challenge.id);
        }
      } catch (error) {
        console.error('Error loading contacts:', error);
      }
    };
  
    loader();
  }, [challenge.id, db,user.challenges]);
 

  const renderItem = ({ item }) => (
    <View style={styles.participantItem}>
      <Image source={{ uri: item.image }} style={styles.participantImage} />
      <View style={styles.participantInfo}>
        <Text style={styles.participantName}>{item.name}</Text>
        <Text style={styles.participantPhone}>{`Email: ${item.email}`}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Participants</Text>
      <FlatList
        data={member}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  participantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  participantPhone: {
    fontSize: 16,
    color: '#555',
  },
});

export default HealthAppParticipants;
