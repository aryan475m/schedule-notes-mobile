import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { loadNotesData, saveNotesData } from '../storage';

export default function NotesEditor() {
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await loadNotesData();
      setNotes(data);
    } catch (error) {
      console.error('Error loading notes data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async (notesText) => {
    try {
      await saveNotesData(notesText);
    } catch (error) {
      console.error('Error saving notes data:', error);
    }
  };

  const handleNotesChange = (text) => {
    setNotes(text);
    // Auto-save as user types (with debouncing in real implementation)
    saveData(text);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading notes...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>My Notes</Text>
          <Text style={styles.subHeaderText}>
            Your notes are automatically saved as you type
          </Text>
        </View>

        <View style={styles.editorContainer}>
          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={handleNotesChange}
            placeholder="Start writing your notes here...\n\nYou can add reminders, thoughts, ideas, or anything else you want to remember."
            placeholderTextColor="#999"
            multiline
            textAlignVertical="top"
            scrollEnabled={false}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            💾 Your notes are saved locally on your device
          </Text>
          <Text style={styles.infoText}>
            🔒 No data is sent to external servers
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  editorContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    minHeight: 300,
  },
  notesInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    padding: 20,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  infoContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  infoText: {
    fontSize: 14,
    color: '#1976d2',
    marginBottom: 5,
  },
});
