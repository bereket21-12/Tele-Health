import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from './AuthProvider';
import fetchUserChallenges from './myChallenges';
const HomeScreen = ({ navigation }) => {

  const{user} = useAuth();
  const [challenge,setUserChallenges] = useState(null)

  const fetch = async () => {
    try {
      const userChallenges = await fetchUserChallenges(user.id);
     
      setUserChallenges(()=>userChallenges);
 
    } catch (error) {
     
    }
  };
  


  useEffect(() => {
   
    navigation.setOptions({
      title: 'Home',
    });
    fetch()

  }, [challenge]);


  const cardsData = [
    { title: 'Health Record', route: 'My Record', src: require('../assets/health_rec.png') },
    { title: 'Challenges', route: 'Challenges', src: require('../assets/challenges.jpg') },
    { title: 'Health Resources', route: 'Health Tips', src: require('../assets/healthtips.jpg') },
    { title: 'My Appointment', route: 'My Appointment', src: require('../assets/appointment.jpg') },
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
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image source={{ uri: user?.image }} style={styles.profilePicture} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="settings" color={'white'} size={30} onPress={() => navigation.navigate('SettingsScreen')} />
              </TouchableOpacity>
            </View>

            <View style={styles.welcome}>
              <Text style={styles.welcomeText1}>Hi {user ? `${user?.name}` : `Bereket`}</Text>
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
              <Text>Joined Challenge</Text>
      
              {challenge && challenge.length > 0 && (
        challenge.map((challenge, index) => (
          
            <TouchableOpacity
              key={index} // Make sure to include a unique key for each challenge
              style={styles.challenges}
              onPress={() => {
                navigation.navigate('More', { challenge });
              }}
            >
              <Image source={{ uri: challenge.image }} style={[styles.cardImage, styles.cardPicture]} />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{challenge.title}</Text>
                <Text style={styles.cardDescription}>{challenge.Description}</Text>
              </View>
            </TouchableOpacity>
        ))
      )}
 

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
  challenges: {
    flex: 1,
    marginHorizontal: 3,
    paddingTop:10,
    height : 350,
    width: '100%',
     borderRadius: 9,
     paddingEnd:23
    
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
    alignSelf:"center",
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
    
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardTextContainer: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default HomeScreen;
