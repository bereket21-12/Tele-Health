import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute, useNavigation} from '@react-navigation/native';
import AppointmentScreen from './appointment';
import NotificationScreen from './notification';
import HomeScreen from './home';
import EmergencyContactsScreen from './emergencycontact';

const Tab = createBottomTabNavigator();
        
const HealthTipsScreen = ({ route }) => {

  const navigation = useNavigation();
  

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    navigation.setOptions({ title: routeName });
  }, [navigation, route]);

 return (
            <View style={styles.container}>
           
                <Tab.Navigator screenOptions={{headerShown : false} }>
            <Tab.Screen 
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarLabel: 'Home',
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ios-home" color={color} size={size} />
                  ),
                }}
              
        />

    
                <Tab.Screen
                    name="Notification"
                    component={NotificationScreen}
                    options={{
                    tabBarLabel: 'Notification',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-notifications" color={color} size={size} />
                    ),
                    }}
      />
    
                <Tab.Screen
                    name="Doctors"
                    component={AppointmentScreen}
                    options={{
                    tabBarLabel: 'Appointment',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-calendar" color={color} size={size} />
                    ),
                    }}
      />


       <Tab.Screen
                    name="Contacts" //contact list
                    component={EmergencyContactsScreen}
                    options={{
                   
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-person" color={color} size={size} />
                    ),
                    }}
      />
                
                </Tab.Navigator>
             
            </View>
      );
};
        
  const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fff',
  },
  header: {
  backgroundColor: '#f2f2f2',
  padding: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
  },
  title: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#333',
  },
  content: {
  flex: 1,
  padding: 16,
  },
  tipContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
  backgroundColor: '#fff',
  borderRadius: 8,
  padding: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  elevation: 2,
  },
  tipImage: {
  width: 80,
  height: 80,
  borderRadius: 8,
  marginRight: 16,
  },
  tipContent: {
  flex: 1,
  },
  tipTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 8,
  },
  tipDescription: {
  color: '#555',
  },
  arrowIcon: {
  marginLeft: 8,
  },
  });

export default HealthTipsScreen;
        