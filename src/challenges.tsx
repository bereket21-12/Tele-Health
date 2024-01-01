import { collection, query, getDocs, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { db } from './firebaseConfig';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { useAuth } from './AuthProvider';


const ChallengesScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [challenge, setChallenge] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchChallenges = async (searchText) => {
    try {
      const contactsCollection = collection(db, 'challenges');
      const contactsQuery = query(contactsCollection);
      const contactsSnapshot = await getDocs(contactsQuery);
      const contactsData = contactsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filteredChallenges = contactsData.filter((challenge) =>
        challenge.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setChallenge(filteredChallenges);
      console.log('Search results:', filteredChallenges);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  };

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const contactsCollection = collection(db, 'challenges');
        const contactsQuery = query(contactsCollection);
        const contactsSnapshot = await getDocs(contactsQuery);
        const contactsData = contactsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChallenge(contactsData);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchChallenges();
  }, []);

  const renderChallengeCard = ({ item }) => {
    const joined = item.participants.includes(user[0]?.id);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate('HealthChallengeDetailScreen', { challenge: item });
        }}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.Description}</Text>
          <Text style={styles.joined}>{joined ? 'Joined' : 'Not joined'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchcontainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={(text) => {
            setSearchText(text);
            fetchChallenges(text);
          }}
          value={searchText}
        />
        <Icon
          name="search"
          type="material"
          color="#555"
          onPress={() => fetchChallenges(searchText)}
        />
      </View>
      <FlatList
        data={challenge}
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
  joined: {
    fontSize: 14,
    color: 'red',
    alignSelf:"flex-end",
    marginTop:5
  },
  searchcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
});

export default ChallengesScreen;
  function firestore() {
    throw new Error('Function not implemented.');
  }

