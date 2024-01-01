import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const HealthScreen = ({ route, navigation }) => {
  const { originalData } = route.params
  return (
    <ScrollView style={styles.container}>
      <View style={styles.bannerContainer}>
      <Image
          source={{
            uri: originalData?.image,
          }}
          style={styles.bannerImage}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
          style={styles.gradientOverlay}
        />
      </View>

      {/* Text Overlay */}
      <View style = {styles.itemcard}>
       <Text style={styles.detailText}>Detail: </Text>
       <Text style={styles.detailText}>{originalData?.detail}</Text>

        </View>
        <View style = {styles.itemcard}>
       <Text style={styles.detailText}>Goal: </Text>
       <Text style={styles.detailText}>{originalData?.goals}</Text>

        </View>
        <View style = {styles.itemcard}>
       <Text style={styles.detailText}>Benefits: </Text>
       <Text style={styles.detailText}>{originalData?.benefits}</Text>

        </View>
        <View style = {styles.itemcard}>
       <Text style={styles.detailText}>Importance: </Text>
       <Text style={styles.detailText}>{originalData?.importance}</Text>

        </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    width:'100%'
  },
  bannerImage: {
    width: '100%',
    height: 400,
  },
  textOverlay: {
    position: 'absolute',
    top: '10%',
    left: '20%',
    backgroundColor: 'transparent',
  },
  overlayText: {
    color: '#fff',
    fontSize: 21,
    fontStyle: 'italic',
  },
  detailedInfoContainer: {
    marginTop:'-40%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#abbadb',
    flex:1,
    paddingTop:'10%',
    alignItems:'center'
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  itemcard:{
    display : 'flex',
    flexDirection:"column",
    backgroundColor:"#fff", 
    alignItems:"center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
    marginBottom:12,
    padding:13,
  
  }
});

export default HealthScreen;
