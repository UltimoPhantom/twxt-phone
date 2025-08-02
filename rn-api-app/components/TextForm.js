import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import Svg, { Path } from 'react-native-svg';

export default function TextForm({ onTextAdded }) {
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      const response = await axios.post(API_ENDPOINTS.TEXTS, {
        text_content: text,
      });
      setText('');
      if (onTextAdded) {
        onTextAdded(response.data);
      }
    } catch (error) {
      console.error('Error adding text:', error);
    }
  };

  const PlusIcon = () => (
    <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 4v16m8-8H4"
        stroke="#000000"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  return (
    <View style={formStyles.formContainer}>
      <View style={formStyles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={formStyles.input}
          placeholder="Enter text"
          placeholderTextColor="#666666"
          multiline
          returnKeyType="done"
          blurOnSubmit={true}
        />
        <TouchableOpacity 
          style={formStyles.button} 
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <PlusIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const formStyles = StyleSheet.create({
  formContainer: {
    marginBottom: 64,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '95%',
    maxWidth: 800,
    backgroundColor: '#edede1',
    borderRadius: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  input: {
    flex: 1,
    padding: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    backgroundColor: '#edede1',
    borderRadius: 0,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    minHeight: 60,
    textAlignVertical: 'center',
  },
  button: {
    width: 64,
    height: 64,
    backgroundColor: '#edede1',
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#cccccc',
  },
});
