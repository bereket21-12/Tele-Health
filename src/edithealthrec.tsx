import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

const EditHealthRecordScreen = ({ route, navigation }) => {
  const { originalData } = route.params; // Pass the original data from the health record screen

  const [editedData, setEditedData] = useState({
    date: originalData.date,
    weight: originalData.weight.toString(),
    bloodPressure: originalData.bloodPressure,
    steps: originalData.steps.toString(),
  });

  const handleSaveChanges = () => {
    // Implement logic to save the edited data
    console.log('Saving changes:', editedData);
    // Add your logic here to save the edited data (e.g., update database, state, etc.)
    // After saving, you may navigate back to the health record screen or perform other actions.
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Edit Health Record</Text>

        <Text style={styles.label}>Date:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter date"
          keyboardType="numeric"
          value={editedData.date}
          onChangeText={(text) => setEditedData({ ...editedData, date: text })}
        />

        <Text style={styles.label}>Weight (kg):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter weight"
          keyboardType="numeric"
          value={editedData.weight}
          onChangeText={(text) => setEditedData({ ...editedData, weight: text })}
        />

        <Text style={styles.label}>Blood Pressure:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter blood pressure"
          value={editedData.bloodPressure}
          onChangeText={(text) => setEditedData({ ...editedData, bloodPressure: text })}
        />

        <Text style={styles.label}>Steps:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter steps"
          keyboardType="numeric"
          value={editedData.steps}
          onChangeText={(text) => setEditedData({ ...editedData, steps: text })}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditHealthRecordScreen;
