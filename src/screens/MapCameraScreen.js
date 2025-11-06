// src/screens/MapCameraScreen.js
import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function MapCameraScreen({ navigation, route }) {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission || !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) return <View style={styles.container} />;
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#fff' }}>Camera permission is required.</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permBtn}>
          <Text style={{ fontWeight: '700' }}>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync();
    navigation.navigate('MapLogEdit', {
      photoUri: photo?.uri,
      coords: route.params?.coords,
    });
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back">
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={40} color="#fff" />
        </TouchableOpacity>

        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={takePhoto} style={styles.captureBtn}>
            <Ionicons name="camera" size={34} color="#000" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  permBtn: { marginTop: 12, backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10 },
  camera: {
    flex: 1,
    justifyContent: 'flex-end', // pushes items to bottom
    alignItems: 'center',        // centers horizontally
  },
  closeBtn: { position: 'absolute', top: 60, right: 30, zIndex: 2 },
  bottomRow: {
    marginBottom: 60,
  },
  captureBtn: { backgroundColor: '#fff', width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
});
