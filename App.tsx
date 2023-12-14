import { StyleSheet, Text, View } from 'react-native';
import HealthTipsScreen from './src/healthtip';
import React from 'react';
import Login from './src/login';
import UserProfileScreen from './src/profile';
import ChallengesScreen from './src/challenges';
import HealthRecordScreen from './src/healthrec';
import EmergencyContactsScreen from './src/emergencycontact';
import UserRegistrationScreen from './src/registation';
import NotificationScreen from './src/notification';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/home';
import LoginPage from './src/lg';
import EditHealthRecordScreen from './src/edithealthrec';
import CreateHealthRecordScreen from './src/createHealthre';

export default function App() {

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="home" component={HomeScreen}/>
        <Stack.Screen name="login" component={LoginPage} />
        <Stack.Screen name="Registration" component={UserRegistrationScreen} />
        <Stack.Screen name="HealthTipsScreen" component={HealthTipsScreen} />
        <Stack.Screen name="HealthRecordScreen" component={HealthRecordScreen} />
        <Stack.Screen name ="EditHealthRecordScreen" component={EditHealthRecordScreen} />
        <Stack.Screen name="CreateHealthRecordScreen" component={CreateHealthRecordScreen} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
