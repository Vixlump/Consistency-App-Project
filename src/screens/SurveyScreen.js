import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SurveyScreen({ navigation, route }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [surveyData, setSurveyData] = useState({
    primaryGoal: '',
    consistencyLevel: '',
    biggestObstacle: '',
    selectedTasks: [],
  });
  const [showChallenge, setShowChallenge] = useState(false);
  const [showMakingRoutines, setShowMakingRoutines] = useState(false);
  
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const textAnim = new Animated.Value(0);
  const progressAnim = new Animated.Value(0);

  useEffect(() => {
    if (currentPage === 0) {
      startIntroAnimation();
    } else {
      animateProgress();
    }
  }, [currentPage]);

  const startIntroAnimation = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateProgress = () => {
    Animated.timing(progressAnim, {
      toValue: (currentPage + 1) / 5, // 5 total steps including animations
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  const handleAnswer = (answer, question) => {
  setSurveyData(prev => ({
    ...prev,
    [question]: answer
  }));
  
  if (currentPage < 2) {
    goToNextPage();
  } else {
    // Reset animation values before showing challenge
    fadeAnim.setValue(0);
    setShowChallenge(true);
    setTimeout(() => {
      setShowChallenge(false);
      setCurrentPage(3); 
    }, 1000);
  }
};

  const handleTaskSelect = (task) => {
    setSurveyData(prev => ({
      ...prev,
      selectedTasks: prev.selectedTasks.includes(task)
        ? prev.selectedTasks.filter(t => t !== task)
        : [...prev.selectedTasks, task]
    }));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleComplete = async () => {
  try {
    await AsyncStorage.setItem('userSurvey', JSON.stringify(surveyData));
    
    // Reset animation values before showing routines
    fadeAnim.setValue(0);
    setShowMakingRoutines(true);
    setTimeout(() => {
      navigation.navigate('Main');
    }, 1000);
  } catch (error) {
    console.error('Error saving survey:', error);
    navigation.navigate('Main');
  }
};

  const skipSurvey = () => {
    Alert.alert(
      'Skip Survey',
      'Are you sure? This helps us personalize your experience.',
      [
        { text: 'Continue', style: 'cancel' },
        { 
          text: 'Skip', 
          style: 'destructive',
          onPress: () => navigation.navigate('Main')
        }
      ]
    );
  };

  // Progress bar width calculation
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // Intro screen with animation
  if (currentPage === 0) {
    return (
      <View style={styles.container}>
        <Animated.View 
          style={[
            styles.introContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Animated.Text style={[styles.introText, { opacity: textAnim }]}>
            The best time to start is now.{'\n\n'}
            {'\n\n'}
            {'\n\n'}
          </Animated.Text>
          
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={goToNextPage}
          >
            <Text style={styles.continueButtonText}>Begin Your Journey</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  // Challenge animation screen
  if (showChallenge) {
    return (
      <View style={styles.container}>
        <Animated.View 
          style={[
            styles.challengeContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: fadeAnim }]
            }
          ]}
        >
          <Text style={styles.challengeText}>Your first challenge!</Text>
        </Animated.View>
      </View>
    );
  }

  // Making routines animation screen
  if (showMakingRoutines) {
    return (
      <View style={styles.container}>
        <Animated.View 
          style={[
            styles.routinesContainer,
            {
              opacity: fadeAnim,
              transform: [{ rotate: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              }) }]
            }
          ]}
        >
          <Text style={styles.routinesText}>Making your routines...</Text>
        </Animated.View>
      </View>
    );
  }

  // Task selection screen
  if (currentPage === 3) {
    const tasks = [
      'Wake up early',
      'Deep work',
      'Reading',
      'Meditation',
      'Workout',
      'Run',
      'Journalling',
      'Follow diet',
      'Drink water',
      'Limit screentime'
    ];

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.skipButton} onPress={skipSurvey}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Choose your tasks:</Text>
          <Text style={styles.subtitle}>Select the habits you want to focus on</Text>
          
          <View style={styles.tasksGrid}>
            {tasks.map((task, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.taskButton,
                  surveyData.selectedTasks.includes(task) && styles.taskButtonSelected
                ]}
                onPress={() => handleTaskSelect(task)}
              >
                <Text style={[
                  styles.taskText,
                  surveyData.selectedTasks.includes(task) && styles.taskTextSelected
                ]}>
                  {task}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={[
              styles.completeButton,
              surveyData.selectedTasks.length === 0 && styles.completeButtonDisabled
            ]}
            onPress={handleComplete}
            disabled={surveyData.selectedTasks.length === 0}
          >
            <Text style={styles.completeButtonText}>
              Complete Setup ({surveyData.selectedTasks.length} selected)
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // Regular survey pages
  const pages = [
    {
      question: "What is your primary goal?",
      answers: [
        "Gain momentum",
        "Improve physical health",
        "Boost productivity",
        "Improve mental clarity",
        "Become consistent"
      ],
      key: "primaryGoal"
    },
    {
      question: "How consistent are you with your habits?",
      answers: [
        "I try to follow habits but often fall off track",
        "I'm consistent with most of my habits",
        "I rarely miss a habit once I commit to it"
      ],
      key: "consistencyLevel"
    },
    {
      question: "What's your biggest obstacle to better habits?",
      answers: [
        "Lack of time",
        "Lack of motivation",
        "Difficulty staying consistent",
        "Too many commitments",
        "I don't know where to start"
      ],
      key: "biggestObstacle"
    }
  ];

  const currentQuestion = pages[currentPage - 1];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.skipButton} onPress={skipSurvey}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{currentQuestion.question}</Text>
        
        <View style={styles.answersContainer}>
          {currentQuestion.answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerButton,
                surveyData[currentQuestion.key] === answer && styles.answerButtonSelected
              ]}
              onPress={() => handleAnswer(answer, currentQuestion.key)}
            >
              <Text style={[
                styles.answerText,
                surveyData[currentQuestion.key] === answer && styles.answerTextSelected
              ]}>
                {answer}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
    
  },
  skipButton: {
    alignSelf: 'flex-end',
  marginBottom: 20,
  backgroundColor: '#000',
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#FFF',
    borderRadius: 2,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
  },
  // Intro styles
  introContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  introText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 50,
  },
  highlightText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 30,
  },
  continueButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Survey styles
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 40,
  },
  answersContainer: {
    width: '100%',
  },
  answerButton: {
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  answerButtonSelected: {
    borderColor: '#FFF',
    backgroundColor: 'rgba(252, 211, 77, 0.1)',
  },
  answerText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  answerTextSelected: {
    color: '#FFF',
  },
  // Task selection styles
  tasksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  taskButton: {
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: '48%',
  },
  taskButtonSelected: {
    borderColor: '#FFF',
    backgroundColor: 'rgba(252, 211, 77, 0.1)',
  },
  taskText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  taskTextSelected: {
    color: '#FFF',
  },
  completeButton: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  completeButtonDisabled: {
    opacity: 0.6,
  },
  completeButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Animation screens
  challengeContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  routinesContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routinesText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
});