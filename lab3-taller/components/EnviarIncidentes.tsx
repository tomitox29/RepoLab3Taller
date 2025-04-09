import React, { useState } from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity,SafeAreaView,StatusBar,Alert,} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const EnviarIncidentes = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [urgencia, setUrgencia] = useState<'baja' | 'media' | 'alta'>('baja');
  const [enviando, setEnviando] = useState(false);

  const enviarReporte = async () => {
    if (!titulo || !descripcion) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los campos.');
      return;
    }

    setEnviando(true);
    try {
      const data = { titulo, descripcion, urgencia };
      const response = await axios.post('http://172.16.66.238:8086/setIncidents', data);
      console.log('Incidente enviado:', response.data);
      Alert.alert('¡Enviado!', 'Tu reporte fue creado correctamente.');
      setTitulo('');
      setDescripcion('');
      setUrgencia('baja');
    } catch (error) {
      console.error('Error al enviar reporte:', error);
      Alert.alert('Error', 'No se pudo enviar el reporte.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Crear nuevo reporte 📝</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ingresa un título"
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Describe el incidente"
          multiline
        />

        <Text style={styles.label}>Urgencia</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={urgencia}
            onValueChange={(itemValue) => setUrgencia(itemValue)}
          >
            <Picker.Item label="Baja" value="baja" />
            <Picker.Item label="Media" value="media" />
            <Picker.Item label="Alta" value="alta" />
          </Picker>
        </View>

        <TouchableOpacity
          style={[styles.boton, enviando && { opacity: 0.6 }]}
          onPress={enviarReporte}
          disabled={enviando}
        >
          <Text style={styles.botonTexto}>
            {enviando ? 'Enviando...' : 'Enviar Reporte'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  navbar: {
    backgroundColor: '#4f46e5',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 6,
    width: '90%',
    alignSelf: 'center',
  },
  navbarTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
    backgroundColor: '#f9fafb',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  boton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EnviarIncidentes;
