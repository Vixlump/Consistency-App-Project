import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { addLog, getLogs } from '../utils/logs';
import mapStyle from '../../assets/mapStyles/dark.json'; // dark map theme

// demo images for markers (replace with your own)
const IMAGES = {
  boxing: require('../../assets/images/boxing.jpg'),
  run: require('../../assets/images/run.jpg'),
  work: require('../../assets/images/work.jpg'),
};

export default function LogsMapScreen() {
  const [region, setRegion] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ask for permission and load location + logs
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Location permission required', 'Enable location to use map logs.');
        setLoading(false);
        return;
      }

      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const { latitude, longitude } = pos.coords;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });

      const existing = await getLogs();
      setLogs(existing);
      setLoading(false);
    })();
  }, []);

  // add a new log marker at current location
  const handleAddHere = useCallback(async () => {
    try {
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const { latitude, longitude } = pos.coords;

      const newLog = await addLog({
        habitId: 'boxing',
        title: 'Boxing',
        status: 'done',
        lat: latitude,
        lng: longitude,
      });

      setLogs((prev) => [newLog, ...prev]);
      setRegion((r) => (r ? { ...r, latitude, longitude } : r));
    } catch (e) {
      Alert.alert('Error', 'Could not save log.');
    }
  }, []);

  if (loading || !region) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#6366f1" />
        <Text style={{ marginTop: 8, color: '#9CA3AF' }}>Loading map…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE} // ensure Google Maps
        customMapStyle={mapStyle} // dark theme
        initialRegion={region}
      >
        {/* show current location */}
        <Marker
          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
          title="You are here"
        />

        {/* show habit logs */}
        {logs.map((l) => (
          <Marker
            key={l.id}
            coordinate={{ latitude: l.lat, longitude: l.lng }}
            title={l.title}
            description={new Date(l.timestamp).toLocaleString()}
          >
            <Image
              source={IMAGES[l.habitId] || IMAGES.boxing}
              style={styles.markerImage}
            />
          </Marker>
        ))}
      </MapView>

      {/* Floating add button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddHere}>
        <Text style={styles.fabText}>+ Log Here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0B' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  markerImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  fab: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    backgroundColor: '#111827',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  fabText: {
    color: '#E5E7EB',
    fontWeight: '700',
    fontSize: 16,
  },
});
