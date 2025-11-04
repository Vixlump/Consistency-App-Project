import { View, Pressable, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function MapCameraScreen({ route, navigation }) {
  const { coords } = route.params;

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return;
    const res = await ImagePicker.launchCameraAsync({ quality: 0.9, exif: false });
    if (!res.canceled) {
      const uri = res.assets[0].uri;
      navigation.replace('MapLogEdit', { photoUri: uri, coords });
    }
  };

  return (
    <View style={s.wrap}>
      <Pressable style={s.shutter} onPress={openCamera}>
        <Text style={{ color:'#fff', fontSize:16 }}>Open Camera</Text>
      </Pressable>
      <Pressable style={s.close} onPress={() => navigation.goBack()}>
        <Text style={{ color:'#fff', fontSize:18 }}>✕</Text>
      </Pressable>
    </View>
  );
}
const s = StyleSheet.create({
  wrap:{ flex:1, backgroundColor:'#000', alignItems:'center', justifyContent:'center' },
  shutter:{ borderWidth:3, borderColor:'#fff', width:88, height:88, borderRadius:44, alignItems:'center', justifyContent:'center' },
  close:{ position:'absolute', top:40, right:20 }
});
