import React from 'react';
import { View, StyleSheet, Image, Dimensions ,ImageSourcePropType} from 'react-native';
import { Text, Card, Surface } from 'react-native-paper';

interface User {
  photo: ImageSourcePropType;
  name: string;
  role: string;
  email: string;
}

const PerfilUsuario = ({ user }: { user: User }) => {
    const photoSource = typeof user.photo === 'string' 
    ? { uri: user.photo } 
    : user.photo;
    
  return (
    <Surface style={styles.surface} elevation={4}>
      <View style={styles.profileContainer}>
        <Image source={photoSource} style={styles.photo} />
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
        paddingVertical: 16,
        paddingHorizontal: 16,
        justifyContent: 'flex-start',
        backgroundColor: '#f5f5f5',
        alignSelf: 'flex-start',
        position: 'absolute',
        top: 0,
        height: '100%',
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
        borderWidth: 2,
        borderColor: 'white',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 0,
    },
    role: {
        fontSize: 18,
        color: '#555',
        marginBottom: 0,
    },
    email: {
        fontSize: 16,
        color: '#3498db',
    },
});

export default PerfilUsuario;