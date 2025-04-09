import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, Card, Surface } from 'react-native-paper';

interface User {
  photo: string;
  name: string;
  role: string;
  email: string;
}

const PerfilUsuario = ({ user }: { user: User }) => {
  return (
    <Surface style={styles.surface} elevation={4}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.photo }} style={styles.photo} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.role}>{user.role}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
    </Surface>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  surface: {
    width: width,
    paddingVertical: 30,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: '#f5f5f5',
    alignSelf: 'flex-start',
  },
  profileContainer: {
    width: '100%',
    alignItems: 'center',
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  role: {
    fontSize: 18,
    color: '#555',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#3498db',
  },
});

export default PerfilUsuario;