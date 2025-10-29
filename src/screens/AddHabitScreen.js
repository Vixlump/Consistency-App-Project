import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const habitIcons = [
  { name: 'fitness', label: 'Fitness' },
  { name: 'book', label: 'Study' },
  { name: 'leaf', label: 'Meditate' },
  { name: 'water', label: 'Water' },
  { name: 'school', label: 'Learn' },
  { name: 'bed', label: 'Sleep' },
];

export default function AddHabitScreen({ navigation }) {
  const [habitName, setHabitName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('fitness');
  const [hasReminder, setHasReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState('20:00');
  const [hasLocation, setHasLocation] = useState(false);

  const handleSave = () => {
    if (!habitName.trim()) {
      Alert.alert('Error', 'Please enter a habit name');
      return;
    }

    // In real app, save to local storage/API
    console.log('Saving habit:', {
      habitName,
      selectedIcon,
      hasReminder,
      reminderTime,
      hasLocation,
    });

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Habit Name */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habit Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., Morning Run, Read Book"
          value={habitName}
          onChangeText={setHabitName}
        />
      </View>

      {/* Icon Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Icon</Text>
        <View style={styles.iconGrid}>
          {habitIcons.map(icon => (
            <TouchableOpacity
              key={icon.name}
              style={[
                styles.iconOption,
                selectedIcon === icon.name && styles.iconOptionSelected
              ]}
              onPress={() => setSelectedIcon(icon.name)}
            >
              <Ionicons 
                name={icon.name} 
                size={24} 
                color={selectedIcon === icon.name ? '#6366f1' : '#6b7280'} 
              />
              <Text style={[
                styles.iconLabel,
                selectedIcon === icon.name && styles.iconLabelSelected
              ]}>
                {icon.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Reminder Toggle */}
      <View style={styles.section}>
        <View style={styles.toggleRow}>
          <View>
            <Text style={styles.sectionTitle}>Daily Reminder</Text>
            <Text style={styles.subtitle}>Get notified to complete your habit</Text>
          </View>
          <Switch
            value={hasReminder}
            onValueChange={setHasReminder}
            trackColor={{ false: '#e5e7eb', true: '#c7d2fe' }}
            thumbColor={hasReminder ? '#6366f1' : '#f3f4f6'}
          />
        </View>

        {hasReminder && (
          <TouchableOpacity style={styles.timePicker}>
            <Text style={styles.timeText}>{reminderTime}</Text>
            <Ionicons name="time" size={20} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>

      {/* Location Toggle */}
      <View style={styles.section}>
        <View style={styles.toggleRow}>
          <View>
            <Text style={styles.sectionTitle}>Location Based</Text>
            <Text style={styles.subtitle}>Complete when you arrive at a place</Text>
          </View>
          <Switch
            value={hasLocation}
            onValueChange={setHasLocation}
            trackColor={{ false: '#e5e7eb', true: '#c7d2fe' }}
            thumbColor={hasLocation ? '#6366f1' : '#f3f4f6'}
          />
        </View>

        {hasLocation && (
          <TouchableOpacity 
            style={styles.locationButton}
            onPress={() => navigation.navigate('LocationPicker')}
          >
            <Ionicons name="location" size={20} color="#6366f1" />
            <Text style={styles.locationButtonText}>Select Location</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Create Habit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconOption: {
    width: '30%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconOptionSelected: {
    backgroundColor: '#eef2ff',
    borderColor: '#6366f1',
  },
  iconLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#6b7280',
  },
  iconLabelSelected: {
    color: '#6366f1',
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  timeText: {
    fontSize: 16,
    color: '#1f2937',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  locationButtonText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  saveButton: {
    backgroundColor: '#6366f1',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});