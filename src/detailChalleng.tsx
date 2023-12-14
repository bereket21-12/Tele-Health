import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const HealthChallengeDetailScreen = ({ route, navigation }) => {
  const { challenge } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: challenge.image }} style={styles.challengeImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.challengeTitle}>{challenge.title}</Text>
        <Text style={styles.challengeDescription}>{challenge.description}</Text>
        <Text style={styles.challengeDuration}>Duration: {challenge.duration}</Text>
        <Text style={styles.challengeStartDate}>Start Date: {challenge.startDate}</Text>
        {/* Additional Challenge Details */}
        <Text style={styles.challengeDetails}>Additional Details: {challenge.details}</Text>
      </View>
      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => {
          // Implement navigation to join the challenge or perform other actions
          navigation.navigate('JoinChallenge', { challengeId: challenge.id });
        }}
      >
        <Text style={styles.joinButtonText}>Join Challenge</Text>
      </TouchableOpacity>
      <View style={styles.additionalFeatures}>
        {/* Additional Features Here */}
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => {
            // Implement functionality to share the challenge
            // You can use a Share API or a custom implementation
          }}
        >
          <Text style={styles.shareButtonText}>Share Challenge</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewParticipantsButton}
          onPress={() => {
            // Implement functionality to view participants
            // You can navigate to a screen displaying the list of participants
          }}
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
  },
  challengeDescription: {
    fontSize: 16,
    marginBottom: 12,
  },
  challengeDuration: {
    fontSize: 14,
    marginBottom: 8,
  },
  challengeStartDate: {
    fontSize: 14,
    marginBottom: 16,
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
