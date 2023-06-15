import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';




const GeographyScreen = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(null);


  const topics = [
    { id: 1, name: 'Programming' }, //18
    { id: 2, name: 'History' },  //23
    { id: 3, name: 'Geography' }, //22
     ];
  const fetchQuizData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple`);
      const data = await response.json();
      setQuizData(data.results);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
    fetchQuizData(topicId);
  };

  const renderTopics = () => {
    return topics.map((topic) => (
      <TouchableOpacity
        key={topic.id}
        style={styles.topicButton}
        onPress={() => handleTopicSelect(topic.id)}
      >
        <Text style={styles.topicButtonText}>{topic.name}</Text>
      </TouchableOpacity>
    ));
  };
  
  const renderQuiz = () => {
    if (!quizData || currentQuestionIndex >= quizData.length) {
      return null;
    }
    const quizItem = quizData[currentQuestionIndex];
    
    const handleAnswerSelect = (selectedAnswer) => {
      setSelectedAnswer(selectedAnswer);
      setShowAnswer(true);
      
    };
    const handleNextQuestion = () => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    };
    const renderAnswer = () => {
      if (showAnswer) {
        return (
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>The correct answer is:</Text>
            <Text style={styles.correctAnswerText}>{quizItem.correct_answer}</Text>
          </View>
        );
      }
      return null;
    };
  
    return (
      <View key={currentQuestionIndex} style={styles.quizItem}>
        <Text style={styles.quizQuestion}>{quizItem.question}</Text>
        {quizItem.incorrect_answers.map((option, optionIndex) => (
          <TouchableOpacity
            key={optionIndex}
            style={styles.quizOption}
            onPress={() => handleAnswerSelect(false)}
          >
            <Text style={styles.quizOptionText}>{option}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.quizOption}
          onPress={() => handleAnswerSelect(true)}
        >
          <Text style={styles.quizOptionText}>{quizItem.correct_answer}</Text>
        </TouchableOpacity>
        {renderAnswer()}
        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
      </View>
    );
  };
    

 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a topic:</Text>
      <View style={styles.topicContainer}>{renderTopics()}</View>
      {loading && <Text>Loading quiz...</Text>}
      {quizData && (
        <>
          <Text style={styles.title}>Quiz:</Text>
          {renderQuiz()}
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  topicContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  topicButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
  },
  topicButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  quizItem: {
    marginVertical: 10,
  },
  quizQuestion: {
    fontSize: 20,
    marginBottom: 10,
  },
  quizOption: {
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  quizOptionText: {
    fontSize: 16,
  },
});

export default GeographyScreen;