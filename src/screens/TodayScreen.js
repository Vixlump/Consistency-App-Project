// import { Ionicons } from '@expo/vector-icons';
// import { useState } from 'react';
// import {
//     RefreshControl,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// // Mock data
// const mockHabits = [
//   {
//     id: '1',
//     title: 'Morning Run',
//     streak: 5,
//     completed: false,
//     xp: 10,
//     icon: 'fitness',
//   },
//   {
//     id: '2',
//     title: 'Read 20 mins',
//     streak: 3,
//     completed: true,
//     xp: 10,
//     icon: 'book',
//   },
//   {
//     id: '3',
//     title: 'Meditate',
//     streak: 7,
//     completed: false,
//     xp: 10,
//     icon: 'leaf',
//   },
// ];

// export default function TodayScreen({ navigation }) {
//   const [habits, setHabits] = useState(mockHabits);
//   const [refreshing, setRefreshing] = useState(false);
//   const [dailyQuote, setDailyQuote] = useState("The secret of getting ahead is getting started.");

//   const onRefresh = () => {
//     setRefreshing(true);
//     // Simulate data refresh
//     setTimeout(() => setRefreshing(false), 1000);
//   };

//   const toggleHabitCompletion = (habitId) => {
//     setHabits(habits.map(habit => 
//       habit.id === habitId 
//         ? { ...habit, completed: !habit.completed }
//         : habit
//     ));
//   };

//   const totalXP = habits.filter(h => h.completed).length * 10;
//   const completedCount = habits.filter(h => h.completed).length;

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         {/* Daily Progress */}
//         <View style={styles.progressSection}>
//           <Text style={styles.dateText}>{new Date().toDateString()}</Text>
//           <Text style={styles.progressText}>
//             {completedCount} of {habits.length} habits completed
//           </Text>
//           <View style={styles.xpBadge}>
//             <Ionicons name="star" size={16} color="#f59e0b" />
//             <Text style={styles.xpText}>{totalXP} XP Today</Text>
//           </View>
//         </View>

//         {/* Daily Quote */}
//         <View style={styles.quoteCard}>
//           <Ionicons name="quote" size={24} color="#6366f1" />
//           <Text style={styles.quoteText}>"{dailyQuote}"</Text>
//         </View>

//         {/* Habits List */}
//         <View style={styles.habitsSection}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Today's Habits</Text>
//             <TouchableOpacity 
//               style={styles.addButton}
//               onPress={() => navigation.navigate('AddHabit')}
//             >
//               <Ionicons name="add" size={24} color="#6366f1" />
//             </TouchableOpacity>
//           </View>

//           {habits.map(habit => (
//             <HabitCard
//               key={habit.id}
//               habit={habit}
//               onToggle={() => toggleHabitCompletion(habit.id)}
//             />
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const HabitCard = ({ habit, onToggle }) => {
//   const getIconName = (icon) => {
//     const icons = {
//       fitness: 'fitness',
//       book: 'book',
//       leaf: 'leaf',
//       water: 'water',
//       school: 'school',
//     };
//     return icons[icon] || 'checkbox';
//   };

//   return (
//     <View style={styles.habitCard}>
//       <View style={styles.habitInfo}>
//         <View style={styles.habitIcon}>
//           <Ionicons name={getIconName(habit.icon)} size={24} color="#6366f1" />
//         </View>
//         <View style={styles.habitDetails}>
//           <Text style={styles.habitTitle}>{habit.title}</Text>
//           <Text style={styles.streakText}>
//             🔥 {habit.streak} day streak • +{habit.xp} XP
//           </Text>
//         </View>
//       </View>
//       <TouchableOpacity
//         style={[
//           styles.checkButton,
//           habit.completed && styles.checkButtonCompleted
//         ]}
//         onPress={onToggle}
//       >
//         <Ionicons 
//           name="checkmark" 
//           size={24} 
//           color={habit.completed ? '#fff' : '#e5e7eb'} 
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8fafc',
//   },
//   progressSection: {
//     padding: 20,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e5e7eb',
//   },
//   dateText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1f2937',
//     marginBottom: 4,
//   },
//   progressText: {
//     fontSize: 14,
//     color: '#6b7280',
//     marginBottom: 8,
//   },
//   xpBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fffbeb',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 16,
//     alignSelf: 'flex-start',
//   },
//   xpText: {
//     color: '#d97706',
//     fontWeight: '600',
//     marginLeft: 4,
//   },
//   quoteCard: {
//     backgroundColor: '#eef2ff',
//     margin: 20,
//     padding: 16,
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   quoteText: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 14,
//     fontStyle: 'italic',
//     color: '#4f46e5',
//   },
//   habitsSection: {
//     flex: 1,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1f2937',
//   },
//   addButton: {
//     padding: 4,
//   },
//   habitCard: {
//     backgroundColor: '#fff',
//     marginHorizontal: 20,
//     marginBottom: 12,
//     padding: 16,
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   habitInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   habitIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#eef2ff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   habitDetails: {
//     flex: 1,
//   },
//   habitTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1f2937',
//     marginBottom: 4,
//   },
//   streakText: {
//     fontSize: 12,
//     color: '#6b7280',
//   },
//   checkButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     borderWidth: 2,
//     borderColor: '#e5e7eb',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkButtonCompleted: {
//     backgroundColor: '#10b981',
//     borderColor: '#10b981',
//   },
// });

// HomeScreen.js
import LogsMapScreen from './LogsMapScreen';

export default function TodayScreen() {
  return <LogsMapScreen />; // replace with your normal Home later
}