import { Ionicons } from '@expo/vector-icons';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Mock data
const weeklyData = [
  { day: 'Mon', completed: 3, total: 5 },
  { day: 'Tue', completed: 4, total: 5 },
  { day: 'Wed', completed: 5, total: 5 },
  { day: 'Thu', completed: 2, total: 5 },
  { day: 'Fri', completed: 4, total: 5 },
  { day: 'Sat', completed: 3, total: 5 },
  { day: 'Sun', completed: 4, total: 5 },
];

const habitStats = [
  { name: 'Morning Run', completion: 85, streak: 7 },
  { name: 'Read Book', completion: 72, streak: 5 },
  { name: 'Meditate', completion: 90, streak: 12 },
  { name: 'Drink Water', completion: 65, streak: 3 },
];

export default function StatsScreen() {
  const maxCompleted = Math.max(...weeklyData.map(d => d.completed));

  return (
    <ScrollView style={styles.container}>
      {/* Weekly Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Overview</Text>
        <View style={styles.chart}>
          {weeklyData.map((day, index) => {
            const height = (day.completed / maxCompleted) * 120;
            return (
              <View key={day.day} style={styles.chartBar}>
                <View style={[styles.bar, { height }]} />
                <Text style={styles.barLabel}>{day.completed}/{day.total}</Text>
                <Text style={styles.barDay}>{day.day}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Habit Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habit Performance</Text>
        {habitStats.map(habit => (
          <View key={habit.name} style={styles.habitStat}>
            <View style={styles.habitHeader}>
              <Text style={styles.habitName}>{habit.name}</Text>
              <Text style={styles.streakBadge}>🔥 {habit.streak}</Text>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${habit.completion}%` }
                  ]} 
                />
              </View>
              <Text style={styles.percentage}>{habit.completion}%</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Monthly Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Ionicons name="checkmark-circle" size={32} color="#10b981" />
          <Text style={styles.statNumber}>78%</Text>
          <Text style={styles.statLabel}>Success Rate</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="flame" size={32} color="#f59e0b" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Current Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="time" size={32} color="#6366f1" />
          <Text style={styles.statNumber}>45</Text>
          <Text style={styles.statLabel}>Total Hours</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="trophy" size={32} color="#8b5cf6" />
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Badges</Text>
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
  section: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    backgroundColor: '#6366f1',
    borderRadius: 10,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 4,
  },
  barDay: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
  },
  habitStat: {
    marginBottom: 20,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  streakBadge: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  percentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    minWidth: 40,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: '1%',
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
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});