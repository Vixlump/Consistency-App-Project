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
  note, address, photoUri,
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
      note, 
      address, 
      photoUri,
      timestamp,
    };
    await AsyncStorage.setItem(KEY, JSON.stringify([newLog, ...logs]));
    return newLog;
  } catch (e) {
    console.error('Error saving log:', e);
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

// add near the other exports
export async function updateLog(id, patch) {
  try {
    const logs = await getLogs();
    const i = logs.findIndex(l => l.id === id);
    if (i === -1) return null;

    const updated = { ...logs[i], ...patch };
    logs[i] = updated;

    await AsyncStorage.setItem(KEY, JSON.stringify(logs));
    return updated;
  } catch (e) {
    console.error('Error updating log:', e);
    return null;
  }
}


export async function deleteLog(id) {
  try {
    const logs = await getLogs();
    const next = logs.filter(l => l.id !== id);
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
    return true;
  } catch (e) {
    console.error('Error deleting log:', e);
    return false;
  }
}
