import { Ionicons } from "@expo/vector-icons";
import { collection, query, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, View ,Image,Text,StyleSheet, FlatList} from "react-native";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { db } from "./firebaseConfig";

        
const TipList = ({navigation}) =>{

   
  const [challenge ,setchallenge] = useState(null)
  const [searchText, setSearchText] = useState('');

  const fetchChallenges = async (searchText) => {
    try {

      const filteredChallenges = challenge.filter(challenge =>
        challenge.title.toLowerCase().includes(searchText.toLowerCase())
      );

      setchallenge( ()=> filteredChallenges);
      console.log('Search results:', filteredChallenges);
  
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }

  };
  
  const handelRoute = (recordId) => {
     console.log("Cliked")
    navigation.navigate('detailResource', { originalData: challenge.find(record => record.id === recordId) });
  };
  


useEffect(()=>{

  async function loder() {

    const contactsCollection = collection(db, "health_resource");
    const contactsQuery =  query(contactsCollection);
    const contactsSnapshot = await getDocs(contactsQuery);
    const contactsData  =  contactsSnapshot.docs.map((doc) => ({
     id: doc.id,
     ...doc.data(),
   }));

   setchallenge( ()=> contactsData);
    
  }

  loder()

},[searchText.length == 0])

  const rendritem  = ({item}) =>(
    
      <TouchableOpacity style={styles.tipContainer}
      onPress={()=>handelRoute(item.id)}>
        <Image source={{uri : item.image}} style={styles.tipImage} />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{item.title}</Text>
          <Text style={styles.tipDescription}>{item.detail}</Text>
        </View>
        <Ionicons name="ios-arrow-forward" size={24} color="#3498db" style={styles.arrowIcon} />
      </TouchableOpacity>
   
  )


    return(
      <View>
      <View style={styles.searchcontainer}>
      <TextInput
        style={styles.input}
        placeholder='Search'
        onChangeText={(text) => {setSearchText(text) ,fetchChallenges(searchText) }}
        value={searchText}
  
      />
      <Icon
        name="search"
        type="material"
        color="#555"
        onPress={()=>fetchChallenges(searchText)}
      
      />
    </View>
      <FlatList
        data={challenge}
        keyExtractor={(item) => item.id}
        renderItem={rendritem}
      />

    </View>
    )

}


        
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding:5
    },
    header: {
      backgroundColor: '#f2f2f2',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    },
    content: {
      flex: 1,
      padding: 16,
    },
    tipContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2,
    },
    tipImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 16,
    },
    tipContent: {
      flex: 1,
    },
    tipTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    tipDescription: {
      color: '#555',
    },
    arrowIcon: {
      marginLeft: 8,
    }, searchcontainer: {
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

  export default TipList