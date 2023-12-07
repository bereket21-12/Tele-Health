import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const notifications = [
  { id: '1', title: 'New Measurement', message: 'You have a new weight measurement.' },
  { id: '2', title: 'Reminder', message: 'Don\'t forget to take your medication.' },
  { id: '3', title: 'Reminder', message: 'Don\'t forget to take your medication.' },
  { id: '4', title: 'Reminder', message: 'Don\'t forget to take your medication.' },
  { id: '5', title: 'Reminder', message: 'Don\'t forget to take your medication.' },
  { id: '6', title: 'Reminder', message: 'Don\'t forget to take your medication.' },
  { id: '7', title: 'Reminder', message: 'Don\'t forget to take your medication.' },
  { id: '8', title: 'Reminder', message: 'Don\'t forget to take your medication.' },
  { id: '9', title: 'Reminder', message: 'Don\'t forget to take your medication.' },
  { id: '10', title: 'Reminder', message: 'Don\'t forget to take your medication.' },

  // Add more dummy data as needed
];

const NotificationScreen = () => {
  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Icon name="notifications" size={30} color="#007bff" />
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
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
