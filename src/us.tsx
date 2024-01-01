import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Campus Health</Text>
      <Text style={styles.description}>
        Welcome to Campus Health, your go-to app for managing your health on
        campus. Created by Bereket Tadele, this app is designed to provide
        essential health information and services for students and staff.
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Version: 1.0.0
        </Text>
        <Text style={styles.infoText}>
          Author: Bereket Tadele
        </Text>
        <Text style={styles.infoText}>
          Contact: berekettadelemulu210@gmail.com
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  infoContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
});

export default AboutUsScreen;
