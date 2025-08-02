import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export default function TextForm() {
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      const response = await axios.post(API_ENDPOINTS.TEXTS, {
        text_content: text,
      });
      setText('');
      // You can handle the response and update the parent component or store the data
      console.log('New text added:', response.data);
    } catch (error) {
      console.error('Error adding text:', error);
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholder="Enter text"
        multiline
      />
      <Button title="Add Text" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});
