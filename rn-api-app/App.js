import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TextForm from './components/TextForm';
import TextCloud from './components/TextCloud';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>TWXT</Text>
      <TextForm />
      <TextCloud />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#edede1',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
    letterSpacing: 2,
  },
});
