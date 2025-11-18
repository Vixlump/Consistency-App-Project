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
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert
} from 'react-native';
// Import both icon packs
import { Ionicons } from '@expo/vector-icons';

// --- Reusable Row Component ---
const SettingsRow = ({ icon, name, isLast = false }) => (
  <TouchableOpacity style={[styles.row, isLast && styles.rowLast]}>
    <View style={styles.rowIconContainer}>
      <Ionicons name={icon} size={20} color="#9CA3AF" />
    </View>
    <Text style={styles.rowText}>{name}</Text>
    <Ionicons name="chevron-forward" size={20} color="#555" />
  </TouchableOpacity>
);

// --- Settings Screen Component ---
export default function SettingsScreen({ navigation }) {

  // --- 1. Profile Header (NOW INCLUDES STATS) ---
  const renderProfileHeader = () => (
    <View style={styles.headerContainer}>
      <ImageBackground
        // --- UPDATED BACKGROUND IMAGE ---
        source={require('../../assets/images/image 71.png')}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <View style={styles.headerOverlay}>
          <Image
            source={require('../../assets/images/japan_icon.png')}
            style={styles.profileImage}
          />
          {/* --- PROFILE TEXT CONTAINER (FOR LEFT ALIGN) --- */}
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>Consistener</Text>
            <Text style={styles.profileEmail}>forexample@gmail.com</Text>
          </View>

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
            {/* --- EDITED ICON --- */}
            <Ionicons name="create-outline" size={16} color="#DDD" /> {/* Changed icon to 'create-outline' */}
          </TouchableOpacity>

          {/* --- STATS BAR WITH NEW BOX & SHADOW --- */}
          <View style={styles.statsBox}> {/* New container for the black box */}
            <View style={styles.statsContainer}>
              {/* Achievements */}
              <View style={[styles.statItem, styles.statItemFirst]}>
                <Text style={styles.statIcon}>🏆</Text>
                <Text style={styles.statValue}>6</Text>
                <Text style={styles.statLabel}>Achievements</Text>
              </View>
              {/* Streaks */}
              <View style={[styles.statItem, styles.statItemMiddle]}>
                <Text style={styles.statIcon}>🔥</Text>
                <Text style={styles.statValue}>2</Text>
                <Text style={styles.statLabel}>Streaks</Text>
              </View>
              {/* Wins */}
              <View style={[styles.statItem, styles.statItemLast]}>
                <Text style={styles.statIcon}>✅</Text>
                <Text style={styles.statValue}>45</Text>
                <Text style={styles.statLabel}>Wins</Text>
              </View>
            </View>
          </View>
          {/* --- END STATS BAR --- */}

        </View>
      </ImageBackground>
    </View>
  );

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {renderProfileHeader()}
        {/* The renderStatsBar() call is removed from here */}

        {/* --- 3. App Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>
          <View style={styles.sectionBody}>
            <SettingsRow icon="settings-outline" name="General" />
            <SettingsRow icon="notifications-outline" name="Remind me" />
            <SettingsRow icon="color-palette-outline" name="Theme" />
            <SettingsRow icon="archive-outline" name="Archived Habits" />
            <SettingsRow icon="swap-horizontal-outline" name="Data Import/Export" />
            <SettingsRow icon="reorder-four-outline" name="Reorder Habits" isLast />
          </View>
        </View>

        {/* --- 4. Help Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help</Text>
          <View style={styles.sectionBody}>
            <SettingsRow icon="document-text-outline" name="Show What's New" />
            <SettingsRow icon="send-outline" name="Send feedback" isLast />
          </View>
        </View>

        {/* --- 5. About Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.sectionBody}>
            <SettingsRow icon="globe-outline" name="Website" />
            <SettingsRow icon="mail-outline" name="Contact Support" isLast />
          </View>
        </View>

        {/* --- Logout Section --- */}
        <View style={styles.section}>
          <View style={styles.sectionBody}>
            <TouchableOpacity
              style={[styles.row, styles.rowLast]}
              onPress={handleLogout}
            >
              <View style={[styles.rowIconContainer, styles.logoutIconContainer]}>
                <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              </View>
              <Text style={[styles.rowText, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles for SettingsScreen ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  // --- Header Styles ---
  headerContainer: {
    height: 300, // Increased height
  },
  headerBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // Darker overlay
    justifyContent: 'flex-end',
    // alignItems: 'center',
    paddingHorizontal: 20, // <-- Add horizontal padding
    paddingBottom: 20, // <-- Push content up from bottom
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    marginTop: 40, // Pushes content down
    alignSelf: 'flex-start', // Align to left
    marginLeft: 0, // Remove left margin
  },

  profileTextContainer: {
    alignSelf: 'flex-start', // Align to the left
    marginBottom: 2, // Space between text and button
  },

  profileName: { // New style
    color: '#FFF',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'left',
  },
  profileEmail: {
    color: '#919191ff', // Dimmer color
    fontSize: 14, // Smaller size
    fontWeight: '500',
    textAlign: 'left',

  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', // Darker button
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start', // Align to left
    marginBottom: 10,
  },
  editProfileText: {
    color: '#DDD',
    fontSize: 12,
    marginRight: 6,
  },
  // --- Stats Bar Styles ---

  statsBox: {
    backgroundColor: 'rgba(0,0,0,0.25 )', // Black box with transparency
    borderRadius: 10,
    width: '100%', // Take full width
    // --- DROPSHADOW ---
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 10, // Android shadow
  },

  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },

  statItemFirst: {
    position: 'relative',
    left: 10,
  },

  statItemMiddle: {
    position: 'relative',
    left: 0, // <-- Play with this value (e.g., -5)
  },
  statItemLast: {
    position: 'relative',
    left: -10, // <-- Play with this value (e.g., -10, -15)
  },

  statIcon: { // New style for emoji
    fontSize: 20,
  },
  statValue: {
    color: '#FFF',
    fontSize: 14, // Larger text
    fontWeight: '700',
  },
  statLabel: {
    color: '#EEE', // Lighter text
    fontSize: 12,
  },
  // --- Section/List Styles ---
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 12,
  },
  sectionBody: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#3A3A3C',
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#3A3A3C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rowText: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
  },
  // --- Logout Styles ---
  logoutIconContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)', // Translucent red
  },
  logoutText: {
    color: '#EF4444', // Red text
  },
});