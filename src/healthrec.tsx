import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const HealthRecordScreen = ({ navigation }) => {


  const healthRecords = [
    {
      id: '1',
      date: '2023-01-01',
      weight: '68 kg',
      bloodPressure: '120/80 mmHg',
      steps: '8,000',
    },
    {
      id: '2',
      date: '2023-01-05',
      weight: '70 kg',
      bloodPressure: '122/82 mmHg',
      steps: '10,000',
    },
    {
      id: '3',
      date: '2023-01-10',
      weight: '67 kg',
      bloodPressure: '118/78 mmHg',
      steps: '7,000',
    },
    // Add more health records as needed
  ];
  const [data , sethealthRecords] = useState(healthRecords)

// const navigation2 = useNavigation();

    const handeledit = (recordId) => {
      navigation.navigate('EditHealthRecordScreen', { originalData: data.find(record => record.id === recordId) });
    };
    
    const handelcreate = () => {
      console.log("create clicked")
      navigation.navigate('CreateHealthRecordScreen');
      
    };

   const renderHealthRecordCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handeledit(item.id)}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardDate}>{item.date}</Text>
        <Icon name="edit" size={20} color="#fff" />
      </View>
      <View style={styles.recordContainer}>
        <View style={styles.recordItem}>
          <Text style={styles.recordLabel}>Weight:</Text>
          <Text style={styles.recordValue}>{item.weight}</Text>
        </View>
        <View style={styles.recordItem}>
          <Text style={styles.recordLabel}>Blood Pressure:</Text>
          <Text style={styles.recordValue}>{item.bloodPressure}</Text>
        </View>
        <View style={styles.recordItem}>
          <Text style={styles.recordLabel}>Steps:</Text>
          <Text style={styles.recordValue}>{item.steps}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {data.map((record) => (
        <React.Fragment key={record.id}>
          {renderHealthRecordCard({ item: record })}
        </React.Fragment>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={() => handelcreate}>
        <Icon name="plus" size={30} color="#3498db" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardDate: {
    fontSize: 16,
    color: '#fff',
  },
  recordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recordItem: {
    flex: 1,
    marginHorizontal: 8,
  },
  recordLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  recordValue: {
    fontSize: 14,
    color: '#fff',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
  },
});

export default HealthRecordScreen;
