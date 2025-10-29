import { Ionicons } from '@expo/vector-icons';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

// Mock data
const userStats = {
  totalXP: 450,
  level: 3,
  nextLevelXP: 600,
  currentStreak: 7,
  longestStreak: 12,
};

const badges = [
  { id: '1', name: 'First Step', description: 'Complete your first habit', earned: true, icon: 'footsteps' },
  { id: '2', name: 'Week Warrior', description: '7-day streak', earned: true, icon: 'calendar' },
  { id: '3', name: 'Habit Hero', description: '21-day streak', earned: false, icon: 'trophy' },
  { id: '4', name: 'Consistency King', description: '50-day streak', earned: false, icon: 'crown' },
  { id: '5', name: 'Early Bird', description: 'Complete 5 morning habits', earned: false, icon: 'sunny' },
  { id: '6', name: 'Bookworm', description: 'Read for 10 days straight', earned: true, icon: 'library' },
];

export default function RewardsScreen() {
  const progress = (userStats.totalXP / userStats.nextLevelXP) * 100;

  return (
    <ScrollView style={styles.container}>
      {/* XP Progress */}
      <View style={styles.xpCard}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Level {userStats.level}</Text>
        </View>
        <Text style={styles.xpTotal}>{userStats.totalXP} XP</Text>
        <Text style={styles.xpToNext}>
          {userStats.nextLevelXP - userStats.totalXP} XP to next level
        </Text>
        
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* Streak Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userStats.currentStreak}</Text>
          <Text style={styles.statLabel}>Current Streak</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userStats.longestStreak}</Text>
          <Text style={styles.statLabel}>Longest Streak</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{badges.filter(b => b.earned).length}</Text>
          <Text style={styles.statLabel}>Badges Earned</Text>
        </View>
      </View>

      {/* Badges Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Badges</Text>
        <View style={styles.badgesGrid}>
          {badges.map(badge => (
            <View key={badge.id} style={styles.badgeItem}>
              <View style={[
                styles.badgeIcon,
                !badge.earned && styles.badgeIconLocked
              ]}>
                <Ionicons 
                  name={badge.earned ? badge.icon : 'lock-closed'} 
                  size={24} 
                  color={badge.earned ? '#6366f1' : '#9ca3af'} 
                />
              </View>
              <Text style={styles.badgeName}>{badge.name}</Text>
              <Text style={styles.badgeDescription}>{badge.description}</Text>
              <View style={[
                styles.earnedTag,
                !badge.earned && styles.earnedTagLocked
              ]}>
                <Text style={[
                  styles.earnedTagText,
                  !badge.earned && styles.earnedTagTextLocked
                ]}>
                  {badge.earned ? 'Earned' : 'Locked'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  xpCard: {
    backgroundColor: '#6366f1',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  levelBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  levelText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  xpTotal: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  xpToNext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 16,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeItem: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeIconLocked: {
    backgroundColor: '#f3f4f6',
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  badgeDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 12,
  },
  earnedTag: {
    backgroundColor: '#eef2ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  earnedTagLocked: {
    backgroundColor: '#f3f4f6',
  },
  earnedTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6366f1',
  },
  earnedTagTextLocked: {
    color: '#9ca3af',
  },
});