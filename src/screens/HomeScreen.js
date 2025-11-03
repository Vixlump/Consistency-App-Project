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
  ImageBackground // Import ImageBackground for the card
} from 'react-native';

// --- Icon Imports ---
// import MaterialIcons from '@expo/vector-icons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// BECAME THIS (to include both icon sets):
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // <-- TO THIS

// -----------------------------------------------------------------
// --- 1. Ticker Component (HeaderQuoteScroll) ---
// -----------------------------------------------------------------
const REPEAT_COUNT = 4;


function HeaderQuoteScroll({
  messages = [
    'Better everyday',
    'Keep going',
  ],
  // --- THIS IS THE CHANGE ---
  // I've added more spaces on each side of the separator
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
function HabitCard({ iconEmoji, title, subtitle, streak, imageSource, status }) {
  const isSkipped = status === 'Skipped'; // Check if the card is skipped

  return (
    <ImageBackground
      source={imageSource}
      style={cardStyles.card}
      imageStyle={{ borderRadius: 20 }} // Apply borderRadius to the background image
    >
      {/* Gradient Overlay for text readability */}
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']} // From transparent to dark
        locations={[0.5, 0.8, 1.0]} // Start fade from halfway, darken towards bottom
        style={cardStyles.gradientOverlay}
      >
        {/* --- Status Badge (Top Left) --- */}
        <View style={[
          cardStyles.statusBadge,
          // Dynamically change style based on status
          isSkipped ? cardStyles.skippedStatusBadge : cardStyles.inProgressStatusBadge
        ]}>
          {isSkipped
            // Show red 'X' icon if skipped
            ? <Ionicons name="close-circle-sharp" size={14} color="#FFF" />
            // Show yellow dot if in progress
            : <Ionicons name="ellipse" size={8} color="#FCD34D" />
          }
          <Text style={cardStyles.statusText}>{status}</Text>
        </View>

        {/* Main Content & Streak (Bottom section) */}
        <View style={cardStyles.bottomContentContainer}>
          <View style={cardStyles.mainContent}>
            <View style={cardStyles.mainTextContainer}>
              {/* --- Emoji for Title --- */}
              <Text style={cardStyles.emojiIcon}>{iconEmoji}</Text>
              <View style={cardStyles.mainText}>
                <Text style={cardStyles.cardTitle}>{title}</Text>
                <Text style={cardStyles.cardSubtitle}>{subtitle}</Text>
              </View>
            </View>

            {/* --- Streak Badge (single line) --- */}
            <View style={cardStyles.streakBadge}>
              <Text style={cardStyles.streakText}>Streak | {streak}</Text>
            </View>
          </View>

          {/* Footer: Tap to complete or reset */}
          <View style={cardStyles.footer}>
            {/* 2. ICON CHANGE HERE: */}
            {isSkipped
              ? <Ionicons name="refresh-circle-outline" size={16} color="#9CA3AF" />
              // Use MaterialIcons 'touch-app' for the "In Progress" card
              : <MaterialIcons name="touch-app" size={25} color="#DEDEDE" />
            }
            <Text style={cardStyles.footerText}>
              {isSkipped ? 'Tap to reset' : 'Tap to complete or skip'}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
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
  },
  // --- New Style for 'In Progress' ---
  inProgressStatusBadge: {
    backgroundColor: 'rgba(252, 211, 77, 0.2)',
    borderColor: 'rgba(252, 211, 77, 0.4)',
  },
  // --- New Style for 'Skipped' ---
  skippedStatusBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderColor: 'rgba(239, 68, 68, 0.4)',
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
  // --- New Style for Emoji ---
  emojiIcon: {
    fontSize: 24, // Size for the emoji
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
    backgroundColor: 'rgba(255, 255, 255, 0.11)',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(80, 80, 80, 0.8)',
    alignSelf: 'flex-end',
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
    backgroundColor: '#FFF', // Active tab is white
  },
  tabText: {
    color: '#FFF', // Inactive text is gray
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#000', // Active text is black
  },
});

// // -----------------------------------------------------------------
// // --- 4. BottomNavBar Component ---
// // -----------------------------------------------------------------
// function BottomNavBar() {
//   return (
//     <View style={navStyles.bottomTabBar}>
//       <Text style={navStyles.placeholderText}>[Bottom Tab Bar Placeholder]</Text>
//     </View>
//   );
// }

// // --- BottomNavBar Styles ---
// const navStyles = StyleSheet.create({
//   bottomTabBar: {
//     height: 80,
//     backgroundColor: '#111827',
//     borderTopWidth: 1,
//     borderTopColor: '#374151',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   placeholderText: {
//     color: '#9CA3AF',
//     fontSize: 16,
//   },
// });

// -----------------------------------------------------------------
// --- 5. Data Definitions ---
// -----------------------------------------------------------------

// --- Calendar Data (Mock) ---
const DATES = [
  { id: 1, num: 5 }, { id: 2, num: 6 }, { id: 3, num: 7 },
  { id: 4, num: 8 }, { id: 5, num: 9 }, { id: 6, num: 10 },
  { id: 7, num: 11 },
];

// --- To-Do Data (Mock) ---
const TODOS = [
  {
    id: '1',
    // iconEmoji: '🥊',
    title: '🥊 Boxing',
    subtitle: 'Start strong, breathe deep, and hit the day with determination!',
    streak: '3 days',
    status: 'In Progress',
    imageSource: require('../../assets/images/boxing.png'), // Path relative to HomeScreen.js
  },
  {
    id: '2',
    // iconEmoji: '📈',
    title: '📈 Work',
    subtitle: 'Make today count.',
    streak: '3 days',
    status: 'In Progress',
    imageSource: require('../../assets/images/work.png'),
  },
  {
    id: '3',
    // iconEmoji: '🌳',
    title: '🏋🏻 Exercise',
    subtitle: 'Stay active, stay consistent.',
    streak: '1 day',
    status: 'In Progress',
    imageSource: require('../../assets/images/run.png'),
  },
];


// -----------------------------------------------------------------
// --- 6. Main HomeScreen Component ---
// -----------------------------------------------------------------
function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(9);
  const [selectedTab, setSelectedTab] = useState('To-dos');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 1. Ticker */}
      <HeaderQuoteScroll />

      <ScrollView style={styles.scrollView}>

        {/* Date and Create Button */}
        <View style={styles.header}>
          <Text style={styles.dateText}>THURSDAY, 09 OCT</Text>
          <TouchableOpacity style={styles.createButton}>
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
            label="To-dos (3)"
            isActive={selectedTab === 'To-dos'}
            onPress={() => setSelectedTab('To-dos')}
          />
          <TabButton
            label="Done (1)"
            isActive={selectedTab === 'Done'}
            onPress={() => setSelectedTab('Done')}
          />
          <TabButton
            label="Skipped (1)"
            isActive={selectedTab === 'Skipped'}
            onPress={() => setSelectedTab('Skipped')}
          />
        </View>

        {/* --- To-Do Cards --- */}
        {TODOS.map((todo) => (
          <HabitCard
            key={todo.id}
            iconEmoji={todo.iconEmoji}
            title={todo.title}
            subtitle={todo.subtitle}
            streak={todo.streak}
            status={todo.status}
            imageSource={todo.imageSource}
          />
        ))}

        {/* Add a little space at the bottom */}
        <View style={{ height: 20 }} />

      </ScrollView>

      {/* 3. Bottom Tab Bar */}
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
    // backgroundColor: '#1F2937',
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