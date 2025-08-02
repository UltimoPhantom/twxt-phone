import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Linking,
  Alert,
  Clipboard,
  Platform,
  Animated
} from 'react-native';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import Svg, { Path } from 'react-native-svg';

export default function TextCloud() {
  const [texts, setTexts] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const fetchTexts = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.TEXTS);
      const sortedTexts = res.data.sort(
        (a, b) =>
          new Date(b.added_date || b.createdAt || b._id) -
          new Date(a.added_date || a.createdAt || a._id)
      );
      setTexts(sortedTexts);
    } catch (error) {
      console.error('Error fetching texts:', error);
    }
  };

  const isUrl = (text) => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  const copyToClipboard = async (text, id) => {
    try {
      if (Platform.OS === 'ios') {
        await Clipboard.setString(text);
      } else {
        Clipboard.setString(text);
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const deleteText = async (id) => {
    try {
      Alert.alert(
        'Delete Text',
        'Are you sure you want to delete this text?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              setTexts(texts.filter((t) => t._id !== id));
              await axios.delete(`${API_ENDPOINTS.TEXTS}/${id}`);
            },
          },
        ]
      );
    } catch (err) {
      console.error('Failed to delete text: ', err);
      fetchTexts();
    }
  };

  const handleTextPress = (text, id) => {
    if (isUrl(text)) {
      Linking.openURL(text);
    } else {
      copyToClipboard(text, id);
    }
  };

  useEffect(() => {
    fetchTexts();
  }, []);

  const DeleteIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="#000000">
      <Path
        fillRule="evenodd"
        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </Svg>
  );

  const ExternalLinkIcon = () => (
    <Svg width={32} height={32} viewBox="0 0 20 20" fill="currentColor">
      <Path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
      <Path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 10-2 0v1H5V7h1a1 1 0 000-2H5z" />
    </Svg>
  );

  const CheckIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="#000000">
      <Path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </Svg>
  );

  const renderTextItem = ({ item }) => (
    <TouchableOpacity
      style={[
        cloudStyles.textItem,
        copiedId === item._id && cloudStyles.copiedItem
      ]}
      onPress={() => handleTextPress(item.text_content, item._id)}
      activeOpacity={0.8}
    >
      <TouchableOpacity
        style={cloudStyles.deleteButton}
        onPress={() => deleteText(item._id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <DeleteIcon />
      </TouchableOpacity>

      <View style={cloudStyles.textContent}>
        {isUrl(item.text_content) ? (
          <View style={cloudStyles.urlContainer}>
            <ExternalLinkIcon />
            <Text style={[cloudStyles.text, cloudStyles.urlText]} numberOfLines={3}>
              {item.text_content}
            </Text>
          </View>
        ) : (
          <Text style={cloudStyles.text}>{item.text_content}</Text>
        )}
      </View>

      {copiedId === item._id && (
        <View style={cloudStyles.copiedIndicator}>
          <CheckIcon />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={cloudStyles.container}>
      {texts.length === 0 ? (
        <View style={cloudStyles.emptyContainer}>
          <Text style={cloudStyles.emptyText}>
            No texts added yet. Start by adding some content!
          </Text>
        </View>
      ) : (
        <FlatList
          data={texts}
          renderItem={renderTextItem}
          keyExtractor={(item) => item._id.toString()}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={cloudStyles.listContainer}
        />
      )}
    </View>
  );
}

const cloudStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  textItem: {
    backgroundColor: '#edede1',
    marginBottom: 32,
    paddingHorizontal: 32,
    paddingVertical: 24,
    borderRadius: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    position: 'relative',
    maxWidth: '90%',
    alignSelf: 'flex-start',
  },
  copiedItem: {
    opacity: 0.8,
  },
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
    backgroundColor: '#edede1',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 0,
    zIndex: 1,
  },
  textContent: {
    paddingRight: 40, // Space for delete button
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    lineHeight: 32,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  urlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  urlText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 20,
    flex: 1,
  },
  copiedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    fontSize: 20,
    color: '#9CA3AF',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
});
