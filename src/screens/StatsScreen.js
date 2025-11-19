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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

// --- 1. Helper Functions ---
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

const getCurrentMonth = () => new Date().toLocaleDateString('en-US', { month: 'long' });
const getCurrentYear = () => new Date().getFullYear().toString();

const DAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const HEATMAP_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// --- 2. Initial Data (Restored) ---
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
  {
    id: '4',
    title: 'Sleep early',
    streak: 0,
    image: require('../../assets/images/sleeping1.png'), 
    history: { 'Mon': false, 'Tue': false, 'Wed': false, 'Thu': false, 'Fri': false, 'Sat': false, 'Sun': false }
  },
];

// --- 3. Sub-Components ---

// A. Weekly View (Checkboxes)
const WeeklyView = ({ habit, weekData, onToggle }) => (
  <View style={styles.daysContainer}>
    {DAYS.map((day, index) => {
      const isToday = index === weekData.todayIndex;
      const isFuture = index > weekData.todayIndex;
      const dateNum = weekData.dates[index].getDate();
      const isChecked = habit.history[day] === true;

      return (
        <View key={index} style={styles.dayColumn}>
          <Text style={styles.dayText}>{day}</Text>
          <TouchableOpacity
            style={[
              styles.dayBox,
              !isChecked && styles.dayBoxUnchecked,
              isToday && styles.dayBoxToday,     
              isChecked && styles.dayBoxChecked, 
              isFuture && { opacity: 0.3 }
            ]}
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
);

// B. Monthly Grid View
const MonthlyGridView = () => {
  return (
    <View style={styles.monthlyGridContainer}>
      {Array.from({ length: 4 }).map((_, rowIndex) => (
        <View key={rowIndex} style={styles.monthlyGridRow}>
          {Array.from({ length: 7 }).map((_, colIndex) => {
             const isActive = Math.random() > 0.7; 
             return (
               <View 
                 key={colIndex} 
                 style={[
                   styles.miniBox, 
                   isActive ? styles.miniBoxActive : styles.miniBoxInactive
                 ]} 
               />
             );
          })}
        </View>
      ))}
    </View>
  );
};

// C. Yearly Heatmap View
const YearlyHeatMapView = () => {
  return (
    <View style={styles.yearlyContainer}>
      <View style={styles.yearlyLabels}>
        {HEATMAP_LABELS.map((label, i) => (
          <Text key={i} style={styles.yearlyLabelText}>{label}</Text>
        ))}
      </View>
      <View style={styles.yearlyGrid}>
        {Array.from({ length: 31 }).map((_, colIndex) => (
          <View key={colIndex} style={styles.yearlyColumn}>
            {Array.from({ length: 7 }).map((_, rowIndex) => {
              const isActive = Math.random() > 0.85; 
              return (
                <View 
                  key={rowIndex} 
                  style={[
                    styles.yearlyBox, 
                    isActive ? styles.miniBoxActive : styles.miniBoxInactive
                  ]} 
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

// D. Overview Card
const OverviewCard = ({ habit, onPress, onLongPress, weekData, onToggle, selectedTab }) => {
  const isWeekly = selectedTab === 'Weekly';
  const isMonthly = selectedTab === 'Monthly';
  
  return (
    <TouchableOpacity 
      style={[styles.card, isMonthly && styles.cardGrid]} 
      onPress={onPress} 
      onLongPress={onLongPress}
      delayLongPress={500}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Image 
          source={habit.image} 
          style={[styles.cardImage, isMonthly && styles.cardImageGrid]} 
        />
        
        <View style={styles.cardTitleContainer}>
          <Text 
            style={[styles.cardTitle, isMonthly && styles.cardTitleGrid]} 
            numberOfLines={1}
          >
            {habit.title}
          </Text>
          <View style={styles.streakContainer}>
            <Text style={{ fontSize: isWeekly ? 12 : 10 }}>🔥</Text>
            <Text 
               style={[styles.streakText, isMonthly && styles.streakTextGrid]}
            >
              {habit.streak} Days
            </Text>
          </View>
        </View>
      </View>

      {selectedTab === 'Weekly' && (
        <WeeklyView habit={habit} weekData={weekData} onToggle={onToggle} />
      )}
      {selectedTab === 'Monthly' && (
        <MonthlyGridView />
      )}
      {selectedTab === 'Overall' && (
        <YearlyHeatMapView />
      )}
    </TouchableOpacity>
  );
};

// --- 4. Main Screen ---
export default function StatsScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('Weekly');
  const [habits, setHabits] = useState(INITIAL_HABITS);
  
  const weekData = useMemo(() => getCurrentWeek(), []);
  const currentMonth = useMemo(() => getCurrentMonth(), []);
  const currentYear = useMemo(() => getCurrentYear(), []);

  let headerTitle = weekData.dateRange;
  if (selectedTab === 'Monthly') headerTitle = currentMonth;
  if (selectedTab === 'Overall') headerTitle = currentYear;

  const handleToggleHabit = (habitId, dayKey) => {
    setHabits(currentHabits =>
      currentHabits.map(habit => {
        if (habit.id === habitId) {
          const newHistory = { ...habit.history };
          const wasChecked = newHistory[dayKey];
          newHistory[dayKey] = !wasChecked;
          const newStreak = !wasChecked ? habit.streak + 1 : Math.max(0, habit.streak - 1);
          return { ...habit, history: newHistory, streak: newStreak };
        }
        return habit;
      })
    );
  };

  const handleDelete = (habitId) => {
    setHabits(prev => prev.filter(h => h.id !== habitId));
  };

  const showOptions = (habit) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      habit.title,
      'Manage this habit',
      [
        { text: 'Delete Habit', style: 'destructive', onPress: () => handleDelete(habit.id) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.segmentedControl}>
          {['Weekly', 'Monthly', 'Overall'].map((tab) => (
            <TouchableOpacity 
              key={tab}
              style={[styles.segmentBtn, selectedTab === tab && styles.segmentBtnActive]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={selectedTab === tab ? styles.segmentTextActive : styles.segmentText}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.dateRange}>{headerTitle}</Text>
      </View>

      {/* --- Empty State Logic --- */}
      {habits.length === 0 ? (
        <View style={styles.emptyContainer}>
           <Image 
             source={require('../../assets/images/image 59.png')} 
             style={styles.emptyImage}
             resizeMode="contain"
           />
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            selectedTab === 'Monthly' && styles.scrollContentGrid
          ]}
        >
          {habits.map((habit) => (
            <OverviewCard
              key={habit.id}
              habit={habit}
              weekData={weekData}
              selectedTab={selectedTab} 
              onPress={() => navigation.navigate('HabitDetail', { habit: habit })}
              onToggle={handleToggleHabit}
              onLongPress={() => showOptions(habit)}
            />
          ))}
          <View style={{ height: 20, width: '100%' }} />
        </ScrollView>
      )}
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
    alignSelf: 'flex-start',
    marginBottom: 16,
    gap: 10,
  },
  segmentBtn: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#000',
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  segmentBtnActive: {
    backgroundColor: '#FFF',
    borderColor: '#FFF',
  },
  segmentText: {
    color: '#DDD',
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
  // --- Empty State Styles ---
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100, 
  },
  emptyImage: {
    width: 150,
    height: 150,
  },
  // ------------------------
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  scrollContentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#0B0B0B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1F1F22',
    width: '100%', 
  },
  cardGrid: {
    width: '48%', 
    padding: 12,  
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
  cardImageGrid: { 
    width: 65, 
    height: 48,
    marginRight: 8,
  },
  cardTitleContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  cardTitle: { 
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardTitleGrid: { 
    fontSize: 14, 
    marginBottom: 2,
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
  streakTextGrid: { 
    fontSize: 11,
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
  },
  dayBoxUnchecked: {
    backgroundColor: '#1C1C1E', 
  },
  dayBoxChecked: {
    backgroundColor: '#FFF',
  },
  dayBoxToday: {
    backgroundColor: '#2A2A2C',
    borderWidth: 1,
    borderColor: '#555',
  },
  dateText: {
    color: '#555',
    fontWeight: '600',
  },
  dateTextToday: {
    color: '#FFF',
  },
  monthlyGridContainer: {
    gap: 7, 
  },
  monthlyGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
  },
  miniBox: {
    width: 20, 
    height: 20,
    borderRadius: 4,
  },
  miniBoxActive: {
    backgroundColor: '#FFF',
  },
  miniBoxInactive: {
    backgroundColor: '#1C1C1E', 
  },
  yearlyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  yearlyLabels: {
    gap: 2,
    marginRight: 8,
    paddingTop: 0, 
  },
  yearlyLabelText: {
    color: '#555',
    fontSize: 8,
    height: 10, 
    lineHeight: 10,
    fontWeight: '700',
  },
  yearlyGrid: {
    flexDirection: 'row',
    flex: 1,
    gap: 3, 
  },
  yearlyColumn: {
    gap: 4, 
  },
  yearlyBox: {
    width: 8.2,
    height: 8.2,
    borderRadius: 2,
  },
});