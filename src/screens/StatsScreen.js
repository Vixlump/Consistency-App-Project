// import { Ionicons } from '@expo/vector-icons';
// import {
//     Dimensions,
//     ScrollView,
//     StyleSheet,
//     Text,
//     View,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// // Mock data
// const weeklyData = [
//   { day: 'Mon', completed: 3, total: 5 },
//   { day: 'Tue', completed: 4, total: 5 },
//   { day: 'Wed', completed: 5, total: 5 },
//   { day: 'Thu', completed: 2, total: 5 },
//   { day: 'Fri', completed: 4, total: 5 },
//   { day: 'Sat', completed: 3, total: 5 },
//   { day: 'Sun', completed: 4, total: 5 },
// ];

// const habitStats = [
//   { name: 'Morning Run', completion: 85, streak: 7 },
//   { name: 'Read Book', completion: 72, streak: 5 },
//   { name: 'Meditate', completion: 90, streak: 12 },
//   { name: 'Drink Water', completion: 65, streak: 3 },
// ];

// export default function StatsScreen() {
//   const maxCompleted = Math.max(...weeklyData.map(d => d.completed));

//   return (
//     <ScrollView style={styles.container}>
//       {/* Weekly Overview */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Weekly Overview</Text>
//         <View style={styles.chart}>
//           {weeklyData.map((day, index) => {
//             const height = (day.completed / maxCompleted) * 120;
//             return (
//               <View key={day.day} style={styles.chartBar}>
//                 <View style={[styles.bar, { height }]} />
//                 <Text style={styles.barLabel}>{day.completed}/{day.total}</Text>
//                 <Text style={styles.barDay}>{day.day}</Text>
//               </View>
//             );
//           })}
//         </View>
//       </View>

//       {/* Habit Performance */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Habit Performance</Text>
//         {habitStats.map(habit => (
//           <View key={habit.name} style={styles.habitStat}>
//             <View style={styles.habitHeader}>
//               <Text style={styles.habitName}>{habit.name}</Text>
//               <Text style={styles.streakBadge}>🔥 {habit.streak}</Text>
//             </View>
//             <View style={styles.progressContainer}>
//               <View style={styles.progressBar}>
//                 <View 
//                   style={[
//                     styles.progressFill, 
//                     { width: `${habit.completion}%` }
//                   ]} 
//                 />
//               </View>
//               <Text style={styles.percentage}>{habit.completion}%</Text>
//             </View>
//           </View>
//         ))}
//       </View>

//       {/* Monthly Stats */}
//       <View style={styles.statsGrid}>
//         <View style={styles.statCard}>
//           <Ionicons name="checkmark-circle" size={32} color="#10b981" />
//           <Text style={styles.statNumber}>78%</Text>
//           <Text style={styles.statLabel}>Success Rate</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Ionicons name="flame" size={32} color="#f59e0b" />
//           <Text style={styles.statNumber}>12</Text>
//           <Text style={styles.statLabel}>Current Streak</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Ionicons name="time" size={32} color="#6366f1" />
//           <Text style={styles.statNumber}>45</Text>
//           <Text style={styles.statLabel}>Total Hours</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Ionicons name="trophy" size={32} color="#8b5cf6" />
//           <Text style={styles.statNumber}>8</Text>
//           <Text style={styles.statLabel}>Badges</Text>
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
//   section: {
//     backgroundColor: '#fff',
//     margin: 20,
//     padding: 20,
//     borderRadius: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 20,
//   },
//   chart: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     height: 160,
//   },
//   chartBar: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   bar: {
//     width: 20,
//     backgroundColor: '#6366f1',
//     borderRadius: 10,
//     marginBottom: 8,
//   },
//   barLabel: {
//     fontSize: 10,
//     color: '#6b7280',
//     marginBottom: 4,
//   },
//   barDay: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#1f2937',
//   },
//   habitStat: {
//     marginBottom: 20,
//   },
//   habitHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   habitName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1f2937',
//   },
//   streakBadge: {
//     fontSize: 12,
//     color: '#f59e0b',
//     fontWeight: '600',
//   },
//   progressContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   progressBar: {
//     flex: 1,
//     height: 8,
//     backgroundColor: '#f3f4f6',
//     borderRadius: 4,
//     overflow: 'hidden',
//     marginRight: 12,
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: '#6366f1',
//     borderRadius: 4,
//   },
//   percentage: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1f2937',
//     minWidth: 40,
//   },
//   statsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   statCard: {
//     width: '48%',
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginBottom: 12,
//     marginHorizontal: '1%',
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
//     marginVertical: 8,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#6b7280',
//     textAlign: 'center',
//   },
// });

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

// --- Helper function to get dynamic dates ---
const getCurrentWeek = () => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sun) to 6 (Sat)
  const daysToSubtract = (dayOfWeek + 1) % 7;
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - daysToSubtract);

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    weekDates.push(d);
  }

  const startStr = weekDates[0].toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  const endStr = weekDates[6].toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

  return {
    dates: weekDates,
    dateRange: `${startStr} - ${endStr}`,
    todayIndex: daysToSubtract
  };
};

const DAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

