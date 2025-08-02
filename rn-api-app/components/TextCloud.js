import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export default function TextCloud() {
  const [texts, setTexts] = useState([]);

  const fetchTexts = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.TEXTS);
      setTexts(res.data);  // Assuming the response is an array of texts
    } catch (error) {
      console.error('Error fetching texts:', error);
    }
  };

  useEffect(() => {
    fetchTexts();
  }, []);

  const handleTextPress = (text) => {
    // Handle click (e.g., open URL or show copy functionality)
    alert(`Text clicked: ${text}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={texts}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTextPress(item.text_content)}>
            <View style={styles.textItem}>
              <Text style={styles.text}>{item.text_content}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  textItem: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});
