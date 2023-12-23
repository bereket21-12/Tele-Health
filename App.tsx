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
import HealthChallengeDetailScreen from './src/detailChalleng';
import CreateContactScreen from './src/create_contact';
import DetailedAppointmentScreen from './src/detailAppointment';
import { AuthProvider } from './src/AuthProvider';
import DetailedContactScreen from './src/detailedcontact';
import HealthAppParticipants from './src/participants';
export default function App() {

  const Stack = createStackNavigator(); //screenOptions={{headerShown : false}}
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
        <Stack.Screen name="HealthTipsScreen" component={HealthTipsScreen}  options={{ title: 'Health App' }}  />
        <Stack.Screen name="HealthRecordScreen" component={HealthRecordScreen} />
        <Stack.Screen name ="EditHealthRecordScreen" component={EditHealthRecordScreen} />
        <Stack.Screen name="CreateHealthRecordScreen" component={CreateHealthRecordScreen} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
        <Stack.Screen name="DetailedAppointmentScreen" component={DetailedAppointmentScreen} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen}/>
        <Stack.Screen name="DetailedContactScreen" component={DetailedContactScreen}/>
        <Stack.Screen name="HealthAppParticipants" component={HealthAppParticipants}/>

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
