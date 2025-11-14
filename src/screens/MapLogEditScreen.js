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
import { updateLog } from '../utils/logs';
import { CommonActions } from '@react-navigation/native';


export default function MapLogEditScreen({ route, navigation }) {
  // params from camera (create) OR detail (edit)
  const {
    mode = 'create',                // 'create' | 'edit'
    logId,                          // only for edit
    photoUri,
    coords,                         // { lat, lng }
    initialValues = {},             // { title, notes, locationText }
  } = route.params || {};

  // prefill fields if provided
  const [title, setTitle] = useState(initialValues.title ?? '');
  const [notes, setNotes] = useState(initialValues.notes ?? '');
  const [locationText, setLocationText] = useState(initialValues.locationText ?? '');

  const onSave = async () => {
    if (mode === 'edit' && logId) {
      // update existing log in storage
      const updated = await updateLog(logId, {
        title,
        note: notes,
        address: locationText,
      });

      // // Go back to the map screen as requested
      // navigation.navigate('Map'); 
      // return;
      
      // go back to detail with fresh data
      navigation.replace('Map', { log: updated });
      return;
    }

    // create flow → go to confirm screen
    navigation.navigate('MapUploadConfirm', {
      photoUri,
      title,
      note: notes,
      address: locationText,
      coords,
    });
  };

  const closeToMap = () => {
    // Try to pop 2 screens (e.g., Edit -> Detail -> Map)
    try {
      const state = navigation.getState();
      const depth = state?.routes?.length ?? 1;

      if (depth >= 3) {
        navigation.pop(2);
        return;
      }

      // If stack isn’t deep enough, try just goBack
      if (navigation.canGoBack()) {
        navigation.goBack();
        return;
      }

      // Last resort: explicitly navigate to Map
      navigation.navigate('Map');
    } catch (e) {
      // If anything weird happens, navigate to Map by name
      navigation.navigate('Map');
    }
  };




  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        {!!photoUri && <ImageBackground source={{ uri: photoUri }} style={styles.photo} />}

        {/* Close */}
        <TouchableOpacity style={styles.closeBtn}
          onPress={() => navigation.goBack()}        >
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
    justifyContent: 'center',
    alignItems: 'center',
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
    top: 60,
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
