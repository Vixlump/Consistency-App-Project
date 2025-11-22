// import { Ionicons } from '@expo/vector-icons';
// import { useState } from 'react';
// import {
//     Alert,
//     ScrollView,
//     StyleSheet,
//     Switch,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// export default function SettingsScreen({ navigation }) {
//   const [notifications, setNotifications] = useState(true);
//   const [locationAccess, setLocationAccess] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

// const handleLogout = () => {
//   Alert.alert(
//     'Logout',
//     'Are you sure you want to logout?',
//     [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Logout',
//         style: 'destructive',
//         onPress: () => navigation.navigate('Login')
//       },
//     ]
//   );
// };

//   const SettingsItem = ({ icon, title, subtitle, rightElement, onPress }) => (
//     <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
//       <View style={styles.settingsItemLeft}>
//         <Ionicons name={icon} size={24} color="#6366f1" style={styles.settingsIcon} />
//         <View>
//           <Text style={styles.settingsTitle}>{title}</Text>
//           {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
//         </View>
//       </View>
//       {rightElement}
//     </TouchableOpacity>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       {/* Account Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Account</Text>
//         <SettingsItem
//           icon="person"
//           title="Profile"
//           subtitle="Edit your personal information"
//           rightElement={<Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
//           onPress={() => {}}
//         />
//         <SettingsItem
//           icon="lock-closed"
//           title="Privacy & Security"
//           subtitle="Manage your data and security"
//           rightElement={<Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
//           onPress={() => {}}
//         />
//       </View>

//       {/* Preferences Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Preferences</Text>
//         <View style={styles.settingsItem}>
//           <View style={styles.settingsItemLeft}>
//             <Ionicons name="notifications" size={24} color="#6366f1" style={styles.settingsIcon} />
//             <View>
//               <Text style={styles.settingsTitle}>Notifications</Text>
//               <Text style={styles.settingsSubtitle}>Daily reminders and updates</Text>
//             </View>
//           </View>
//           <Switch
//             value={notifications}
//             onValueChange={setNotifications}
//             trackColor={{ false: '#e5e7eb', true: '#c7d2fe' }}
//             thumbColor={notifications ? '#6366f1' : '#f3f4f6'}
//           />
//         </View>

//         <View style={styles.settingsItem}>
//           <View style={styles.settingsItemLeft}>
//             <Ionicons name="location" size={24} color="#6366f1" style={styles.settingsIcon} />
//             <View>
//               <Text style={styles.settingsTitle}>Location Access</Text>
//               <Text style={styles.settingsSubtitle}>For location-based habits</Text>
//             </View>
//           </View>
//           <Switch
//             value={locationAccess}
//             onValueChange={setLocationAccess}
//             trackColor={{ false: '#e5e7eb', true: '#c7d2fe' }}
//             thumbColor={locationAccess ? '#6366f1' : '#f3f4f6'}
//           />
//         </View>

//         <View style={styles.settingsItem}>
//           <View style={styles.settingsItemLeft}>
//             <Ionicons name="moon" size={24} color="#6366f1" style={styles.settingsIcon} />
//             <View>
//               <Text style={styles.settingsTitle}>Dark Mode</Text>
//               <Text style={styles.settingsSubtitle}>Use dark theme</Text>
//             </View>
//           </View>
//           <Switch
//             value={darkMode}
//             onValueChange={setDarkMode}
//             trackColor={{ false: '#e5e7eb', true: '#c7d2fe' }}
//             thumbColor={darkMode ? '#6366f1' : '#f3f4f6'}
//           />
//         </View>
//       </View>

//       {/* Support Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Support</Text>
//         <SettingsItem
//           icon="help-circle"
//           title="Help & Support"
//           rightElement={<Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
//           onPress={() => {}}
//         />
//         <SettingsItem
//           icon="document-text"
//           title="Terms & Privacy"
//           rightElement={<Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
//           onPress={() => {}}
//         />
//         <SettingsItem
//           icon="information"
//           title="About"
//           subtitle="App version 1.0.0"
//           rightElement={<Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
//           onPress={() => {}}
//         />
//       </View>

//       {/* Logout Button */}
//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Ionicons name="log-out" size={20} color="#ef4444" />
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8fafc',
//   },
//   section: {
//     backgroundColor: '#fff',
//     marginHorizontal: 20,
//     marginTop: 20,
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#374151',
//     padding: 16,
//     backgroundColor: '#f9fafb',
//   },
//   settingsItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f3f4f6',
//   },
//   settingsItemLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   settingsIcon: {
//     marginRight: 12,
//   },
//   settingsTitle: {
//     fontSize: 16,
//     color: '#1f2937',
//     marginBottom: 2,
//   },
//   settingsSubtitle: {
//     fontSize: 12,
//     color: '#6b7280',
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//     margin: 20,
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#fecaca',
//   },
//   logoutText: {
//     color: '#ef4444',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 8,
//   },
// });
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext'; // Ensure this path matches your project

