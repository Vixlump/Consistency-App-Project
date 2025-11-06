import { useState } from 'react';
import { ImageBackground, View, Text, Pressable, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

export default function MapUploadConfirmScreen({ route, navigation }) {
  const { photoUri, title, note, address } = route.params;
  const [done, setDone] = useState(false);

  const onUpload = async () => {
    // TODO: upload to your backend or save to AsyncStorage
    // await upload(photoUri, title, note, address);
    setDone(true);
    setTimeout(() => navigation.pop(3), 800); // go back 3 screens to Map
  };

  return (
    <ImageBackground source={{ uri: photoUri }} style={{ flex: 1 }}>
      <Pressable style={s.close} onPress={() => navigation.goBack()}><Text style={s.closeTxt}>✕</Text></Pressable>

      {!done ? (
        <View style={s.cardWrap}>
          <View style={s.card}>
            <Text style={s.title}>{title || 'Untitled'}</Text>
            <Text style={s.sub}>💬  {note || 'No note'}</Text>
            <Text style={s.sub}>📍 {address}</Text>

            <View style={{ height: 12 }} />
            <Pressable style={s.upload} onPress={onUpload}>
              <Text style={{ fontWeight: '700' }}>Upload</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <BlurView intensity={40} tint="dark" style={s.overlay}>
          <Text style={{ fontSize: 54, marginBottom: 8 }}>🔥</Text>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: '800' }}>Upload completed</Text>
        </BlurView>
      )}
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  close: { position: 'absolute', top: 60, right: 30, zIndex: 2 },
  closeTxt: { color: '#fff', fontSize: 28, fontWeight: '800' },
  cardWrap: { position: 'absolute', left: 16, right: 16, bottom: 28 },
  card: {
    backgroundColor: 'rgba(18,18,20,0.9)', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)'
  },
  title: { color: '#fff', fontSize: 26, fontWeight: '800' },
  sub: { color: '#e7e7ea', marginTop: 6 },
  upload: { backgroundColor: '#fff', alignItems: 'center', paddingVertical: 12, borderRadius: 12, marginTop: 16 },
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
