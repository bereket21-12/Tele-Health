import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { db } from './firebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from './AuthProvider';
import Icone from 'react-native-vector-icons/FontAwesome5';


const UserProfileScreen =  ({navigation}) => {

  const [data, setData] = useState(null);
  const {user} =  useAuth()
  
  useEffect( () => {
     async function dataloader ()  {

      const docRef = doc(db, "user", "bereket21cc@outlook.com");
      const docSnap =  await getDoc(docRef);
      if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data());
      console.log(data);
     } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
     }
    }

    dataloader()

    
  }, []);

  const handleEditProfile = async () => {
    // Add navigation logic or other actions for editing the profile
    console.log('Edit profile pressed');
    navigation.navigate('EditProfile');

  };

  return (
    <ScrollView style={styles.container}>

            {/* Cover Image */}
            <ImageBackground source={{ uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGV1weBVr-auowy5lC9fBXMvk81UZ1qiPaNA&usqp=CAU' }} style={styles.coverImage}>
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: user[0].image }} style={styles.profileImage} />
          
        </View>

     
      </ImageBackground>
      <View style={styles.editButton}>

         <Text style={{fontSize:19}}>{user[0].name}</Text>
         <Icone onPress={handleEditProfile} style={{color:"blue"}} name="edit" size={20} color="#000" />
      </View>
         {/* <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity> */}
        <View style={styles.userInfoContainer}>
        <Text style={styles.userName}> {user[0].name}</Text>

        <View style = {styles.itemcard}>
        <Icon name="md-mail" size={30} color="#fff" style={styles.icon} /><Text style={{color:"#fff"}}>Email Address</Text>

        </View>
        <Text style={styles.bio}>{user[0].email }</Text>
        <View style = {styles.itemcard}>
        <Icon name="md-call" size={30} color="#fff" style={styles.icon} /><Text style={{color:"#fff"}}>UserName</Text>

        </View>
        <Text style={styles.bio}>{user[0].name}</Text>
        <View style = {styles.itemcard}>
        <Icon name="md-call" size={30} color="#fff" style={styles.icon} /><Text style={{color:"#fff"}}>Phone Number</Text>

        </View>
       
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    aspectRatio: 16 / 9, // You can adjust this ratio based on your design
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileImageContainer: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -75, // Half of the profile image size
    marginBottom: -75, // Half of the profile image size
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#fff',
  },
  icon: {
    marginLeft: 1,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#fff',
  },
  editButton: {
    padding: 12,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: '25%',
    fontSize:19,
    display:'flex',
    flexDirection:'row',
    gap:15
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  userInfoContainer: {
    alignContent:"center",
    alignItems:"stretch",
    padding: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: '#555',
  },
  itemcard:{
    display : 'flex',flexDirection:"row",
    backgroundColor:"#575f61", 
    alignItems:"center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  }
}

);
export default UserProfileScreen;
