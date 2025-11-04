// src/utils/logs.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// storage key (you can rename later if needed)
const KEY = 'habit_logs_v1';

/**
 * Save a new log entry.
 * @param {Object} data - { habitId, title, status, lat, lng, timestamp }
 */
export async function addLog({
  habitId,
  title,
  status,
  lat,
  lng,
  timestamp = Date.now(),
}) {
  try {
    const logs = await getLogs();
    const newLog = {
      id: String(timestamp),
      habitId,
      title,
      status,
      lat,
      lng,
      timestamp,
    };
    const next = [newLog, ...logs];
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
    return newLog;
  } catch (error) {
    console.error('Error saving log:', error);
    return null;
  }
}

/**
 * Load all saved logs.
 * @returns {Array}
 */
export async function getLogs() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Error reading logs:', error);
    return [];
  }
}

/**
 * Remove all logs (for testing/reset).
 */
export async function clearLogs() {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (error) {
    console.error('Error clearing logs:', error);
  }
}
