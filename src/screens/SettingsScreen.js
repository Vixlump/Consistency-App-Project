import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [locationAccess, setLocationAccess] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => navigation.navigate('Login')
        },
      ]
    );
  };

  const SettingsItem = ({ icon, title, subtitle, rightElement, onPress }) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsItemLeft}>
        <Ionicons name={icon} size={24} color="#6366f1" style={styles.settingsIcon} />
        <View>
          <Text style={styles.settingsTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightElement}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <SettingsItem
          icon="person"
          title="Profile"
          subtitle="Edit your personal information"
          rightElement={<Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
          onPress={() => {}}
        />
        <SettingsItem
          icon="lock-closed"
          title="Privacy & Security"
          subtitle="Manage your data and security"
          rightElement={<Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
          onPress={() => {}}
        />
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.settingsItem}>
          <View style={styles.settingsItemLeft}>
            <Ionicons name="notifications" size={24} color="#6366f1" style={styles.settingsIcon} />
            <View>
              <Text style={styles.settingsTitle}>Notifications</Text>
              <Text style={styles.settingsSubtitle}>Daily reminders and updates</Text>
            </View>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#e5e7eb', true: '#c7d2fe' }}
            thumbColor={notifications ? '#6366f1' : '#f3f4f6'}
          />
        </View>

        <View style={styles.settingsItem}>
          <View style={styles.settingsItemLeft}>
            <Ionicons name="location" size={24} color="#6366f1" style={styles.settingsIcon} />
            <View>
              <Text style={styles.settingsTitle}>Location Access</Text>
              <Text style={styles.settingsSubtitle}>For location-based habits</Text>
            </View>
          </View>
          <Switch
            value={locationAccess}
            onValueChange={setLocationAccess}
            trackColor={{ false: '#e5e7eb', true: '#c7d2fe' }}
            thumbColor={locationAccess ? '#6366f1' : '#f3f4f6'}
          />
        </View>

        <View style={styles.settingsItem}>
          <View style={styles.settingsItemLeft}>
            <Ionicons name="moon" size={24} color="#6366f1" style={styles.settingsIcon} />
            <View>
              <Text style={styles.settingsTitle}>Dark Mode</Text>
              <Text style={styles.settingsSubtitle}>Use dark theme</Text>
            </View>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#e5e7eb', true: '#c7d2fe' }}
            thumbColor={darkMode ? '#6366f1' : '#f3f4f6'}
          />
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <SettingsItem
          icon="help-circle"
          title="Help & Support"
          rightElement={<Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
          onPress={() => {}}
        />
        <SettingsItem
          icon="document-text"
          title="Terms & Privacy"
          rightElement={<Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
          onPress={() => {}}
        />
        <SettingsItem
          icon="information"
          title="About"
          subtitle="App version 1.0.0"
          rightElement={<Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
          onPress={() => {}}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={20} color="#ef4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    marginRight: 12,
  },
  settingsTitle: {
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});