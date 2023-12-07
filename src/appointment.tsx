import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Card = ({ title, content, imageUri, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: imageUri }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{content}</Text>
    </View>
  </TouchableOpacity>
);

const AppointmentScreen = () => {
  // Dummy appointment data
  const appointmentData = {
    provider: {
      name: 'Dr. Smith',
      specialty: 'Cardiologist',
      avatarUri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.sIMaRhEHogXQcRyPIRNyMQHaLI%26pid%3DApi&f=1&ipt=20fe7346c1534ba798a4bfdd8018b9e5a19946a8b6922d401b9d28a1e9b4eb8e&ipo=images',
    },
    dateTime: 'Monday, 5th December 2023, 10:00 AM',
    type: 'Consultation',
    location: '123 Health Street, Cityville',
    status: 'Upcoming',
    virtualMeetingLink: 'https://example.com/virtual-room-link',
  };

  // Dummy data for available doctors
  const availableDoctors = [
    {
      id: '1',
      name: 'Dr. Johnson',
      specialty: 'Dermatologist',
      avatarUri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.sIMaRhEHogXQcRyPIRNyMQHaLI%26pid%3DApi&f=1&ipt=20fe7346c1534ba798a4bfdd8018b9e5a19946a8b6922d401b9d28a1e9b4eb8e&ipo=images',
    },
    {
      id: '2',
      name: 'Dr. Davis',
      specialty: 'Pediatrician',
      avatarUri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.sIMaRhEHogXQcRyPIRNyMQHaLI%26pid%3DApi&f=1&ipt=20fe7346c1534ba798a4bfdd8018b9e5a19946a8b6922d401b9d28a1e9b4eb8e&ipo=images',
    },
    // Add more doctors as needed
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header Component */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="ios-arrow-back" size={24} color="#3498db" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointment Details</Text>
      </View>

      {/* Appointment Information Component */}
      <Card
              title={`${appointmentData.provider.name}, ${appointmentData.provider.specialty}`}
              content={`Date & Time: ${appointmentData.dateTime}\nType: ${appointmentData.type}\nLocation: ${appointmentData.location}\nStatus: ${appointmentData.status}`}
              imageUri={appointmentData.provider.avatarUri} onPress={undefined}      />

      {/* Virtual Waiting Room Component (for Telehealth) */}
      {appointmentData.virtualMeetingLink && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Virtual Waiting Room</Text>
          <Text>Join the virtual waiting room:</Text>
          <Text style={styles.virtualRoomLink} onPress={() => window.open(appointmentData.virtualMeetingLink, '_blank')}>
            {appointmentData.virtualMeetingLink}
          </Text>
        </View>
      )}

      {/* Available Doctors Component */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Doctors</Text>
        {availableDoctors.map((doctor) => (
          <Card
            key={doctor.id}
            title={`${doctor.name}, ${doctor.specialty}`}
            content=""
            imageUri={doctor.avatarUri}
            onPress={() => console.log(`Doctor ${doctor.name} selected`)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardText: {
    color: '#555',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  virtualRoomLink: {
    color: '#3498db',
  },
});

export default AppointmentScreen;
