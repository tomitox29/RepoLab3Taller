import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import axios from 'axios';

const coloresUrgencia = {
  baja: '#d1fae5',
  media: '#fef3c7',
  alta: '#fecaca',
};

interface Evento {
  _id: number;
  titulo: string;
  descripcion: string;
  urgencia: 'baja' | 'media' | 'alta';
}

const EventoItem = ({ evento }: { evento: Evento }) => {
  return (
    <View style={[styles.card, { backgroundColor: coloresUrgencia[evento.urgencia] || '#f3f4f6' }]}>
      <Text style={styles.titulo}>{evento.titulo}</Text>
      <Text style={styles.descripcion}>{evento.descripcion}</Text>
      <Text style={styles.urgencia}>Urgencia: {evento.urgencia}</Text>
    </View>
  );
};

const ListaIncidentes = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEventos = async () => {
    try {
      const response = await axios.get('http://172.16.66.238:8086/getIncidents');
      console.log('Incidentes obtenidos:', response.data);
      setEventos(response.data.incidents);
    } catch (error) {
      console.error('Error al obtener incidentes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos(); // Carga inicial
    const interval = setInterval(fetchEventos, 10000); // Refresca cada 10s
    return () => clearInterval(interval); // Limpieza al desmontar
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Reportes creados 🚨</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4f46e5" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={eventos}
          keyExtractor={item => item._id.toString()}
          renderItem={({ item }) => <EventoItem evento={item} />}
          contentContainerStyle={styles.lista}
        />
      )}
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
  lista: {
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#1f2937',
    textAlign: 'center',
  },
  descripcion: {
    fontSize: 14,
    marginBottom: 4,
    color: '#374151',
  },
  urgencia: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#6b7280',
  },
});

export default ListaIncidentes;