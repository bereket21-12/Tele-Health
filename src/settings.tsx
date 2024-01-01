import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Card, Title, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from './AuthProvider';

const SettingsScreen = ({ navigation }) => {


    const { user, signOut } = useAuth(); 

    const handleLogout = async () => {
      try {
        await signOut(); // Perform sign-out
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };



  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Perform account deletion logic here
            // You might want to navigate to a different screen or log the user out
            // Example: navigation.navigate('Login');
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const renderCard = (title, iconName, color, screenName) => (
    <Card style={styles.card} onPress={() => (screenName === 'DeleteAccount' ? handleDeleteAccount() : navigateToScreen(screenName))}>
      <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name={iconName} size={24} color={color} style={styles.icon} />
        <Text style={{ marginLeft: 16, color: color }}>{title}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {renderCard('Profile', 'account-circle', '#3498db', 'UserProfileScreen')}
      {renderCard('Security', 'security', '#2ecc71', 'Security')}
      {renderCard('About Us', 'info', '#6417e8', 'AboutUsScreen')}
      {renderCard('Logout', 'logout', '#f39c12', 'Logout')}
      {renderCard('Delete Account', 'delete', '#e74c3c', 'DeleteAccount')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
  },
  icon: {
    marginRight: 16,
  },
});

export default SettingsScreen;
