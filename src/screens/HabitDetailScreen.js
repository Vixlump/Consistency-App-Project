import React, { useState } from 'react';
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
// Ensure you install react-native-calendars
// npm install react-native-calendars
import { Calendar } from 'react-native-calendars'; 

export default function HabitDetailScreen({ route, navigation }) {
  const { habit } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{habit.title}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Hero Image */}
        <Image source={habit.image} style={styles.heroImage} resizeMode="cover" />

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <Calendar
            // Basic theme customization to match dark mode
            theme={{
              backgroundColor: '#0B0B0B',
              calendarBackground: '#0B0B0B',
              textSectionTitleColor: '#6B7280',
              selectedDayBackgroundColor: '#FFF',
              selectedDayTextColor: '#000',
              todayTextColor: '#FFF',
              dayTextColor: '#555', // Dark grey for inactive days
              textDisabledColor: '#333',
              monthTextColor: '#FFF',
              arrowColor: '#FFF',
              textDayFontWeight: '600',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '600',
            }}
            // Mock marked dates
            markedDates={{
              '2025-10-01': { marked: true, dotColor: 'transparent', customStyles: styles.markedDate },
              '2025-10-12': { selected: true, selectedColor: '#FFF' },
              '2025-10-15': { selected: true, selectedColor: '#FFF' },
              '2025-10-23': { selected: true, selectedColor: '#FFF' },
              '2025-10-27': { selected: true, selectedColor: '#FFF' },
              '2025-10-28': { selected: true, selectedColor: '#FFF' },
              '2025-10-31': { selected: true, selectedColor: '#FFF' },
            }}
          />
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🔥 18</Text>
            <Text style={styles.statLabel}>Streaks</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>✅ 83</Text>
            <Text style={styles.statLabel}>Wins</Text>
          </View>
        </View>

        {/* Heat Map (Mock Visual) */}
        <View style={styles.heatMapContainer}>
          <View style={styles.heatMapHeader}>
             <Text style={styles.heatMapTitle}>Yearly Heat Map</Text>
             <View style={styles.yearBadge}><Text style={styles.yearText}>2025</Text></View>
          </View>
          {/* This is a simplified visual representation using Views */}
          <View style={styles.heatMapGrid}>
             {Array.from({ length: 100 }).map((_, i) => (
               <View 
                 key={i} 
                 style={[
                   styles.heatMapBox, 
                   // Randomly color some boxes to simulate data
                   Math.random() > 0.6 && styles.heatMapBoxActive
                 ]} 
               />
             ))}
          </View>
        </View>
        
        <View style={{ height: 40 }} />
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
  },
  content: {
    paddingHorizontal: 16,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  calendarContainer: {
    backgroundColor: '#0B0B0B',
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#1F1F22',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F1F22',
    marginHorizontal: 4, // small gap
  },
  statIcon: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  // Heat Map
  heatMapContainer: {
    backgroundColor: '#0B0B0B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1F1F22',
  },
  heatMapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  heatMapTitle: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  yearBadge: {
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  yearText: {
    color: '#9CA3AF',
    fontSize: 10,
  },
  heatMapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  heatMapBox: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: '#1C1C1E',
  },
  heatMapBoxActive: {
    backgroundColor: '#FFF',
  },
});