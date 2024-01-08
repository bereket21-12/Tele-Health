import { collection, query, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from './firebaseConfig'

const NotificationScreen = () => {

  const [challenge ,setchallenge] = useState(null)


  useEffect(()=>{

    async function loder() {
  
      const contactsCollection = collection(db, "notification");
      const contactsQuery =  query(contactsCollection);
      const contactsSnapshot = await getDocs(contactsQuery);

      const contactsData  =  contactsSnapshot.docs.map((doc) => ({
       id: doc.id,
       ...doc.data(),
     }));
     
     setchallenge( ()=> contactsData);
      
    }
  
    loder()
  
  },[challenge])

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Icon name="trophy" size={30} color="#007bff" />
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationTitle}>{item.user}</Text>
        <Text style={styles.notificationMessage}>{"Join "+item.challenge +" At "+item.time.toDate().toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={challenge}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 12,
  },
  notificationTextContainer: {
    marginLeft: 16,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#555',
  },
};

export default NotificationScreen;
