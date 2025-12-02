
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { REWARD_IMAGES } from '../data/rewards';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const AchievementModal = ({ reward, onClose, isUnlocked }) => {
  if (!reward) return null;

  return (
    <Modal
      animationType="fade" // Switched to fade
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <ImageBackground source={reward.image} style={modalStyles.modalBackground}>
        <BlurView intensity={90} tint="dark" style={modalStyles.modalBlur}>

          <View style={[
            modalStyles.badgeContainer,
            !isUnlocked && modalStyles.badgeLocked // Style for "Locked"
          ]}>
            <Text style={modalStyles.badgeText}>
              {isUnlocked ? 'New Achievement' : 'Locked'}
            </Text>
          </View>

          <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={32} color="#FFF" />
          </TouchableOpacity>

          <View style={modalStyles.contentContainer}>
            <Text style={modalStyles.title}>{reward.title}</Text>

            <View style={[
              modalStyles.centerImageContainer,
              !isUnlocked && modalStyles.lockedImage // Dims the locked image
            ]}>
              <Image
                source={reward.image}
                style={modalStyles.centerImage}
              // resizeMode="cover" is default
              />
            </View>

            <View style={modalStyles.quoteBox}>
              <Text style={modalStyles.quoteText}>“{reward.quote}”</Text>

              <Text style={[
                modalStyles.conditionText,
                !isUnlocked && modalStyles.lockedConditionText // New style for locked text
              ]}>
                {isUnlocked ? (
                  <Ionicons name="trophy" size={14} color="#FCD34D" /> // Gold trophy
                ) : (
                  <Ionicons name="lock-closed" size={14} color="#9CA3AF" /> // Grey lock
                )}
                {' '}{reward.condition}
              </Text>
            </View>

            <TouchableOpacity style={modalStyles.gotItButton} onPress={onClose}>
              <Text style={modalStyles.gotItButtonText}>
                {isUnlocked ? 'Got it' : 'Back'}
              </Text>
            </TouchableOpacity>
          </View>

        </BlurView>
      </ImageBackground>
    </Modal>
  );
}


export default function RewardsScreen() {
  const [unlocked, setUnlocked] = useState(
    new Set(['7', '9', '11', '15', '21']) // Using your new Set
  );

  const [selectedReward, setSelectedReward] = useState(null);
  const [isModalUnlocked, setIsModalUnlocked] = useState(false); // Track if tapped item is locked

  const handleOpenModal = (reward, isUnlocked) => {
    setSelectedReward(reward);
    setIsModalUnlocked(isUnlocked); // Store if it's locked or not
  };

  const handleCloseModal = () => {
    setSelectedReward(null);
  };

  // This function renders each grid item
  const renderItem = ({ item }) => {
    const isUnlocked = unlocked.has(item.id);

    return (
      <TouchableOpacity
        style={[styles.imageContainer, !isUnlocked && styles.locked]}
        
        onPress={() => handleOpenModal(item, isUnlocked)}
        activeOpacity={0.7}
      >
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      <FlatList
        data={REWARD_IMAGES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        style={styles.list}
      />

      <AchievementModal
        reward={selectedReward}
        onClose={handleCloseModal}
        isUnlocked={isModalUnlocked} // Pass the status to the modal
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    padding: 10, // Your new padding
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#000',
  },
  locked: {
    opacity: 0.5,
  },
});

const modalStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
  },
  modalBlur: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  badgeContainer: {
    position: 'absolute',
    top: 60,
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  badgeLocked: { // Style for the "Locked" badge
    backgroundColor: 'rgba(100, 100, 100, 0.8)',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 15,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  centerImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: '#000', // Added background for safety
  },
  lockedImage: { // Style to dim the locked image
    opacity: 0.6,
  },
  centerImage: { // Your "zoom" crop style
    width: '110%',
    height: '110%',
    alignSelf: 'center',
    top: '-5%',
  },
  quoteBox: {
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%', // Fill width
  },
  quoteText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  conditionText: {
    color: '#FCD34D', // Gold color
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  lockedConditionText: {
    color: '#9CA3AF', // Grey color for locked text
  },

  gotItButton: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 24,
  },
  gotItButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});