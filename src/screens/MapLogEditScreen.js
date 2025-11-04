import { useEffect, useState } from 'react';
import { ImageBackground, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function MapLogEditScreen({ route, navigation }) {
  const { photoUri, coords } = route.params;
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [address, setAddress] = useState('Locating...');

  useEffect(() => {
    (async () => {
      if (!coords) return;
      const r = await Location.reverseGeocodeAsync({ latitude: coords.lat, longitude: coords.lng });
      const first = r[0];
      if (first) {
        const line = [first.name, first.city, first.region, first.postalCode, first.country].filter(Boolean).join(', ');
        setAddress(line);
      } else setAddress('Unknown place');
    })();
  }, []);

  return (
    <ImageBackground source={{ uri: photoUri }} style={{ flex:1 }}>
      <Pressable style={s.close} onPress={() => navigation.goBack()}><Text style={s.closeTxt}>✕</Text></Pressable>

      <View style={s.sheet}>
        <Text style={s.label}>TITLE</Text>
        <TextInput style={s.input} placeholder="Add your title" value={title} onChangeText={setTitle} />

        <Text style={s.label}>NOTES</Text>
        <TextInput
          style={[s.input, { height: 90 }]}
          placeholder="Write note here..."
          multiline
          value={note}
          onChangeText={setNote}
        />

        <Text style={s.label}>LOCATION</Text>
        <View style={s.addr}><Text style={{ color:'#e7e7ea' }}>{address}</Text></View>

        <Pressable
          onPress={() => navigation.replace('MapUploadConfirm', { photoUri, title, note, address, coords })}
          style={s.save}
        >
          <Text style={{ fontWeight:'700' }}>Save</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  close:{ position:'absolute', top:40, right:20, zIndex:2 },
  closeTxt:{ color:'#fff', fontSize:28, fontWeight:'800' },
  sheet:{
    position:'absolute', left:16, right:16, bottom:24,
    backgroundColor:'rgba(20,20,22,0.85)', padding:16, borderRadius:14
  },
  label:{ color:'#9aa0a6', fontSize:12, marginTop:4 },
  input:{ backgroundColor:'#1a1b1f', color:'#fff', borderRadius:10, paddingHorizontal:12, paddingVertical:10, marginTop:6 },
  addr:{ backgroundColor:'#1a1b1f', borderRadius:10, padding:12, marginTop:6 },
  save:{ backgroundColor:'#fff', alignItems:'center', paddingVertical:12, borderRadius:12, marginTop:16 }
});
