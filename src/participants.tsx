import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const HealthAppParticipants = ({ route, navigation }) => {

  const { originalData } = route.params


  const[member ,setmember] = useState(originalData)
  const [participants, setParticipants] = useState([]);
  
  // useEffect(() => {
  //   // Fetch or load the participants data here
  //   // For demonstration purposes, using dummy data
  //   const dummyData = [
  //     { id: '1', name: 'John Doe', phone: '123-456-7890', imageUrl: 'https://example.com/john.jpg' },
  //     { id: '2', name: 'Jane Doe', phone: '987-654-3210', imageUrl: 'https://example.com/jane.jpg' },
  //     // Add more participants as needed
  //   ];

  //   setParticipants(dummyData);
  // }, []);

  const renderItem = ({ item }) => (
    <View style={styles.participantItem}>
      <Image source={{ uri: item.image }} style={styles.participantImage} />
      <View style={styles.participantInfo}>
        <Text style={styles.participantName}>{item.name}</Text>
        <Text style={styles.participantPhone}>{`Phone: ${item.email}`}</Text>
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
