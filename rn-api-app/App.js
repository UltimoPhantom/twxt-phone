import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Platform } from 'react-native';
import TextForm from './components/TextForm';
import TextCloud from './components/TextCloud';

export default function App() {
  return (
    <View style={appStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#edede1" />
      <ScrollView contentContainerStyle={appStyles.scrollContainer}>
        <Text style={appStyles.title}>TWXT</Text>
        <TextForm />
        <TextCloud />
      </ScrollView>
    </View>
  );
}

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edede1',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    minHeight: '100%',
  },
  title: {
    fontSize: 72,
    fontWeight: '900', // Black weight
    textAlign: 'center',
    marginBottom: 48,
    color: '#000000',
    letterSpacing: 4,
    textTransform: 'uppercase',
    // Using system fonts that are closest to Suisse Intl
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed',
  },
});
