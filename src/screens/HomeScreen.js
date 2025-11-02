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

// --- Icon Import ---
import Ionicons from 'react-native-vector-icons/Ionicons';

// -----------------------------------------------------------------
// --- 1. Ticker Component (HeaderQuoteScroll) ---
// -----------------------------------------------------------------
const REPEAT_COUNT = 4; 

function HeaderQuoteScroll({
  messages = ['Better everyday', 'Keep going', 'You are better than that', 'Push through it'],
  separator = '  ✦  ',
  speed = 60,
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
          <Text 
            key={index}
            style={tickerStyles.text}
            numberOfLines={1} 
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
            {line}
          </Text>
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
    paddingHorizontal: 12,
  },
});


// -----------------------------------------------------------------
// --- 2. HabitCard Component ---
// -----------------------------------------------------------------
function HabitCard({ iconName, title, subtitle, streak, imageSource, status }) {
  return (
    <View style={cardStyles.card}>
      {/* Card Image and Status Badge */}
      <ImageBackground 
        source={imageSource} 
        style={cardStyles.imageBackground}
        imageStyle={{ borderRadius: 20 }} // Apply borderRadius directly to image
      >
        {/* Overlay for "glass" effect on the image */}
        <View style={cardStyles.imageOverlay}> 
          <View style={cardStyles.statusBadge}>
            <Ionicons name="ellipse" size={8} color="#FCD34D" /> {/* Yellow dot */}
            <Text style={cardStyles.statusText}>{status}</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Card Content */}
      <View style={cardStyles.contentContainer}>
        {/* Main Content: Icon, Title, Subtitle, Streak */}
        <View style={cardStyles.mainContent}>
          <View style={cardStyles.mainTextContainer}>
            {/* --- Boxing Glove Icon --- */}
            <Ionicons name={iconName} size={24} color="#E5E7EB" style={cardStyles.mainIcon} />
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

        {/* Footer: Tap to complete */}
        <View style={cardStyles.footer}>
          {/* --- Tap Icon --- */}
          <Ionicons name="finger-print-outline" size={16} color="#9CA3AF" />
          <Text style={cardStyles.footerText}>Tap to complete or skip</Text>
        </View>
      </View>
    </View>
  );
}

// --- Card Styles ---
const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#1F2937', // Dark gray for the whole card background
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 16,
    overflow: 'hidden', // Ensures everything inside respects the border radius
    borderWidth: 1, // Add a subtle border
    borderColor: '#374151', // Lighter gray border
  },
  imageBackground: {
    height: 160, // Increased height for the image area
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'flex-start', // Align content to the left
  },
  imageOverlay: {
    // This view creates the "glass" effect
    backgroundColor: 'rgba(0,0,0,0.2)', // Semi-transparent black overlay
    borderRadius: 20, // Match card radius
    flex: 1, // Fill the image background
    width: '100%',
    padding: 12, // Padding for the status badge
    // borderWidth: 0.5, // Optional: subtle inner border for glass effect
    // borderColor: 'rgba(255,255,255,0.3)', // Optional: subtle inner border for glass effect
  },
  statusBadge: {
    backgroundColor: 'rgba(252, 211, 77, 0.2)', // Translucent yellow
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6, // Space between dot and text
    alignSelf: 'flex-start', // Important to align to top-left
    borderWidth: 1, // Subtle border to define the shape
    borderColor: 'rgba(252, 211, 77, 0.4)', // Slightly darker translucent yellow
  },
  statusText: {
    color: '#FFF', // White text
    fontWeight: 'bold',
    fontSize: 12,
  },
  contentContainer: {
    padding: 16,
    backgroundColor: '#1F2937', // Ensure content area is dark
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Align items center vertically
    marginBottom: 10, // Space between main content and subtitle
  },
  mainTextContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Center icon and text
    flex: 1,
    marginRight: 12,
  },
  mainIcon: {
    marginRight: 10, // Space between icon and title
  },
  mainText: {
    flex: 1,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 4, // More space after title
    lineHeight: 20, // Adjust line height for readability
  },
  streakBadge: {
    backgroundColor: 'rgba(55, 65, 81, 0.6)', // Translucent dark gray
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90, // Ensure it's wide enough for "Streak | 3 days"
    borderWidth: 1, // Subtle border
    borderColor: 'rgba(55, 65, 81, 0.8)', // Slightly darker translucent gray
  },
  streakText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    borderTopColor: '#374151',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    marginTop: 16,
  },
  footerText: {
    color: '#9CA3AF',
    marginLeft: 8,
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
    borderRadius: 20,
    backgroundColor: '#374151', // Dark gray
  },
  activeTab: {
    backgroundColor: '#FFF', // Active tab is white
  },
  tabText: {
    color: '#9CA3AF', // Inactive text is gray
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#000', // Active text is black
  },
});

// -----------------------------------------------------------------
// --- 4. BottomNavBar Component ---
// -----------------------------------------------------------------
function BottomNavBar() {
  return (
    <View style={navStyles.bottomTabBar}>
      <Text style={navStyles.placeholderText}>[Bottom Tab Bar Placeholder]</Text>
    </View>
  );
}

// --- BottomNavBar Styles ---
const navStyles = StyleSheet.create({
  bottomTabBar: {
    height: 80,
    backgroundColor: '#111827',
    borderTopWidth: 1,
    borderTopColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  placeholderText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
});

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
    iconName: 'fitness-outline', // Updated icon to a more general fitness one
    title: 'Boxing',
    subtitle: 'Start strong, breathe deep, and hit the day with determination!',
    streak: '3 days',
    status: 'In Progress',
    imageSource: require('../../assets/images/boxing.png'), // Path relative to HomeScreen.js
  },
  {
    id: '2',
    iconName: 'briefcase-outline',
    title: 'Work',
    subtitle: 'make today count.',
    streak: '3 days',
    status: 'In Progress',
    imageSource: require('../../assets/images/work.png'),
  },
  {
    id: '3',
    iconName: 'walk-outline',
    title: 'Run',
    subtitle: '10km morning run',
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
            label="To-dos (4)"
            isActive={selectedTab === 'To-dos'}
            onPress={() => setSelectedTab('To-dos')}
          />
          <TabButton 
            label="Done (0)"
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
            iconName={todo.iconName}
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
      <BottomNavBar />
      
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
    paddingHorizontal: 10,
  },
  dateCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  activeDateCircle: {
    backgroundColor: '#FFF',
  },
  dateNum: {
    color: '#FFF',
    fontSize: 16,
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