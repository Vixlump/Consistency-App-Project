// import { Ionicons } from '@expo/vector-icons';
// import {
//     ScrollView,
//     StyleSheet,
//     Text,
//     View
// } from 'react-native';

// // Mock data
// const userStats = {
//   totalXP: 450,
//   level: 3,
//   nextLevelXP: 600,
//   currentStreak: 7,
//   longestStreak: 12,
// };

// const badges = [
//   { id: '1', name: 'First Step', description: 'Complete your first habit', earned: true, icon: 'footsteps' },
//   { id: '2', name: 'Week Warrior', description: '7-day streak', earned: true, icon: 'calendar' },
//   { id: '3', name: 'Habit Hero', description: '21-day streak', earned: false, icon: 'trophy' },
//   { id: '4', name: 'Consistency King', description: '50-day streak', earned: false, icon: 'crown' },
//   { id: '5', name: 'Early Bird', description: 'Complete 5 morning habits', earned: false, icon: 'sunny' },
//   { id: '6', name: 'Bookworm', description: 'Read for 10 days straight', earned: true, icon: 'library' },
// ];

// export default function RewardsScreen() {
//   const progress = (userStats.totalXP / userStats.nextLevelXP) * 100;

//   return (
//     <ScrollView style={styles.container}>
//       {/* XP Progress */}
//       <View style={styles.xpCard}>
//         <View style={styles.levelBadge}>
//           <Text style={styles.levelText}>Level {userStats.level}</Text>
//         </View>
//         <Text style={styles.xpTotal}>{userStats.totalXP} XP</Text>
//         <Text style={styles.xpToNext}>
//           {userStats.nextLevelXP - userStats.totalXP} XP to next level
//         </Text>

//         <View style={styles.progressBar}>
//           <View style={[styles.progressFill, { width: `${progress}%` }]} />
//         </View>
//       </View>

//       {/* Streak Stats */}
//       <View style={styles.statsGrid}>
//         <View style={styles.statItem}>
//           <Text style={styles.statNumber}>{userStats.currentStreak}</Text>
//           <Text style={styles.statLabel}>Current Streak</Text>
//         </View>
//         <View style={styles.statItem}>
//           <Text style={styles.statNumber}>{userStats.longestStreak}</Text>
//           <Text style={styles.statLabel}>Longest Streak</Text>
//         </View>
//         <View style={styles.statItem}>
//           <Text style={styles.statNumber}>{badges.filter(b => b.earned).length}</Text>
//           <Text style={styles.statLabel}>Badges Earned</Text>
//         </View>
//       </View>

