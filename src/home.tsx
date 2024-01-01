import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import { Card } from 'react-native-elements'; // Assuming you are using a UI library like react-native-elements
import { AntDesign, Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons';
import { useAuth } from './AuthProvider';
const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    // Dynamically set the title
    navigation.setOptions({
      title: 'Home',
    });
  }, [navigation]);

  const { user } = useAuth();

  // Dummy data for cards
  const cardsData = [
    { title: 'Health Record', route: 'HealthRecordScreen', src: require('../assets/health_rec.png') },
    { title: 'Challenges', route: 'ChallengesScreen', src: require('../assets/challenges.jpg') },
    { title: 'Health Resources', route: 'TipList', src: require('../assets/healthtips.jpg') },
    { title: 'My Appointment', route: 'MyAppointmentScreen', src: require('../assets/appointment.jpg') },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
      <ImageBackground
      source={require('../assets/heart.jpg')}
      style={styles.backgroundImage}
    >
          <View style={styles.overlay}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen')}>
                <Image source={{ uri: user[0].image }} style={styles.profilePicture} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="settings" color={'white'} size={30} onPress={() => navigation.navigate('SettingsScreen')} />
              </TouchableOpacity>
            </View>

            <View style={styles.welcome}>
              <Text style={styles.welcomeText1}>Hi {user ? `${user[0].name}` : `Bereket`}</Text>
              <Text style={styles.welcomeText}>Welcome to Campus Health </Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsContainer}>
              {cardsData.map((card, index) => (
                <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate(card.route)}>
                  <Image source={card.src} style={styles.cardPicture} />
                  <Text style={styles.title}>{card.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.bottom}>
              <Text style={styles.story}>Your Stories</Text>
              <Text>Challenge Completed</Text>
              <Image source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.mkeL8Hod34Zi264DK6zssQHaEK%26pid%3DApi&f=1&ipt=3f86505c3c01338836964a8f2f192aede9b81f2fd1676f09ffe2bb7ab21d49b1&ipo=images' }} style={styles.cardPicture} />
              <Text>Addtional Information about the app</Text>
              <Text>Addtional Information about the app</Text>
              <Image source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.KFB0WSDqeuQwmA_h6gs78gHaDP%26pid%3DApi&f=1&ipt=df89d331c60cf0feb9d3837de657f12f0159e38d35fdb3e9270cb1620d290ab9&ipo=images' }} style={styles.cardPicture} />
              <Text>Addtional Information about the app</Text>
              <Text>Addtional Information about the app</Text>
              <Text>Addtional Information about the app</Text>
              <Text>Addtional Information about the app</Text>
              <Text>Addtional Information about the app</Text>
              <Text>Addtional Information about the app</Text>
              <Text>Addtional Information about the app</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 23,
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent overlay
    padding: 1,
    width:'100%'
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    paddingBottom:23
  },
  welcomeText1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap:15,
    marginBottom: 16,
    marginRight:16
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 25,

  },
    cardPicture: {
    flex: 1,
    marginHorizontal: 8,
    paddingTop:100,
    paddingHorizontal:0,
    height : "90%",
    width: "100%",
     borderRadius: 9,

  },
  cardsContainer: {
    flexDirection: 'row',
    width:'100%',
   
    backgroundColor:'#dcf1f2',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  
    flex:3,
    
  },
  card: {
    flex: 1,
    marginHorizontal: 8,
    paddingTop:100,
    paddingHorizontal:0,
    height : "90%",
    width: 150,
     borderRadius: 9,
    
  },
    bottom:{
    paddingTop:'15%',
    alignItems:'center',
    backgroundColor:'#dcf1f2',
    padding :10
  },
  story : {
    fontWeight:"bold",
    fontSize:23,
    alignSelf:"flex-start",
    paddingLeft:23,
    fontStyle : "italic"

  },
  welcome:{
    padding : 10,
    alignItems:"center"
  },
  title:{
     marginHorizontal: 8,
    paddingHorizontal:0,
    fontSize : 18,
    
  }
});

export default HomeScreen;
