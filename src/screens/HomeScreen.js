// src/screens/HomeScreen.js
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const HABITS = [
  {
    id: '1',
    title: 'Boxing',
    subtitle: 'Start strong, breathe deep, and hit the day with determination!',
    status: 'In Progress',
    streakDays: 3,
    // Put your own images in /assets/images/ then update the paths below
    image: require('../../assets/images/boxing.png'),
    emoji: '🥊',
  },
  {
    id: '2',
    title: 'Work',
    subtitle: 'Make today count.',
    status: 'In Progress',
    streakDays: 3,
    image: require('../../assets/images/work.png'),
    emoji: '📝',
  },
  {
    id: '3',
    title: 'Run',
    subtitle: '5 km easy pace.',
    status: 'In Progress',
    streakDays: 5,
    image: require('../../assets/images/run.png'),
    emoji: '🏃‍♂️',
  },
];

const SEGMENTS = ['To-dos', 'Done', 'Skipped'];

export default function HomeScreen() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(3); // center dot like your mockup
  const [segment, setSegment] = useState('To-dos');

  const today = useMemo(() => {
    const d = new Date();
    const day = d.toLocaleDateString(undefined, {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
    });
    return day.toUpperCase(); // "THURSDAY, 09 OCT"
  }, []);

  // 7-day pills around today
  const days = useMemo(() => {
    const base = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() - (3 - i)); // puts "today" in the middle (index 3)
      return d.getDate();
    });
  }, []);

  // For now we keep same list; later you can filter by segment
  const data = HABITS;

  return (
    <View style={styles.screen}>
      {/* Top ticker (optional) */}
      <View style={styles.tickerRow}>
        <Text style={styles.tickerText}>Better everyday ✦ Keep going ✦ You are better than that ✦ Push</Text>
      </View>

      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.dateText}>{today}</Text>
        <TouchableOpacity style={styles.createBtn} onPress={() => { /* navigate to AddHabit later */ }}>
          <Text style={styles.createText}>CREATE  ＋</Text>
        </TouchableOpacity>
      </View>

      {/* Day pills */}
      <View style={styles.dayRow}>
        {days.map((d, idx) => {
          const selected = idx === selectedDayIndex;
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => setSelectedDayIndex(idx)}
              style={[styles.dayPill, selected && styles.dayPillActive]}
            >
              <Text style={[styles.dayPillText, selected && styles.dayPillTextActive]}>
                {d}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Segmented control */}
      <View style={styles.segmentRow}>
        {SEGMENTS.map((s) => {
          const active = s === segment;
          const count =
            s === 'To-dos' ? data.length : 0; // wire up real counts later
          return (
            <TouchableOpacity
              key={s}
              onPress={() => setSegment(s)}
              style={[styles.segmentBtn, active && styles.segmentBtnActive]}
            >
              <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
                {s} ({count})
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Habit cards */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 28 }}
        renderItem={({ item }) => <HabitCard item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function HabitCard({ item }) {
  return (
    <View style={styles.cardWrap}>
      <ImageBackground
        source={item.image}
        imageStyle={styles.cardImage}
        style={styles.card}
      >
        {/* dark overlay */}
        <View style={styles.overlay} />

        {/* Status pill */}
        <View style={styles.statusPill}>
          <Text style={styles.statusDot}>🔥</Text>
          <Text style={styles.statusText}>In Progress</Text>
        </View>

        {/* Title + subtitle */}
        <View style={styles.textBlock}>
          <Text style={styles.title}>
            {item.emoji} {item.title}
          </Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>

        {/* Streak badge */}
        <View style={styles.streakBadge}>
          <Text style={styles.streakLabel}>Streak</Text>
          <View style={{ width: 6 }} />
          <Text style={styles.streakDays}>{item.streakDays} days</Text>
        </View>

        {/* Footer hint */}
        <View style={styles.footerHint}>
          <Text style={styles.footerHintText}>⤴ Tap to complete or skip</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  tickerRow: {
    paddingVertical: 6,
  },
  tickerText: {
    color: '#9CA3AF',
    fontSize: 12,
  },

  headerRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    color: '#E5E7EB',
    letterSpacing: 1,
    fontWeight: '700',
  },
  createBtn: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  createText: {
    color: '#E5E7EB',
    fontWeight: '600',
  },

  dayRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayPill: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B0B0B',
  },
  dayPillActive: {
    backgroundColor: '#111827',
    borderColor: '#374151',
  },
  dayPillText: {
    color: '#9CA3AF',
    fontWeight: '600',
  },
  dayPillTextActive: {
    color: '#E5E7EB',
  },

  segmentRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 8,
  },
  segmentBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
    backgroundColor: '#0B0B0B',
  },
  segmentBtnActive: {
    backgroundColor: '#111827',
    borderColor: '#374151',
  },
  segmentText: {
    color: '#9CA3AF',
    fontWeight: '600',
    fontSize: 12,
  },
  segmentTextActive: {
    color: '#E5E7EB',
  },

  cardWrap: {
    marginTop: 16,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  card: {
    height: 190,
    borderRadius: 18,
    overflow: 'hidden',
    padding: 14,
    justifyContent: 'space-between',
  },
  cardImage: {
    borderRadius: 18,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  statusPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(250, 204, 21, 0.15)', // amber-300 @ 15%
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.35)',
  },
  statusDot: { color: '#F59E0B', marginRight: 6 },
  statusText: { color: '#FDE68A', fontWeight: '700' },

  textBlock: {
    marginTop: 8,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    color: '#D1D5DB',
  },

  streakBadge: {
    position: 'absolute',
    right: 14,
    top: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(17,17,17,0.55)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  streakLabel: { color: '#D1D5DB', fontWeight: '600' },
  streakDays: {
    color: '#D1D5DB',
    fontWeight: '700',
  },

  footerHint: {
    alignSelf: 'center',
    marginBottom: 2,
  },
  footerHintText: { color: '#D1D5DB' },
});
