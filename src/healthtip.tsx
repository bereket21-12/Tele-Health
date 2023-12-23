import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';
import AppointmentScreen from './appointment';
import Login from './login';
import NotificationScreen from './notification';
import UserProfileScreen from './profile';
import ChallengesScreen from './challenges';
import HomeScreen from './home';
import EmergencyContactsScreen from './emergencycontact';

const Tab = createBottomTabNavigator();
        
const HealthTipsScreen = ({ route }) => {

  const navigation = useNavigation();

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    navigation.setOptions({ title: routeName });
  }, [navigation, route]);


  const tipsData = [
                {
                  id: 1,
                  title: 'Eat a Balanced Diet',
                  description: 'Include a variety of fruits, vegetables, lean proteins, and whole grains in your meals.',
                  imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.8h31oE7dYVGsYxq3XEBspgHaHa%26pid%3DApi&f=1&ipt=dd6fa916e586e7dab38c96d8dfe089b1a59277ec6647b7808c23ea43b34933cb&ipo=images',
                },
                {
                    id: 2,
                    title: 'Eat a Balanced Diet',
                    description: 'Include a variety of fruits, vegetables, lean proteins, and whole grains in your meals.',
                    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.8h31oE7dYVGsYxq3XEBspgHaHa%26pid%3DApi&f=1&ipt=dd6fa916e586e7dab38c96d8dfe089b1a59277ec6647b7808c23ea43b34933cb&ipo=images',
                  },
                  {
                    id: 3,
                    title: 'Eat a Balanced Diet',
                    description: 'Include a variety of fruits, vegetables, lean proteins, and whole grains in your meals.',
                    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.8h31oE7dYVGsYxq3XEBspgHaHa%26pid%3DApi&f=1&ipt=dd6fa916e586e7dab38c96d8dfe089b1a59277ec6647b7808c23ea43b34933cb&ipo=images',
                  },
                  {
                    id: 4,
                    title: 'Eat a Balanced Diet',
                    description: 'Include a variety of fruits, vegetables, lean proteins, and whole grains in your meals.',
                    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.8h31oE7dYVGsYxq3XEBspgHaHa%26pid%3DApi&f=1&ipt=dd6fa916e586e7dab38c96d8dfe089b1a59277ec6647b7808c23ea43b34933cb&ipo=images',
                  },
                  {
                    id: 5,
                    title: 'Eat a Balanced Diet',
                    description: 'Include a variety of fruits, vegetables, lean proteins, and whole grains in your meals.',
                    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.8h31oE7dYVGsYxq3XEBspgHaHa%26pid%3DApi&f=1&ipt=dd6fa916e586e7dab38c96d8dfe089b1a59277ec6647b7808c23ea43b34933cb&ipo=images',
                  },
                  {
                    id: 6,
                    title: 'Eat a Balanced Diet',
                    description: 'Include a variety of fruits, vegetables, lean proteins, and whole grains in your meals.',
                    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.8h31oE7dYVGsYxq3XEBspgHaHa%26pid%3DApi&f=1&ipt=dd6fa916e586e7dab38c96d8dfe089b1a59277ec6647b7808c23ea43b34933cb&ipo=images',
                  },
                  {
                    id: 7,
                    title: 'Eat a Balanced Diet',
                    description: 'Include a variety of fruits, vegetables, lean proteins, and whole grains in your meals.',
                    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.8h31oE7dYVGsYxq3XEBspgHaHa%26pid%3DApi&f=1&ipt=dd6fa916e586e7dab38c96d8dfe089b1a59277ec6647b7808c23ea43b34933cb&ipo=images',
                  },
                // Add more tip data as needed
              ];
        
          // const TipList = () => (
          //   <ScrollView style={styles.content}>
          //     {tipsData.map((tip) => (
          //       <TouchableOpacity key={tip.id} style={styles.tipContainer}>
          //         <Image source={{uri : tip.imageUrl}} style={styles.tipImage} />
          //         <View style={styles.tipContent}>
          //           <Text style={styles.tipTitle}>{tip.title}</Text>
          //           <Text style={styles.tipDescription}>{tip.description}</Text>
          //         </View>
          //         <Ionicons name="ios-arrow-forward" size={24} color="#3498db" style={styles.arrowIcon} />
          //       </TouchableOpacity>
          //     ))}
          //   </ScrollView>
          // );
        
          return (
            <View style={styles.container}>
           
                <Tab.Navigator screenOptions={{headerShown : false}}
      
                >
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
                    name="ChallengesScreen"
                    component={ChallengesScreen}
                    options={{
                    tabBarLabel: 'ChallengesScreen',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-notifications" color={color} size={size} />
                    ),
                    }}
      />
    
                <Tab.Screen
                    name="Appointment"
                    component={AppointmentScreen}
                    options={{
                    tabBarLabel: 'Appointment',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-notifications" color={color} size={size} />
                    ),
                    }}
      />


       <Tab.Screen
                    name="EmergencyContactsScreen"
                    component={EmergencyContactsScreen}
                    options={{
                   
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-menu" color={color} size={size} />
                    ),
                    }}
      />
                  {/* Add more tabs as needed */}
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
        