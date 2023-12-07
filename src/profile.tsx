import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from './firebaseConfig';

const UserProfileScreen =  () => {

  const [data, setData] = useState(null);
  useEffect( () => {
     async function dataloader ()  {

      const docRef = doc(db, "user", "berekettadele@gmail.com");
      const docSnap =  await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      console.log(data.name)
      setData(docSnap.data());
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


  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://placekitten.com/200/200' }} // Replace with your user's profile picture URL
          style={styles.profileImage}
        />
        <Text style={styles.username}>John Doe</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>{data.state}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>+1 (123) 456-7890</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Challenges Completed:</Text>
          <Text style={styles.detailValue}>25</Text>
        </View>
        {/* Add more details as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailValue: {
    flex: 2,
    fontSize: 16,
  },
});

export default UserProfileScreen;
