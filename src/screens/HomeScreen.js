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
} from 'react-native';

// --- Icon Imports ---
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

// -----------------------------------------------------------------
// --- 1. Ticker Component (HeaderQuoteScroll) ---
// -----------------------------------------------------------------
const REPEAT_COUNT = 4;

function HeaderQuoteScroll({
  messages = [
    'Better everyday',
    'Keep going',
    'Push through it'
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
    // paddingHorizontal is removed for perfect loop
  },
});


// -----------------------------------------------------------------
// --- 2. HabitCard Component ---
// -----------------------------------------------------------------
function HabitCard({ habit, isSelected, onPress, onComplete, onFail }) {
  // Destructure all values from the habit object
  const { iconEmoji, title, subtitle, streak, imageSource, status } = habit;

  // Add checks for all 3 states
  const isSkipped = status === 'Skipped';
  const isDone = status === 'Completed';
  const isInProgress = !isSkipped && !isDone;

  return (
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
            {isSkipped ? <Ionicons name="close-circle-sharp" size={14} color="#FFF" /> :
              isDone ? <Ionicons name="checkmark-circle" size={14} color="#FFF" /> :
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
              {(isSkipped || isDone) // Check for Done OR Skipped
                ? <MaterialIcons name="touch-app" size={25} color="#DEDEDE" />
                : <MaterialIcons name="touch-app" size={25} color="#DEDEDE" />
              }
              <Text style={cardStyles.footerText}>
                {(isSkipped || isDone) ? 'Tap to reset' : 'Tap to complete or skip'}
              </Text>
            </View>
          </View>

          {/* Selection Overlay */}
          {isSelected && (
            <BlurView style={cardStyles.selectionOverlay} tint="dark" intensity={90}>
              <View style={cardStyles.buttonContainer}>
                {/* Fail Button */}
                <TouchableOpacity
                  style={[cardStyles.button, cardStyles.failButton]}
                  onPress={onFail}
                >
                  <MaterialCommunityIcons name="close-thick" size={26} color="#FFF" style={cardStyles.icon} />
                  <Text style={cardStyles.buttonText}>I failed today, but I'll try again tomorrow</Text>
                </TouchableOpacity>

                {/* Complete Button */}
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
    overflow: 'hidden', // Added for BlurView
  },
  inProgressStatusBadge: {
    borderColor: 'rgba(252, 211, 77, 0.4)',
  },
  skippedStatusBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)', // Red for skipped
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  doneStatusBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)', // Translucent Green
    borderColor: 'rgba(34, 197, 94, 0.4)',
  },
  statusText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
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
    overflow: 'hidden', // Added for BlurView
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

  // --- STYLES FOR THE SELECTION OVERLAY ---
  selectionOverlay: {
    ...StyleSheet.absoluteFillObject, // This makes it cover the whole card
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20, // Match the card's border radius
    overflow: 'hidden', // Ensure blur respects the radius
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
    backgroundColor: 'rgba(239, 68, 68, 0.8)', // Translucent Red
  },
  completeButton: {
    backgroundColor: 'rgba(34, 197, 94, 0.8)', // Translucent Green
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
    borderRadius: 20,
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
// --- 4. Data Definitions ---
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
// --- 5. Main HomeScreen Component ---
// -----------------------------------------------------------------
function HomeScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(9);
  const [selectedTab, setSelectedTab] = useState('To-dos');

  // State for habit lists
  const [todos, setTodos] = useState(TODOS_DATA);
  const [done, setDone] = useState([]);
  const [skipped, setSkipped] = useState([]);

  // State for selected card ID
  const [selectedHabitId, setSelectedHabitId] = useState(null);

  // Logic to show the correct list
  const visibleHabits = useMemo(() => {
    if (selectedTab === 'To-dos') return todos;
    if (selectedTab === 'Done') return done;
    if (selectedTab === 'Skipped') return skipped;
    return [];
  }, [selectedTab, todos, done, skipped]);

  // Logic to select a card
  const handleSelectCard = (habitId) => {
    if (selectedHabitId === habitId) {
      setSelectedHabitId(null);
    } else {
      setSelectedHabitId(habitId);
    }
  };

  // Completion logic
  const handleCompleteHabit = (habit) => {
    if (!habit || !todos.find(h => h.id === habit.id)) return;
    setDone(prev => [...prev, { ...habit, status: 'Completed' }]);
    setTodos(prev => prev.filter(h => h.id !== habit.id));
    setSelectedHabitId(null); // Close the card
  };

  // Fail logic
  const handleFailHabit = (habit) => {
    if (!habit || !todos.find(h => h.id === habit.id)) return;
    setSkipped(prev => [...prev, { ...habit, status: 'Skipped' }]);
    setTodos(prev => prev.filter(h => h.id !== habit.id));
    setSelectedHabitId(null); // Close the card
  };

  // Reset logic
  const handleResetHabit = (habit) => {
    // 1. Add habit back to 'todos' list
    setTodos(prev => [...prev, { ...habit, status: 'In Progress' }]);
    // 2. Remove it from 'done' or 'skipped' list
    setDone(prev => prev.filter(h => h.id !== habit.id));
    setSkipped(prev => prev.filter(h => h.id !== habit.id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 1. Ticker */}
      <HeaderQuoteScroll />

      <ScrollView style={styles.scrollView}>

        {/* Date and Create Button */}
        <View style={styles.header}>
          <Text style={styles.dateText}>THURSDAY, 09 OCT</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('CreateHabit')} // This navigates to the new screen
          ><Text style={styles.createText}>CREATE</Text>
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

        {/* --- To-Do Cards --- */}
        {visibleHabits.map((todo) => {
          const isTodoTab = selectedTab === 'To-dos';
          return (
            <HabitCard
              key={todo.id}
              habit={todo} // Pass the whole todo object
              isSelected={isTodoTab && selectedHabitId === todo.id}
              onPress={isTodoTab ? () => handleSelectCard(todo.id) : () => handleResetHabit(todo)}
              onComplete={() => handleCompleteHabit(todo)}
              onFail={() => handleFailHabit(todo)}
            />
          );
        })}

        {/* Add a little space at the bottom */}
        <View style={{ height: 20 }} />

      </ScrollView>

      {/* 3. Bottom Tab Bar (Commented out) */}
      {/* <BottomNavBar /> */}

    </SafeAreaView>
  );
}

// --- HomeScreen Main Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
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
    fontSize: 12,
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