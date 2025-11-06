// src/screens/MapLogEditScreen.js
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';


export default function MapLogEditScreen({ route, navigation }) {
  const { photoUri, coords } = route.params || {};
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [locationText, setLocationText] = useState('');

  const onSave = () => {
    // TODO: save log, then navigate to confirm
    navigation.navigate('MapLogConfirm', {
      photoUri,
      title,
      notes,
      locationText,
      coords,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <ImageBackground source={{ uri: photoUri }} style={styles.photo} />

        {/* Close button */}
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}   // or navigation.navigate('LogsMap')
        >
          <Ionicons name="close" size={40} color="#fff" />
        </TouchableOpacity>

        {/* dark/blur overlay under the card */}
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFillObject} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.35)' }]} />

        <SafeAreaView style={StyleSheet.absoluteFill}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
            style={styles.kav}
          >
            {/* Centered floating card */}
            <View style={styles.centerWrap} pointerEvents="box-none">
              <View style={styles.card}>
                <Text style={styles.label}>TITLE</Text>
                <TextInput
                  placeholder="Add your title"
                  placeholderTextColor="#9CA3AF"
                  value={title}
                  onChangeText={setTitle}
                  style={styles.input}
                  returnKeyType="next"
                />

                <Text style={[styles.label, { marginTop: 12 }]}>NOTES</Text>
                <TextInput
                  placeholder="Write note here..."
                  placeholderTextColor="#9CA3AF"
                  value={notes}
                  onChangeText={setNotes}
                  style={[styles.input, styles.multiline]}
                  multiline
                />

                <Text style={[styles.label, { marginTop: 12 }]}>LOCATION</Text>
                <TextInput
                  placeholder="Search / edit location"
                  placeholderTextColor="#9CA3AF"
                  value={locationText}
                  onChangeText={setLocationText}
                  style={styles.input}
                />

                <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
                  <Text style={styles.saveTxt}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const CARD_MAX_WIDTH = 420;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  photo: { flex: 1 },
  kav: { flex: 1 },
  centerWrap: {
    flex: 1,
    justifyContent: 'center',     // centers vertically
    alignItems: 'center',          // centers horizontally
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    maxWidth: CARD_MAX_WIDTH,
    backgroundColor: 'rgba(17,17,17,0.9)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  label: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  input: {
    color: '#E5E7EB',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginTop: 6,
  },
  multiline: {
    minHeight: 90,
    textAlignVertical: 'top',
  },

  closeBtn: {
    position: 'absolute',
    top: 60, // adjust depending on your notch
    right: 24,
    zIndex: 20,
    padding: 8,
  },

  saveBtn: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
  },
  saveTxt: { color: '#0B0B0B', fontWeight: '800', fontSize: 16 },
});