//       {/* Badges Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Your Badges</Text>
//         <View style={styles.badgesGrid}>
//           {badges.map(badge => (
//             <View key={badge.id} style={styles.badgeItem}>
//               <View style={[
//                 styles.badgeIcon,
//                 !badge.earned && styles.badgeIconLocked
//               ]}>
//                 <Ionicons 
//                   name={badge.earned ? badge.icon : 'lock-closed'} 
//                   size={24} 
//                   color={badge.earned ? '#6366f1' : '#9ca3af'} 
//                 />
//               </View>
//               <Text style={styles.badgeName}>{badge.name}</Text>
//               <Text style={styles.badgeDescription}>{badge.description}</Text>
//               <View style={[
//                 styles.earnedTag,
//                 !badge.earned && styles.earnedTagLocked
//               ]}>
//                 <Text style={[
//                   styles.earnedTagText,
//                   !badge.earned && styles.earnedTagTextLocked
//                 ]}>
//                   {badge.earned ? 'Earned' : 'Locked'}
//                 </Text>
//               </View>
//             </View>
//           ))}
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8fafc',
//   },
//   xpCard: {
//     backgroundColor: '#6366f1',
//     margin: 20,
//     padding: 24,
//     borderRadius: 16,
//     alignItems: 'center',
//   },
//   levelBadge: {
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   levelText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   xpTotal: {
//     color: '#fff',
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   xpToNext: {
//     color: 'rgba(255, 255, 255, 0.8)',
//     fontSize: 14,
//     marginBottom: 16,
//   },
//   progressBar: {
//     width: '100%',
//     height: 8,
//     backgroundColor: 'rgba(255, 255, 255, 0.3)',
//     borderRadius: 4,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: '#fff',
//     borderRadius: 4,
//   },
//   statsGrid: {
//     flexDirection: 'row',
//     marginHorizontal: 20,
//     marginBottom: 24,
//   },
//   statItem: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginHorizontal: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   statNumber: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#6b7280',
//     textAlign: 'center',
//   },
//   section: {
//     paddingHorizontal: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 16,
//   },
//   badgesGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   badgeItem: {
//     width: '48%',
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   badgeIcon: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#eef2ff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   badgeIconLocked: {
//     backgroundColor: '#f3f4f6',
//   },
//   badgeName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1f2937',
//     marginBottom: 4,
//     textAlign: 'center',
//   },
//   badgeDescription: {
//     fontSize: 12,
//     color: '#6b7280',
//     textAlign: 'center',
//     marginBottom: 12,
//   },
//   earnedTag: {
//     backgroundColor: '#eef2ff',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },
//   earnedTagLocked: {
//     backgroundColor: '#f3f4f6',
//   },
//   earnedTagText: {
//     fontSize: 10,
//     fontWeight: '600',
//     color: '#6366f1',
//   },
//   earnedTagTextLocked: {
//     color: '#9ca3af',
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { REWARD_IMAGES } from '../data/rewards';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

// --- MODIFIED: Modal now handles "isUnlocked" ---
const AchievementModal = ({ reward, onClose, isUnlocked }) => {
  if (!reward) return null;

  return (
    <Modal
      animationType="fade" // Switched to fade
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <ImageBackground source={reward.image} style={modalStyles.modalBackground}>
        <BlurView intensity={90} tint="dark" style={modalStyles.modalBlur}>

          {/* 3. "New Achievement" Badge (Dynamic) */}
          <View style={[
            modalStyles.badgeContainer,
            !isUnlocked && modalStyles.badgeLocked // Style for "Locked"
          ]}>
            <Text style={modalStyles.badgeText}>
              {isUnlocked ? 'New Achievement' : 'Locked'}
            </Text>
          </View>

          {/* 4. Close Button */}
          <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={32} color="#FFF" />
          </TouchableOpacity>

          {/* 5. Main Content */}
          <View style={modalStyles.contentContainer}>
            <Text style={modalStyles.title}>{reward.title}</Text>

            {/* 6. Center Image (Dynamic opacity) */}
            <View style={[
              modalStyles.centerImageContainer,
              !isUnlocked && modalStyles.lockedImage // Dims the locked image
            ]}>
              <Image
                source={reward.image}
                style={modalStyles.centerImage}
              // resizeMode="cover" is default, which works with your zoom
              />
            </View>

            {/* 7. Quote Box (Dynamic content) */}
            <View style={modalStyles.quoteBox}>
              {/* 1. Always show the quote */}
              <Text style={modalStyles.quoteText}>“{reward.quote}”</Text>

              {/* 2. Always show the *condition*, but style it differently */}
              <Text style={[
                modalStyles.conditionText,
                !isUnlocked && modalStyles.lockedConditionText // New style for locked text
              ]}>
                {isUnlocked ? (
                  <Ionicons name="trophy" size={14} color="#FCD34D" /> // Gold trophy
                ) : (
                  <Ionicons name="lock-closed" size={14} color="#9CA3AF" /> // Grey lock
                )}
                {' '}{reward.condition}
              </Text>
            </View>

            {/* 8. "Got it" Button (Dynamic text) */}
            <TouchableOpacity style={modalStyles.gotItButton} onPress={onClose}>
              <Text style={modalStyles.gotItButtonText}>
                {isUnlocked ? 'Got it' : 'Back'}
              </Text>
            </TouchableOpacity>
          </View>

        </BlurView>
      </ImageBackground>
    </Modal>
  );
}


export default function RewardsScreen() {
  const [unlocked, setUnlocked] = useState(
    new Set(['7', '9', '11', '15', '21']) // Using your new Set
  );

  // --- MODIFIED: State for modal ---
  const [selectedReward, setSelectedReward] = useState(null);
  const [isModalUnlocked, setIsModalUnlocked] = useState(false); // Track if tapped item is locked

  const handleOpenModal = (reward, isUnlocked) => {
    setSelectedReward(reward);
    setIsModalUnlocked(isUnlocked); // Store if it's locked or not
  };

  const handleCloseModal = () => {
    setSelectedReward(null);
  };

  // This function renders each grid item
  const renderItem = ({ item }) => {
    const isUnlocked = unlocked.has(item.id);

    return (
      <TouchableOpacity
        style={[styles.imageContainer, !isUnlocked && styles.locked]}
        // --- MODIFIED: Tap is no longer disabled ---
        onPress={() => handleOpenModal(item, isUnlocked)}
        activeOpacity={0.7}
      >
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      <FlatList
        data={REWARD_IMAGES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        style={styles.list}
      />

      {/* --- MODIFIED: Render the modal component --- */}
      <AchievementModal
        reward={selectedReward}
        onClose={handleCloseModal}
        isUnlocked={isModalUnlocked} // Pass the status to the modal
      />
    </SafeAreaView>
  );
}

// --- Your Grid Styles (Unchanged) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    padding: 10, // Your new padding
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#000',
  },
  locked: {
    opacity: 0.5,
  },
});

// --- MODIFIED: Modal Styles (Kept your "zoom" crop) ---
const modalStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
  },
  modalBlur: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  badgeContainer: {
    position: 'absolute',
    top: 60,
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  badgeLocked: { // Style for the "Locked" badge
    backgroundColor: 'rgba(100, 100, 100, 0.8)',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 15,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  centerImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: '#000', // Added background for safety
  },
  lockedImage: { // Style to dim the locked image
    opacity: 0.6,
  },
  centerImage: { // Your "zoom" crop style
    width: '110%',
    height: '110%',
    alignSelf: 'center',
    top: '-5%',
  },
  quoteBox: {
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%', // Fill width
  },
  quoteText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  conditionText: {
    color: '#FCD34D', // Gold color
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  lockedConditionText: {
    color: '#9CA3AF', // Grey color for locked text
  },

  gotItButton: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 24,
  },
  gotItButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});