// --- Initial Data ---
const INITIAL_HABITS = [
  {
    id: '1',
    title: 'Work',
    streak: 0,
    image: require('../../assets/images/work.png'),
    history: { 'Mon': false, 'Tue': false, 'Wed': false, 'Thu': false, 'Fri': false, 'Sat': false, 'Sun': false }
  },
  {
    id: '2',
    title: 'Drink 3L water',
    streak: 0,
    image: require('../../assets/images/water2.png'),
    history: { 'Mon': false, 'Tue': false, 'Wed': false, 'Thu': false, 'Fri': false, 'Sat': false, 'Sun': false }
  },
  {
    id: '3',
    title: 'Boxing',
    streak: 0,
    image: require('../../assets/images/boxing.png'),
    history: { 'Mon': false, 'Tue': false, 'Wed': false, 'Thu': false, 'Fri': false, 'Sat': false, 'Sun': false }
  },
];

// --- OverviewCard Component ---
// Now accepts an 'onToggle' prop
const OverviewCard = ({ habit, onPress, weekData, onToggle }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.cardHeader}>
        <Image source={habit.image} style={styles.cardImage} />
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{habit.title}</Text>
          <View style={styles.streakContainer}>
            <Text>🔥</Text>
            <Text style={styles.streakText}>{habit.streak} Days</Text>
          </View>
        </View>
      </View>

      <View style={styles.daysContainer}>
        {DAYS.map((day, index) => {
          const isToday = index === weekData.todayIndex;

          // --- NEW: Check if this day is in the future ---
          const isFuture = index > weekData.todayIndex;

          const dateNum = weekData.dates[index].getDate();

          // Check the history
          const isChecked = habit.history[day] === true;

          return (
            <View key={index} style={styles.dayColumn}>
              <Text style={styles.dayText}>{day}</Text>

              {/* --- CLICKABLE DAY BOX --- */}
              <TouchableOpacity
                style={[
                  styles.dayBox,
                  !isChecked && styles.dayBoxUnchecked,

                  isToday && styles.dayBoxToday,
                  isChecked && styles.dayBoxChecked,

                  isFuture && { opacity: 0.5 }
                ]}
                // 1. Stop propagation so we don't open the detail modal
                // 2. Call the toggle function
                // --- Disable interaction if it's a future date ---
                disabled={isFuture}
                onPress={(e) => {
                  e.stopPropagation();

                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

                  onToggle(habit.id, day);
                }}
              >
                {isChecked ? (
                  <Ionicons name="checkmark" size={16} color="#000" />
                ) : (
                  <Text style={[styles.dateText, isToday && styles.dateTextToday]}>
                    {dateNum}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

// --- Main Stats Screen ---
export default function StatsScreen({ navigation }) {
  const weekData = useMemo(() => getCurrentWeek(), []);

  // 1. Convert HABITS to state so we can update it
  const [habits, setHabits] = useState(INITIAL_HABITS);

  // 2. Function to handle check/uncheck
  const handleToggleHabit = (habitId, dayKey) => {
    setHabits(currentHabits =>
      currentHabits.map(habit => {
        if (habit.id === habitId) {
          // Create a copy of the history object
          const newHistory = { ...habit.history };
          // Flip the value (true -> false, false -> true)
          const wasChecked = newHistory[dayKey];
          newHistory[dayKey] = !wasChecked;

          // Optional: Simple streak logic (add 1 if checking, remove 1 if unchecking)
          // In a real app, you'd recalculate the full streak based on dates
          const newStreak = !wasChecked ? habit.streak + 1 : Math.max(0, habit.streak - 1);

          return { ...habit, history: newHistory, streak: newStreak };
        }
        return habit;
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.segmentedControl}>
          <TouchableOpacity style={[styles.segmentBtn, styles.segmentBtnActive]}>
            <Text style={styles.segmentTextActive}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.segmentBtn}>
            <Text style={styles.segmentText}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.segmentBtn}>
            <Text style={styles.segmentText}>Overall</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.dateRange}>{weekData.dateRange}</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {habits.map((habit) => (
          <OverviewCard
            key={habit.id}
            habit={habit}
            weekData={weekData}
            onPress={() => navigation.navigate('HabitDetail', { habit: habit })}
            onToggle={handleToggleHabit} // Pass the toggle function down
          />
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  segmentedControl: {
    flexDirection: 'row',
    // Removed backgroundColor and padding from here
    borderRadius: 20, // Keep border radius for alignment
    alignSelf: 'flex-start',
    marginBottom: 16,
    gap: 10,
  },
  segmentBtn: {
    paddingVertical: 6, // Increased vertical padding
    paddingHorizontal: 20, // Increased horizontal padding
    borderRadius: 10, // Slightly smaller border-radius for buttons
    backgroundColor: '#000', // Default background for inactive buttons
    borderWidth: 0.5, // Added border
    borderColor: '#fff', // Border color for inactive buttons
  },
  segmentBtnActive: {
    backgroundColor: '#FFF', // White background for active button
    borderColor: '#FFF', // White border for active button
  },
  segmentText: {
    color: '#DDD', // Lighter text for inactive buttons
    fontSize: 13,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: '#000',
    fontSize: 13,
    fontWeight: '600',
  },
  dateRange: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#0B0B0B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1F1F22',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardImage: {
    width: 80,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
  },
  cardTitleContainer: {
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  streakText: {
    color: '#E5E7EB',
    fontSize: 14,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayColumn: {
    alignItems: 'center',
    gap: 8,
  },
  dayText: {
    color: '#6B7280',
    fontSize: 12,
  },
  dayBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1E',
  },
  dayBoxChecked: {
    backgroundColor: '#FFF',
    borderWidth: 0,
  },
  dayBoxToday: {
    backgroundColor: '#2A2A2C',
    borderWidth: 1,
    borderColor: '#555',
  },
  dayBoxUnchecked: {
  },
  dateText: {
    color: '#555',
    fontWeight: '600',
  },
  dateTextToday: {
    color: '#FFF',
  }
});