export default function SettingsScreen({ navigation }) {
  const { theme, updateTheme, themeName } = useTheme(); 
  const [isThemeModalVisible, setThemeModalVisible] = useState(false);

  // --- Reusable Row Component ---
  const SettingsRow = ({ icon, name, isLast = false, onPress }) => (
    <TouchableOpacity 
      style={[
        styles.row, 
        { borderBottomColor: theme.border }, 
        isLast && styles.rowLast
      ]}
      onPress={onPress}
    >
      <View style={[styles.rowIconContainer, { backgroundColor: theme.iconBg }]}>
        <Ionicons name={icon} size={20} color={theme.subText} />
      </View>
      <Text style={[styles.rowText, { color: theme.text }]}>{name}</Text>
      <Ionicons name="chevron-forward" size={20} color={theme.subText} />
    </TouchableOpacity>
  );

  const renderProfileHeader = () => (
    <View style={styles.headerContainer}>
      <ImageBackground
        source={require('../../assets/images/image 71.png')}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <View style={styles.headerOverlay}>
          <Image
            source={require('../../assets/images/profile.png')}
            style={styles.profileImage}
          />
          
          <View style={styles.profileTextContainer}>
            <Text style={[styles.profileName, { color: '#FFF' }]}>Consistener</Text>
            <Text style={[styles.profileEmail, { color: '#DDD' }]}>forexample@gmail.com</Text>
          </View>

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
            <Ionicons name="create-outline" size={16} color="#DDD" />
          </TouchableOpacity>

          {/* Stats Box */}
          <View style={styles.statsBox}>
            <View style={styles.statsContainer}>
              <View style={[styles.statItem, styles.statItemFirst]}>
                <Text style={styles.statIcon}>🏆</Text>
                <Text style={styles.statValue}>6</Text>
                <Text style={styles.statLabel}>Achievements</Text>
              </View>
              <View style={[styles.statItem, styles.statItemMiddle]}>
                <Text style={styles.statIcon}>🔥</Text>
                <Text style={styles.statValue}>2</Text>
                <Text style={styles.statLabel}>Streaks</Text>
              </View>
              <View style={[styles.statItem, styles.statItemLast]}>
                <Text style={styles.statIcon}>✅</Text>
                <Text style={styles.statValue}>45</Text>
                <Text style={styles.statLabel}>Wins</Text>
              </View>
            </View>
          </View>

        </View>
      </ImageBackground>
    </View>
  );

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => navigation.navigate('Login') },
    ]);
  };

  // --- THEME SELECTION MODAL ---
  const renderThemeModal = () => (
    <Modal
      visible={isThemeModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setThemeModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setThemeModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Choose Theme</Text>
            
            {/* REMOVED 'midnight' from this array */}
            {['dark', 'light'].map((mode) => (
              <TouchableOpacity 
                key={mode}
                style={[
                  styles.themeOption, 
                  { backgroundColor: themeName === mode ? theme.iconBg : 'transparent' }
                ]}
                onPress={() => {
                  updateTheme(mode);
                  setThemeModalVisible(false);
                }}
              >
                <Text style={[
                  styles.themeOptionText, 
                  { color: theme.text, fontWeight: themeName === mode ? 'bold' : 'normal' }
                ]}>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Text>
                {themeName === mode && <Ionicons name="checkmark" size={20} color={theme.text} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView>
        {renderProfileHeader()}

        {/* App Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.subText }]}>App</Text>
          <View style={[styles.sectionBody, { backgroundColor: theme.card }]}>
            <SettingsRow icon="settings-outline" name="General" />
            <SettingsRow icon="notifications-outline" name="Remind me" />
            
            {/* --- CHANGED NAME TO JUST "Theme" --- */}
            <SettingsRow 
              icon="color-palette-outline" 
              name="Theme" 
              onPress={() => setThemeModalVisible(true)} 
            />
            
            <SettingsRow icon="archive-outline" name="Archived Habits" />
            <SettingsRow icon="swap-horizontal-outline" name="Data Import/Export" />
            <SettingsRow icon="reorder-four-outline" name="Reorder Habits" isLast />
          </View>
        </View>

        {/* Help Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.subText }]}>Help</Text>
          <View style={[styles.sectionBody, { backgroundColor: theme.card }]}>
            <SettingsRow icon="document-text-outline" name="Show What's New" />
            <SettingsRow icon="send-outline" name="Send feedback" isLast />
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.subText }]}>About</Text>
          <View style={[styles.sectionBody, { backgroundColor: theme.card }]}>
            <SettingsRow icon="globe-outline" name="Website" />
            <SettingsRow icon="mail-outline" name="Contact Support" isLast />
          </View>
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <View style={[styles.sectionBody, { backgroundColor: theme.card }]}>
            <TouchableOpacity
              style={[styles.row, styles.rowLast]}
              onPress={handleLogout}
            >
              <View style={[styles.rowIconContainer, styles.logoutIconContainer]}>
                <Ionicons name="log-out-outline" size={20} color={theme.danger} />
              </View>
              <Text style={[styles.rowText, { color: theme.danger }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {renderThemeModal()}

    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: { height: 340 },
  headerBackground: { flex: 1, justifyContent: 'flex-end' },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    marginTop: 40,
    alignSelf: 'flex-start',
    marginLeft: 0,
  },
  profileTextContainer: { alignSelf: 'flex-start', marginBottom: 2 },
  profileName: { fontSize: 22, fontWeight: '600', textAlign: 'left' },
  profileEmail: { fontSize: 14, fontWeight: '500', textAlign: 'left' },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  editProfileText: { color: '#DDD', fontSize: 14, marginRight: 6 },
  
  // Stats Box
  statsBox: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 10,
  },
  statsContainer: { flexDirection: 'row', width: '100%', paddingVertical: 16 },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statItemFirst: { left: 10 },
  statItemMiddle: { left: 0 },
  statItemLast: { left: -10 },
  statIcon: { fontSize: 20 },
  statValue: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  statLabel: { color: '#EEE', fontSize: 12 },

  // Sections
  section: { paddingHorizontal: 16, marginTop: 24 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 12,
  },
  sectionBody: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
  },
  rowLast: { borderBottomWidth: 0 },
  rowIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rowText: { flex: 1, fontSize: 16 },
  
  // Logout
  logoutIconContainer: { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 14,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  themeOptionText: {
    fontSize: 16,
  }
});