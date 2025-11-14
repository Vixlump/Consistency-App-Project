import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Alert, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


import { addLog, getLogs } from '../utils/logs';
import mapStyle from '../../assets/mapStyles/dark.json';

// demo images for markers (replace with your own)
const IMAGES = {
  boxing: require('../../assets/images/boxing.png'),
  run: require('../../assets/images/run.png'),
  work: require('../../assets/images/work.png'),
  japan: require('../../assets/images/japan_icon.png'),

};

export default function LogsMapScreen() {
  const navigation = useNavigation();
  const [region, setRegion] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ask for permission and get initial region
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
      setLoading(false);
    })();
  }, []);

  // refresh markers whenever we return to this screen
  useFocusEffect(
    useCallback(() => {
      (async () => setLogs(await getLogs()))();
    }, [])
  );

  // (optional) quick-add at current spot – keep if you still want it anywhere
  const handleAddHere = useCallback(async () => {
    try {
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const { latitude, longitude } = pos.coords;

      const newLog = await addLog({
        habitId: 'japan',
        // title: 'Sauna',
        title: title,
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

  // open camera flow
  const openCamera = () => {
    if (!region) return;
    navigation.navigate('MapCamera', { coords: { lat: region.latitude, lng: region.longitude } });
  };

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
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        initialRegion={region}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {/* existing logs */}
        {logs.map((l) => (
          <Marker
            key={l.id}
            coordinate={{ latitude: l.lat, longitude: l.lng }}
            onPress={() => navigation.navigate('MapLogDetail', { log: l })}
          >
            <View style={styles.pinWrap}>
              <Image
                source={
                  l.photoUri
                    ? { uri: l.photoUri }           // use user photo if available
                    : IMAGES[l.habitId] || IMAGES.japan  // fallback to old icons
                }
                style={styles.pinImg}
              />
            </View>

            {/* optional native callout too */}
            <Callout tooltip onPress={() => navigation.navigate('MapLogDetail', { log: l })}>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{l.title || 'Log'}</Text>
                <Text style={styles.calloutSub}>{new Date(l.timestamp).toLocaleString()}</Text>
                <Text style={styles.calloutLink}>View details →</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Floating camera action */}
      <Pressable onPress={openCamera} style={styles.camBtn}>
        <Ionicons name="camera" size={28} color="#fff" />
      </Pressable>

      {/* If you still want the quick “+ Log Here” creator, keep this secondary btn */}
      {/* <Pressable onPress={handleAddHere} style={[styles.camBtn, { right: 24, left: undefined }]}>
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0B' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  pinWrap: {
    width: 56, height: 56, borderRadius: 14,
    overflow: 'hidden', borderWidth: 3, borderColor: '#fff',
  },
  pinImg: { width: '100%', height: '100%' },

  camBtn: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    backgroundColor: '#111827',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 28,
    padding: 14,
    elevation: 5,
  },

  callout: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    minWidth: 180,
  },
  calloutTitle: { fontWeight: '800', marginBottom: 4 },
  calloutSub: { color: '#6b7280', marginBottom: 6, fontSize: 12 },
  calloutLink: { color: '#111827', fontWeight: '700' },
});
