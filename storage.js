import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const SCHEDULE_STORAGE_KEY = '@ScheduleNotes:schedule';
const NOTES_STORAGE_KEY = '@ScheduleNotes:notes';

// Schedule Data Functions
export const loadScheduleData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(SCHEDULE_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading schedule data:', error);
    return [];
  }
};

export const saveScheduleData = async (scheduleData) => {
  try {
    const jsonValue = JSON.stringify(scheduleData);
    await AsyncStorage.setItem(SCHEDULE_STORAGE_KEY, jsonValue);
    console.log('Schedule data saved successfully');
  } catch (error) {
    console.error('Error saving schedule data:', error);
    throw error;
  }
};

// Notes Data Functions
export const loadNotesData = async () => {
  try {
    const value = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
    return value != null ? value : '';
  } catch (error) {
    console.error('Error loading notes data:', error);
    return '';
  }
};

export const saveNotesData = async (notesText) => {
  try {
    await AsyncStorage.setItem(NOTES_STORAGE_KEY, notesText);
    console.log('Notes data saved successfully');
  } catch (error) {
    console.error('Error saving notes data:', error);
    throw error;
  }
};

// Utility Functions
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove([SCHEDULE_STORAGE_KEY, NOTES_STORAGE_KEY]);
    console.log('All data cleared successfully');
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};

export const exportData = async () => {
  try {
    const scheduleData = await loadScheduleData();
    const notesData = await loadNotesData();
    
    return {
      schedule: scheduleData,
      notes: notesData,
      exportedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error exporting data:', error);
    throw error;
  }
};

export const importData = async (importedData) => {
  try {
    if (importedData.schedule) {
      await saveScheduleData(importedData.schedule);
    }
    if (importedData.notes) {
      await saveNotesData(importedData.notes);
    }
    console.log('Data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error);
    throw error;
  }
};
