import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const challenges = [
  {
    id: '1',
    title: '30-Day Yoga Challenge',
    description: 'Improve flexibility and mindfulness with daily yoga sessions.',
    image: 'https://placekitten.com/300/200', // Replace with actual challenge image URL
  },
  {
    id: '2',
    title: 'Run 5K Every Day',
    description: 'Boost your cardiovascular health by running a 5K every day.',
    image: 'https://placekitten.com/300/201', // Replace with actual challenge image URL
  },
  // Add more challenges as needed
];

const ChallengesScreen = ({ navigation }) => {
  const renderChallengeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ChallengeDetails', { challenge: item })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={renderChallengeCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
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

export default ChallengesScreen;
