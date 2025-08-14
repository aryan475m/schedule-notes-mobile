import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { loadScheduleData, saveScheduleData } from '../storage';

export default function ScheduleList() {
  const [scheduleItems, setScheduleItems] = useState([]);
  const [newTime, setNewTime] = useState('');
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await loadScheduleData();
      setScheduleItems(data);
    } catch (error) {
      console.error('Error loading schedule data:', error);
    }
  };

  const saveData = async (data) => {
    try {
      await saveScheduleData(data);
    } catch (error) {
      console.error('Error saving schedule data:', error);
    }
  };

  const addScheduleItem = () => {
    if (newTime.trim() && newTask.trim()) {
      const newItem = {
        id: Date.now().toString(),
        time: newTime.trim(),
        task: newTask.trim(),
      };
      const updatedItems = [...scheduleItems, newItem];
      setScheduleItems(updatedItems);
      saveData(updatedItems);
      setNewTime('');
      setNewTask('');
    } else {
      Alert.alert('Error', 'Please fill in both time and task fields.');
    }
  };

  const removeScheduleItem = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this schedule item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedItems = scheduleItems.filter(item => item.id !== id);
            setScheduleItems(updatedItems);
            saveData(updatedItems);
          },
        },
      ]
    );
  };

  const renderScheduleItem = ({ item }) => (
    <View style={styles.scheduleItem}>
      <View style={styles.scheduleItemContent}>
        <Text style={styles.timeText}>{item.time}</Text>
        <Text style={styles.taskText}>{item.task}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeScheduleItem(item.id)}
      >
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.timeInput]}
            placeholder="Time (e.g., 9:00 AM)"
            value={newTime}
            onChangeText={setNewTime}
            placeholderTextColor="#999"
          />
          <TextInput
            style={[styles.input, styles.taskInput]}
            placeholder="Task description"
            value={newTask}
            onChangeText={setNewTask}
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={addScheduleItem}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={scheduleItems}
        keyExtractor={(item) => item.id}
        renderItem={renderScheduleItem}
        style={styles.scheduleList}
        contentContainerStyle={scheduleItems.length === 0 ? styles.emptyList : null}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No scheduled tasks yet</Text>
            <Text style={styles.emptySubtext}>Add your first task above</Text>
          </View>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  timeInput: {
    flex: 1,
  },
  taskInput: {
    flex: 2,
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  scheduleList: {
    flex: 1,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  scheduleItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scheduleItemContent: {
    flex: 1,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
    marginBottom: 4,
  },
  taskText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});
