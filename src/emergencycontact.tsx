import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const emergencyContacts = [
  {
    id: '1',
    name: 'Emergency Contact 1',
    number: '+123456789',
    image: 'https://placekitten.com/100/100', // Replace with actual contact image URL
  },
  {
    id: '2',
    name: 'Emergency Contact 2',
    number: '+987654321',
    image: 'https://placekitten.com/101/100', // Replace with actual contact image URL
  },
    {
    id: '2',
    name: 'Emergency Contact 2',
    number: '+987654321',
    image: 'https://placekitten.com/101/100', // Replace with actual contact image URL
  },
    {
    id: '2',
    name: 'Emergency Contact 2',
    number: '+987654321',
    image: 'https://placekitten.com/101/100', // Replace with actual contact image URL
  },
    {
    id: '2',
    name: 'Emergency Contact 2',
    number: '+987654321',
    image: 'https://placekitten.com/101/100', // Replace with actual contact image URL
  },
    {
    id: '2',
    name: 'Emergency Contact 2',
    number: '+987654321',
    image: 'https://placekitten.com/101/100', // Replace with actual contact image URL
  },
    {
    id: '2',
    name: 'Emergency Contact 2',
    number: '+987654321',
    image: 'https://placekitten.com/101/100', // Replace with actual contact image URL
  },
    {
    id: '2',
    name: 'Emergency Contact 2',
    number: '+987654321',
    image: 'https://placekitten.com/101/100', // Replace with actual contact image URL
  },
    {
    id: '2',
    name: 'Emergency Contact 2',
    number: '+987654321',
    image: 'https://placekitten.com/101/100', // Replace with actual contact image URL
  },
    {
    id: '2',
    name: 'Emergency Contact 2',
    number: '+987654321',
    image: 'https://placekitten.com/101/100', // Replace with actual contact image URL
  },
    {
    id: '2',
    name: 'Emergency Contact 2',
    number: '+987654321',
    image: 'https://placekitten.com/101/100', // Replace with actual contact image URL
  },
  // Add more emergency contacts as needed
];

const EmergencyContactsScreen = ({ navigation }) => {
  const renderEmergencyContactCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.contactImage} />
      <View style={styles.contactTextContainer}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactNumber}>{item.number}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => handleCallContact(item.number)}>
          <Icon name="md-call" size={30} color="#3498db" style={styles.icon} />
        </TouchableOpacity>
        {/* Add more icons as needed */}
      </View>
    </TouchableOpacity>
  );

  const handleCallContact = (phoneNumber) => {
    // Add logic to initiate a call to the provided phone number
    console.log(`Calling ${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={emergencyContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderEmergencyContactCard}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEmergencyContact')}
      >
        <Icon name="md-add" size={40} color="#fff" />
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
