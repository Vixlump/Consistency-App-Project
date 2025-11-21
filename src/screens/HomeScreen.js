import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';

// --- Icon Imports ---
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Swipeable } from 'react-native-gesture-handler';

// -----------------------------------------------------------------
// --- 1. Ticker Component (HeaderQuoteScroll) ---
// -----------------------------------------------------------------
const REPEAT_COUNT = 4;

function HeaderQuoteScroll({
  messages = [
    'Better everyday',
    'Keep going',
  ],
  separator = '     ✦     ',
  speed = 10,
}) {
  const [contentWidth, setContentWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const [ready, setReady] = useState(false);

  const line = useMemo(() => messages.join(separator) + separator, [messages, separator]);

  useEffect(() => {
    if (!contentWidth || !ready) return;
    const distance = contentWidth;
    const duration = (distance / speed) * 1000;
    translateX.setValue(0);
    const loop = Animated.loop(
      Animated.timing(translateX, {
        toValue: -distance,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [contentWidth, speed, translateX, ready]);

  return (
    <View style={tickerStyles.clip}>
      <Animated.View
        style={[
          tickerStyles.track,
          { transform: [{ translateX }] },
        ]}
      >
        {Array(REPEAT_COUNT).fill(null).map((_, index) => (
          <View
            key={index}
            style={{ flexShrink: 0 }} // Fix for "..." bug
            onLayout={
              index === 0
                ? (e) => {
                  const newWidth = e.nativeEvent.layout.width;
                  if (newWidth > 0 && newWidth !== contentWidth) {
                    setContentWidth(newWidth);
                  }
                  if (newWidth > 0 && !ready) {
                    setReady(true);
                  }
                }
                : undefined
            }
          >
            <Text
              style={tickerStyles.text}
              numberOfLines={1}
            >
              {line}
            </Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

// --- Ticker Styles ---
const tickerStyles = StyleSheet.create({
  clip: {
    overflow: 'hidden',
    height: 28,
    width: '100%',
    backgroundColor: '#000',
  },
  track: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#E5E7EB',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});


// -----------------------------------------------------------------
// --- 2. HabitCard Component ---
// -----------------------------------------------------------------
function HabitCard({
  habit,
  isSelected,
  onPress,
  onComplete,
  onFail,
  onDelete,
  onEdit,
  onSwipeOpen,
  swipeableRef
}) {
  const { iconEmoji, title, subtitle, streak, imageSource, status } = habit;
  const isSkipped = status === 'Skipped';
  const isDone = status === 'Completed';


  const renderRightActions = (progress, dragX) => {
    const opacity = dragX.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[cardStyles.rightActionContainer, { opacity }]}>
        <TouchableOpacity style={cardStyles.editButton} onPress={onEdit}>
          <Ionicons name="pencil" size={24} color="#000" />
          <Text style={cardStyles.actionButtonText}>Edit Habit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={cardStyles.deleteButton} onPress={onDelete}>
          <Ionicons name="trash-bin" size={24} color="#FFF" />
          <Text style={[cardStyles.actionButtonText, { color: '#FFF' }]}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={onSwipeOpen}
      friction={2}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <ImageBackground
          source={imageSource}
          style={cardStyles.card}
          imageStyle={{ borderRadius: 20 }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
            locations={[0.5, 0.8, 1.0]}
            style={cardStyles.gradientOverlay}
          >
            {/* Status Badge */}
            <BlurView
              style={[
                cardStyles.statusBadge,
                isSkipped ? cardStyles.skippedStatusBadge :
                  isDone ? cardStyles.doneStatusBadge :
                    cardStyles.inProgressStatusBadge
              ]}
              tint="dark"
              intensity={90}
            >
              {isSkipped ? <MaterialCommunityIcons name="close-thick" size={14} color="#FFF" /> :
                isDone ? <FontAwesome name="check" size={14} color="#FFF" /> :
                  <Ionicons name="ellipse" size={8} color="#FCD34D" />
              }
              <Text style={cardStyles.statusText}>{status}</Text>
            </BlurView>

            {/* Bottom Content */}
            <View style={cardStyles.bottomContentContainer}>
              <View style={cardStyles.mainContent}>
                <View style={cardStyles.mainTextContainer}>
                  <Text style={cardStyles.emojiIcon}>{iconEmoji}</Text>
                  <View style={cardStyles.mainText}>
                    <Text style={cardStyles.cardTitle}>{title}</Text>
                    <Text style={cardStyles.cardSubtitle}>{subtitle}</Text>
                  </View>
                </View>
                <BlurView style={cardStyles.streakBadge} tint="dark" intensity={90}>
                  <Text style={cardStyles.streakText}>Streak | {streak}</Text>
                </BlurView>
              </View>

              {/* Visual Footer */}
              <View style={cardStyles.footer}>
                {(isSkipped || isDone)
                  ? <Ionicons name="refresh-circle-outline" size={16} color="#9CA3AF" />
                  : <MaterialIcons name="touch-app" size={25} color="#DEDEDE" />
                }
                <Text style={cardStyles.footerText}>
                  {(isSkipped || isDone) ? 'Tap to reset' : 'Tap to complete or skip'}
                </Text>
              </View>
            </View>

            {/* Selection Overlay (for To-dos tab) */}
            {isSelected && (
              <BlurView style={cardStyles.selectionOverlay} tint="dark" intensity={90}>
                <View style={cardStyles.buttonContainer}>
                  <TouchableOpacity
                    style={[cardStyles.button, cardStyles.failButton]}
                    onPress={onFail}
                  >
                    <MaterialCommunityIcons name="close-thick" size={26} color="#FFF" style={cardStyles.icon} />
                    <Text style={cardStyles.buttonText}>I failed today, but I'll try again tomorrow</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[cardStyles.button, cardStyles.completeButton]}
                    onPress={onComplete}
                  >
                    <FontAwesome name="check" size={24} color="#FFF" style={cardStyles.icon} />
                    <Text style={cardStyles.buttonText}>I've completed the task.</Text>
                  </TouchableOpacity>
                </View>
              </BlurView>
            )}

          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </Swipeable>
  );
}

// --- Card Styles ---
const cardStyles = StyleSheet.create({
  card: {
    height: 300,
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFF',
    justifyContent: 'space-between',
  },
  gradientOverlay: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'space-between',
    padding: 16,
  },
  statusBadge: {
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    overflow: 'hidden',
  },
  inProgressStatusBadge: {
    borderColor: 'rgba(252, 211, 77, 0.4)',
  },
  skippedStatusBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  doneStatusBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderColor: 'rgba(34, 197, 94, 0.4)',
  },
  statusText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomContentContainer: {
    width: '100%',
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  mainTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  emojiIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  mainText: {
    flex: 1,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#E5E7EB',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 15,
  },
  streakBadge: {
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(80, 80, 80, 0.8)',
    alignSelf: 'flex-end',
    overflow: 'hidden',
  },
  streakText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    marginBottom: 10,
  },
  footerText: {
    color: '#DEDEDE',
    marginLeft: 8,
    fontSize: 12,
    fontWeight: 'bold'
  },
  selectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 15,
    gap: 15,
  },
  button: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
  },
  failButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
  },
  completeButton: {
    backgroundColor: 'rgba(34, 197, 94, 0.8)',
  },
  icon: {
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
  },
  rightActionContainer: {
    flexDirection: 'column',
    width: 120,
    height: 190,
    marginTop: 55,
    marginRight: 17,
    gap: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 10,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 10,
  },
  actionButtonText: {
    color: '#000',
    fontWeight: '600',
    marginTop: 4,
    fontSize: 12,
  },
});


// -----------------------------------------------------------------
// --- 3. TabButton Component ---
// -----------------------------------------------------------------
function TabButton({ label, isActive, onPress }) {
  return (
    <TouchableOpacity
      style={[tabStyles.tab, isActive ? tabStyles.activeTab : null]}
      onPress={onPress}
    >
      <Text style={[tabStyles.tabText, isActive ? tabStyles.activeTabText : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// --- TabButton Styles ---
const tabStyles = StyleSheet.create({
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#FFF',
  },
  activeTab: {
    backgroundColor: '#FFF',
  },
  tabText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#000',
  },
});

// -----------------------------------------------------------------
// --- 4. NEW: EmptyState Component ---
// -----------------------------------------------------------------
function EmptyState({ selectedTab, totalHabitCount, onGetStarted, onViewProgress }) {

  // Condition 1: No habits at all
  if (totalHabitCount === 0) {
    return (
      <View style={emptyStyles.container}>
        <Ionicons name="add-circle-outline" size={40} color="#fff" />
        <Text style={emptyStyles.title}>No habit found</Text>
        <Text style={emptyStyles.subtitle}>Create a new habit to track your progress</Text>
        <TouchableOpacity
          style={emptyStyles.button}
          onPress={onGetStarted}
        >
          <Text style={emptyStyles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Condition 2: To-dos are empty, but other habits exist
  if (selectedTab === 'To-dos') {
    return (
      <View style={emptyStyles.container}>
        <FontAwesome name="check" size={40} color="#FFF" style={cardStyles.icon} />
        <Text style={emptyStyles.title}>No more habits left for today</Text>
        <Text style={emptyStyles.subtitle}>You've done your part, review your journey.</Text>
        <TouchableOpacity style={emptyStyles.button} onPress={onViewProgress}>
          <Text style={emptyStyles.buttonText}>View Progress</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Condition 3: Done tab is empty
  if (selectedTab === 'Done') {
    return (
      <View style={emptyStyles.container}>
        <Ionicons name="trophy-outline" size={40} color="#fff" />
        <Text style={emptyStyles.title}>No habits completed yet</Text>
        <Text style={emptyStyles.subtitle}>Complete a habit from your "To-dos" list.</Text>
      </View>
    );
  }

  // Condition 4: Skipped tab is empty
  if (selectedTab === 'Skipped') {
    return (
      <View style={emptyStyles.container}>
        <MaterialCommunityIcons name="close-thick" size={40} color="#fff" />
        <Text style={emptyStyles.title}>No habits skipped</Text>
        <Text style={emptyStyles.subtitle}>Habits you fail will appear here.</Text>
      </View>
    );
  }

  return null; // Fallback
}

// --- 5. NEW: EmptyState Styles ---
const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 140, // Push it down from the tabs
    paddingHorizontal: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 14,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  }
});


// -----------------------------------------------------------------
// --- 6. Data Definitions ---
// -----------------------------------------------------------------

// --- Calendar Data (Mock) ---
const DATES = [
  { id: 1, num: 5 }, { id: 2, num: 6 }, { id: 3, num: 7 },
  { id: 4, num: 8 }, { id: 5, num: 9 }, { id: 6, num: 10 },
  { id: 7, num: 11 },
];

// --- To-Do Data (Mock) ---
const TODOS_DATA = [
  {
    id: '1',
    title: '🥊 Boxing',
    subtitle: 'Start strong, breathe deep, and hit the day with determination!',
    streak: '3 days',
    status: 'In Progress',
    imageSource: require('../../assets/images/boxing.png'),
  },
  {
    id: '2',
    title: '📈 Work',
    subtitle: 'Make today count.',
    streak: '3 days',
    status: 'In Progress',
    imageSource: require('../../assets/images/work.png'),
  },
  {
    id: '3',
    title: '🏋🏻 Exercise',
    subtitle: 'Stay active, stay consistent.',
    streak: '1 day',
    status: 'In Progress',
    imageSource: require('../../assets/images/run.png'),
  },
];


// -----------------------------------------------------------------
// --- 7. Main HomeScreen Component ---
// -----------------------------------------------------------------
function HomeScreen({ navigation, route }) {
  const [selectedDate, setSelectedDate] = useState(9);
  const [selectedTab, setSelectedTab] = useState('To-dos');
  const [todos, setTodos] = useState(TODOS_DATA);
  const [done, setDone] = useState([]);
  const [skipped, setSkipped] = useState([]);
  const [selectedHabitId, setSelectedHabitId] = useState(null);
  const [openSwipeableId, setOpenSwipeableId] = useState(null);
  const swipeableRefs = useRef({});

const getTodayDate = () => {
  const date = new Date();

  // 1. Get the day name (e.g., "FRIDAY")
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();

  // 2. Get the day number and ensure it has a zero if needed (e.g., "09" or "21")
  const dayNum = date.getDate().toString().padStart(2, '0');

  // 3. Get the month name (e.g., "NOV")
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

  // 4. Combine them with your specific comma placement
  return `${weekday}, ${dayNum} ${month}`;
};
  const todayString = getTodayDate(); // Returns "THURSDAY, 21 NOV" (for example)

  // This effect listens for new/updated habits from CreateHabitScreen
  useEffect(() => {
    if (route.params?.newHabit) {
      setTodos(prevTodos => [route.params.newHabit, ...prevTodos]);
      navigation.setParams({ newHabit: null });
    }
    if (route.params?.updatedHabit) {
      const updatedHabit = route.params.updatedHabit;
      setTodos(prev => prev.map(h => h.id === updatedHabit.id ? updatedHabit : h));
      setDone(prev => prev.map(h => h.id === updatedHabit.id ? updatedHabit : h));
      setSkipped(prev => prev.map(h => h.id === updatedHabit.id ? updatedHabit : h));
      navigation.setParams({ updatedHabit: null });
    }
  }, [route.params, navigation]);

  // --- NEW: Calculate total habits ---
  const totalHabitCount = todos.length + done.length + skipped.length;

  const visibleHabits = useMemo(() => {
    if (selectedTab === 'To-dos') return todos;
    if (selectedTab === 'Done') return done;
    if (selectedTab === 'Skipped') return skipped;
    return [];
  }, [selectedTab, todos, done, skipped]);

  const handleSelectCard = (habitId) => {
    if (openSwipeableId) return;
    setSelectedHabitId(selectedHabitId === habitId ? null : habitId);
  };

  const handleCompleteHabit = (habit) => {
    if (!habit || !todos.find(h => h.id === habit.id)) return;
    setDone(prev => [...prev, { ...habit, status: 'Completed' }]);
    setTodos(prev => prev.filter(h => h.id !== habit.id));
    setSelectedHabitId(null);
  };

  const handleFailHabit = (habit) => {
    if (!habit || !todos.find(h => h.id === habit.id)) return;
    setSkipped(prev => [...prev, { ...habit, status: 'Skipped' }]);
    setTodos(prev => prev.filter(h => h.id !== habit.id));
    setSelectedHabitId(null);
  };

  const handleResetHabit = (habit) => {
    if (openSwipeableId) return;
    setTodos(prev => [...prev, { ...habit, status: 'In Progress' }]);
    setDone(prev => prev.filter(h => h.id !== habit.id));
    setSkipped(prev => prev.filter(h => h.id !== habit.id));
  };

  const handleDelete = (habit) => {
    Alert.alert(
      'Delete Habit',
      `Are you sure you want to delete "${habit.title}"?`,
      [
        { text: 'Cancel', style: 'cancel', onPress: () => closeSwipeable(habit.id) },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTodos(prev => prev.filter(h => h.id !== habit.id));
            setDone(prev => prev.filter(h => h.id !== habit.id));
            setSkipped(prev => prev.filter(h => h.id !== habit.id));
            setOpenSwipeableId(null);
          },
        },
      ]
    );
  };

  const handleEdit = (habit) => {
    closeSwipeable(habit.id);
    navigation.navigate('CreateHabit', { habitToEdit: habit });
  };

  const closeSwipeable = (id) => {
    if (swipeableRefs.current[id]) {
      swipeableRefs.current[id].close();
      setOpenSwipeableId(null);
    }
  };

  const onSwipeOpen = (id) => {
    if (openSwipeableId && openSwipeableId !== id) {
      closeSwipeable(openSwipeableId);
    }
    setOpenSwipeableId(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <HeaderQuoteScroll />

      <View style={styles.fixedHeaderContainer}>

        {/* Date and Create Button */}
        <View style={styles.header}>
          {/* <Text style={styles.dateText}>THURSDAY, 09 OCT</Text> */}
          <Text style={styles.dateText}>{todayString}</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('CreateHabit')}
          >
            <Text style={styles.createText}>CREATE</Text>
            <Ionicons name="add-circle" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Calendar Scroller */}
        <View style={styles.dateScrollerContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {DATES.map((date) => {
              const isActive = date.num === selectedDate;
              return (
                <TouchableOpacity
                  key={date.id}
                  style={[styles.dateCircle, isActive ? styles.activeDateCircle : null]}
                  onPress={() => setSelectedDate(date.num)}
                >
                  <Text style={[styles.dateNum, isActive ? styles.activeDateNum : null]}>
                    {date.num}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Tabs (To-dos, Done, Skipped) */}
        <View style={styles.tabsContainer}>
          <TabButton
            label={`To-dos (${todos.length})`}
            isActive={selectedTab === 'To-dos'}
            onPress={() => setSelectedTab('To-dos')}
          />
          <TabButton
            label={`Done (${done.length})`}
            isActive={selectedTab === 'Done'}
            onPress={() => setSelectedTab('Done')}
          />
          <TabButton
            label={`Skipped (${skipped.length})`}
            isActive={selectedTab === 'Skipped'}
            onPress={() => setSelectedTab('Skipped')}
          />
        </View>
      </View>

      {/* --- MODIFIED: Conditional Rendering for List --- */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {
          visibleHabits.length > 0 ? (
            visibleHabits.map((todo) => {
              const isTodoTab = selectedTab === 'To-dos';
              return (
                <HabitCard
                  key={todo.id}
                  habit={todo}
                  isSelected={isTodoTab && selectedHabitId === todo.id}
                  onPress={isTodoTab ? () => handleSelectCard(todo.id) : () => handleResetHabit(todo)}
                  onComplete={() => handleCompleteHabit(todo)}
                  onFail={() => handleFailHabit(todo)}
                  onDelete={() => handleDelete(todo)}
                  onEdit={() => handleEdit(todo)}
                  onSwipeOpen={() => onSwipeOpen(todo.id)}
                  swipeableRef={(ref) => {
                    swipeableRefs.current[todo.id] = ref;
                  }}
                />
              );
            })
          ) : (
            // --- Show EmptyState component if list is empty ---
            <EmptyState
              selectedTab={selectedTab}
              totalHabitCount={totalHabitCount}
              onGetStarted={() => navigation.navigate('CreateHabit')}
              onViewProgress={() => setSelectedTab('Done')}
            />
          )
        }

        <View style={{ height: 20 }} />

      </ScrollView >
    </SafeAreaView >
  );
}

// --- HomeScreen Main Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  // Wrapper for the sticky header elements
  fixedHeaderContainer: {
    backgroundColor: '#000000', // Ensure it has a background so cards scroll "behind" it
    paddingBottom: 10,
    zIndex: 10, // Ensure it stays on top
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 10, // Add a little padding so the first card isn't stuck to the tabs
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  dateText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  createText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateScrollerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  dateCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#222226',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  activeDateCircle: {
    borderWidth: 0,
    backgroundColor: '#FFF',
  },
  dateNum: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeDateNum: {
    color: '#000',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    marginTop: 4,
    gap: 12,
  },
});

export default HomeScreen;