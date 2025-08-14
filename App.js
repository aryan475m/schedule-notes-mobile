import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ScheduleList from './components/ScheduleList';
import NotesEditor from './components/NotesEditor';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#f8f9fa',
            borderTopWidth: 1,
            borderTopColor: '#e9ecef',
            paddingTop: 5,
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: '#6c757d',
          headerStyle: {
            backgroundColor: '#007bff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      >
        <Tab.Screen 
          name="Schedule" 
          component={ScheduleList} 
          options={{
            title: '📅 Schedule',
            tabBarLabel: 'Schedule',
          }}
        />
        <Tab.Screen 
          name="Notes" 
          component={NotesEditor} 
          options={{
            title: '📝 Notes',
            tabBarLabel: 'Notes',
          }}
        />
      </Tab.Navigator>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Hello World - ScheduleNotes App
        </Text>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#343a40',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});
