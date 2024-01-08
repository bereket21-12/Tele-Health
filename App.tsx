import { StyleSheet, Text, View } from 'react-native';
import HealthTipsScreen from './src/healthtip';
import React, { useEffect } from 'react';
import Login from './src/login';
import UserProfileScreen from './src/profile';
import ChallengesScreen from './src/challenges';
import HealthRecordScreen from './src/healthrec';
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
import EditProfile from './src/editProfile';
import ChangePassword from './src/changePassword';
import ForgotPassword from './src/forgotPassword';


export default function App() {

  const Stack = createStackNavigator(); 


  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  
  
  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage" >
        <Stack.Screen name="New Contact" component = {CreateContactScreen}/>
        <Stack.Screen name="More" component = {HealthChallengeDetailScreen}/>
        <Stack.Screen name="home" component={HomeScreen} options={{headerShown : false}}/>
        <Stack.Screen name="LoginPage" component={LoginPage}  options={{headerShown : false}}/>
        <Stack.Screen name="New Account" component={UserRegistrationScreen} />
        <Stack.Screen name="HealthTipsScreen" component={HealthTipsScreen} />
        <Stack.Screen name="My Record" component={HealthRecordScreen} />
        <Stack.Screen name ="EditHealthRecordScreen" component={EditHealthRecordScreen} />
        <Stack.Screen name="CreateHealthRecordScreen" component={CreateHealthRecordScreen} />
        <Stack.Screen name="Profile" component={UserProfileScreen} />
        <Stack.Screen name="DetailedAppointmentScreen" component={DetailedAppointmentScreen} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen}/>
        <Stack.Screen name="Edit Contact" component={DetailedContactScreen}/>
        <Stack.Screen name="Participants" component={HealthAppParticipants}/>
        <Stack.Screen name='Health Tips' component={TipList}  />
        <Stack.Screen name='detailResource' component={detailResource}/>
        <Stack.Screen name='New Record' component={CreateRecord}/>
        <Stack.Screen name='My Appointment' component={MyAppointmentScreen}/>
        <Stack.Screen name='Settings' component={SettingsScreen}/>
        <Stack.Screen name='AboutUsScreen' component={AboutUsScreen}/>
        <Stack.Screen name='Challenges' component={ChallengesScreen}/>
        <Stack.Screen name='EditProfile' component={EditProfile}/>
        <Stack.Screen name='Change Password' component={ChangePassword}/>
        <Stack.Screen name='Forgot Password' component={ForgotPassword}/>
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


