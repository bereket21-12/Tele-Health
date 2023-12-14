import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import { Card } from 'react-native-elements'; // Assuming you are using a UI library like react-native-elements
import { AntDesign, Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons';
const HomeScreen = ({ navigation }) => {
  // Dummy data for cards
  const cardsData = [
    { title: 'Appointments', route: 'Appointments' },
    { title: 'Wellness Challenges', route: 'WellnessChallenges' },
    { title: 'Health Tips', route: 'HealthTips' },
    { title: 'Appointments', route: 'Appointments' },
    { title: 'Wellness Challenges', route: 'WellnessChallenges' },
    { title: 'Health Tips', route: 'HealthTips' },
    { title: 'Appointments', route: 'Appointments' },
    { title: 'Wellness Challenges', route: 'WellnessChallenges' },
    { title: 'Health Tips', route: 'HealthTips' },
    { title: 'Appointments', route: 'Appointments' },
    { title: 'Wellness Challenges', route: 'WellnessChallenges' },
    { title: 'Health Tips', route: 'HealthTips' },
  ];

  return (

              <ScrollView
           
      
          >
 
    <View style={styles.container}>
      {/* Background image with border radius */}
      <ImageBackground
        source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.KFB0WSDqeuQwmA_h6gs78gHaDP%26pid%3DApi&f=1&ipt=df89d331c60cf0feb9d3837de657f12f0159e38d35fdb3e9270cb1620d290ab9&ipo=images' }} // Replace with your actual image URL
        style={styles.backgroundImage}
    >
        <View style={styles.overlay}>
                  <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>

            <Image
              source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.mkeL8Hod34Zi264DK6zssQHaEK%26pid%3DApi&f=1&ipt=3f86505c3c01338836964a8f2f192aede9b81f2fd1676f09ffe2bb7ab21d49b1&ipo=images' }} // Replace with your actual image URL
              style={styles.profilePicture}
            />
       </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings" color={'white'} size={30} />
            </TouchableOpacity>
          </View>

           
        <View style = {styles.welcome}>
          <Text style={styles.welcomeText}>Hi Bereket!</Text>
          <Text style={styles.welcomeText}>Welcome to Your Health App</Text>
          <Text style={styles.welcomeText}>Welcome to Your Health App</Text>
       </View>
          <ScrollView
           horizontal
      showsHorizontalScrollIndicator={false} 
          style={styles.cardsContainer}>
            {cardsData.map((card, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => navigation.navigate(card.route)}
              >
            <Image
              source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.mkeL8Hod34Zi264DK6zssQHaEK%26pid%3DApi&f=1&ipt=3f86505c3c01338836964a8f2f192aede9b81f2fd1676f09ffe2bb7ab21d49b1&ipo=images' }} // Replace with your actual image URL
              style={styles.card}
            />
            <Text>Addtional Infromatin about the app</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style = {styles.bottom} >
           <Text style = {styles.story}>Your Stories</Text>
           <Text>Challenge Completed</Text>
            <Image
              source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.mkeL8Hod34Zi264DK6zssQHaEK%26pid%3DApi&f=1&ipt=3f86505c3c01338836964a8f2f192aede9b81f2fd1676f09ffe2bb7ab21d49b1&ipo=images' }} // Replace with your actual image URL
              style={styles.card}
            />
           <Text>Addtional Infromatin about the app</Text>
           <Text>Addtional Infromatin about the app</Text>
             <Image
              source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.KFB0WSDqeuQwmA_h6gs78gHaDP%26pid%3DApi&f=1&ipt=df89d331c60cf0feb9d3837de657f12f0159e38d35fdb3e9270cb1620d290ab9&ipo=images' }} // Replace with your actual image URL
              style={styles.card}
            />
           <Text>Addtional Infromatin about the app</Text>
           <Text>Addtional Infromatin about the app</Text>
           <Text>Addtional Infromatin about the app</Text>
           <Text>Addtional Infromatin about the app</Text>
           <Text>Addtional Infromatin about the app</Text>
           <Text>Addtional Infromatin about the app</Text>
           <Text>Addtional Infromatin about the app</Text>

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
  },
  welcomeText: {
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
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 25,
    
  },
  settingsIcon: {
    width: 40,
    height: 40,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#F1EFEF',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    width:400  ,
    flex:3,
    
  },
  card: {
    flex: 1,
    marginHorizontal: 8,
    paddingTop:100,
    paddingHorizontal:0
  },
    bottom:{
    paddingTop:'15%',
    alignItems:'center',
    backgroundColor:'#F1EFEF',
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
  }
});

export default HomeScreen;
