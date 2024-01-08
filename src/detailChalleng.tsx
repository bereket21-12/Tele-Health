import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { collection, doc, updateDoc, arrayUnion, DocumentData, DocumentReference, arrayRemove, setDoc, getDocs, query } from 'firebase/firestore';
import { db } from './firebaseConfig';
import 'firebase/firestore'
import { useAuth } from './AuthProvider';
import * as Notifications from 'expo-notifications';


const HealthChallengeDetailScreen = ({ route, navigation }) => {
  const { challenge } = route.params;
  const {user} = useAuth()

  const paricipant = ()=>{

    navigation.navigate('Participants', { challenge:challenge });

  }

  const handleDelete = async () => {
    try {
      const challengesCollection = doc(db, 'challenges', challenge.id);
      await updateDoc(challengesCollection, {
        participants: arrayRemove(user.id),
      });
  
      const userCollection = doc(db, 'user', user.id); // Update to your users collection name
      await updateDoc(userCollection, {
        challenges: arrayRemove(challenge.id),
      });
  
      alert(`You have left ${challenge.title} successfully`);
      navigation.goBack();
    } catch (error) {
      console.error('Error handling deletion:', error);
    }
  };

  const sendNotification = async () => {
    try {
  
      const userres =query( collection(db, 'user'));
      const UsersSnapshot = await getDocs(userres);
      UsersSnapshot.forEach(async (userDoc) => {
        console.log("userDoc.data(); ",userDoc.data());
        if(userDoc.data().token){
          const { token } = userDoc.data();

        
          console.log("retoken ",token)

        try {
          console.log("token ",token);
          await Notifications.scheduleNotificationAsync({
            content: {
              to: token,
              title: "New user Joined Challenge",
              body: 'Check out new Member.',
              data: {
     
              },
              sound: "default",
            },
            trigger: { seconds: 2 },
          });
         
        } catch (error) {
          console.error("Error scheduling notification:", error);
        }
      }
      });
    } catch (error) {
      console.error("Error sending notifications to employees:", error);
    }
  };

 
  const  Handeljoin  = async () => { 

    
    
    const challengesCollection = doc(db, "challenges",challenge.id)
    updateDoc(challengesCollection ,{
     participants:arrayUnion(user.id)
    })
    const usercollection = doc(db, "user",user.id)
    updateDoc(usercollection ,{
      challenges:arrayUnion(challenge.id)
     })
    alert(`You have joined ${challenge.title} successfully`)


    try {
      const notificationRef = doc(collection(db, `notification`));

      await setDoc(notificationRef, {
        type: "Join",
        userid: user.id,
        challenge:challenge.title,
        user:user.name,
        time :new Date()
      });
      sendNotification()
    } catch (error) {

      console.error('Error Pushing notification to realtime database',error.message)
      
    }


   }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: challenge.image }} style={styles.challengeImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.challengeTitle}>{challenge.title}</Text>
        <Text style={styles.challengeDescription}>{challenge.Description}</Text>
        <Text style={styles.challengeStartDate}>Start Date: {challenge.Start_Date}</Text>
        <Text style={styles.challengeDuration}>End Date: {challenge.End_Date}</Text>
        {/* Additional Challenge Details */}
        <Text style={styles.challengeDetails}>Goals : {challenge.Goals}</Text>
      </View>
      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => { Handeljoin()  }}
      >
        <Text style={styles.joinButtonText}>Join Challenge</Text>
      </TouchableOpacity>
      <View style={styles.additionalFeatures}>
        {/* Additional Features Here */}
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => {
            handleDelete()
          }}
        >
          <Text style={styles.shareButtonText}>Leave Challenge</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewParticipantsButton}
          onPress={() => { paricipant() }}
        >
          <Text style={styles.viewParticipantsButtonText}>View Participants</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  challengeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
  },
  challengeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color:"blue",
    fontStyle:'italic'
  },
  challengeDescription: {
    fontSize: 16,
    marginBottom: 12,
  },
  challengeDuration: {
    fontSize: 14,
    marginBottom: 8,
    color:"red"
  },
  challengeStartDate: {
    fontSize: 14,
    marginBottom: 16,
    color:'green'
  },
  challengeDetails: {
    fontSize: 14,
    marginBottom: 16,
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  additionalFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  shareButton: {
    backgroundColor: '#3B5998',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewParticipantsButton: {
    backgroundColor: '#1DA1F2',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  viewParticipantsButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HealthChallengeDetailScreen;
function firebasestore() {
  throw new Error('Function not implemented.');
}

function Handeljoin() {
  throw new Error('Function not implemented.');
}

function where(arg0: string, arg1: string, arg2: string): import("@firebase/firestore").QueryCompositeFilterConstraint {
  throw new Error('Function not implemented.');
}

function deleteDoc(arg0: DocumentReference<DocumentData, DocumentData>) {
  throw new Error('Function not implemented.');
}

