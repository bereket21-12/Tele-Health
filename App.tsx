import { StyleSheet, Text, View } from 'react-native';
import HealthTipsScreen from './src/healthtip';
import React, { useEffect } from 'react';
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
import HealthChallengeDetailScreen from './src/detailChalleng';
import CreateContactScreen from './src/create_contact';
import DetailedAppointmentScreen from './src/detailAppointment';
import { AuthProvider } from './src/AuthProvider';
import DetailedContactScreen from './src/detailedcontact';
import HealthAppParticipants from './src/participants';
import TipList from './src/resources';
import detailResource from './src/detailResource';
import CreateRecord from './src/createRec';
import MyAppointmentScreen from './src/myAppointment';
import SettingsScreen from './src/settings';
import AboutUsScreen from './src/us';
import * as Notifications from 'expo-notifications';

export default function App() {

  const Stack = createStackNavigator(); //screenOptions={{headerShown : false}}


  useEffect(()=>{async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.requestPermissionsAsync();
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Expo Push Token:', token);
      }
    } catch (error) {
      console.error('Error fetching Expo token:', error);
    }}
    registerForPushNotificationsAsync()
  },[]);
  

  return (
    <AuthProvider >
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage" >
        {/* <Stack.Screen name ="ChallengesScreen" component={ChallengesScreen}/> */}
        <Stack.Screen name="CreateContactScreen" component = {CreateContactScreen}/>
        <Stack.Screen name="HealthChallengeDetailScreen" component = {HealthChallengeDetailScreen}/>
        <Stack.Screen name="home" component={HomeScreen}/>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="UserRegistrationScreen" component={UserRegistrationScreen} />
        <Stack.Screen name="HealthTipsScreen" component={HealthTipsScreen} />
        <Stack.Screen name="HealthRecordScreen" component={HealthRecordScreen} />
        <Stack.Screen name ="EditHealthRecordScreen" component={EditHealthRecordScreen} />
        <Stack.Screen name="CreateHealthRecordScreen" component={CreateHealthRecordScreen} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
        <Stack.Screen name="DetailedAppointmentScreen" component={DetailedAppointmentScreen} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen}/>
        <Stack.Screen name="DetailedContactScreen" component={DetailedContactScreen}/>
        <Stack.Screen name="HealthAppParticipants" component={HealthAppParticipants}/>
        <Stack.Screen name='TipList' component={TipList}/>
        <Stack.Screen name='detailResource' component={detailResource}/>
        <Stack.Screen name='CreateRect' component={CreateRecord}/>
        <Stack.Screen name='MyAppointmentScreen' component={MyAppointmentScreen}/>
        <Stack.Screen name='SettingsScreen' component={SettingsScreen}/>
        <Stack.Screen name='AboutUsScreen' component={AboutUsScreen}/>
        <Stack.Screen name='ChallengesScreen' component={ChallengesScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>

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
