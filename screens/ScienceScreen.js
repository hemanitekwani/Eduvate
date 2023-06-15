import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ScienceScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&category=17&type=multiple')
      .then(response => response.json())
      .then(data => {
         setQuestions(data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleAnswer = isCorrect => {
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setCorrectAnswer(questions[currentQuestion].correct_answer);
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setIsAnswered(false);
      setCorrectAnswer('');
    } else {
      console.log('Final score:', score);
    }
  };

  if (questions.length === 0) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const currentQuizQuestion = questions[currentQuestion];

  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
  
      <Text style={{ fontWeight: 'bold', textAlign: 'center', marginTop: 40, fontSize: 30, color: 'white' }}> Welcome to Science Quiz!</Text>

      <Text style={{ textAlign: 'center', marginTop: 120, fontSize: 20, color: 'white' }}>Question: {currentQuizQuestion.question}</Text>
      <Text   style={{ textAlign: 'center', marginTop: 50, fontSize: 20, color: 'white' }} >Options:</Text>
      {currentQuizQuestion.incorrect_answers.map((option, index) => (
        <Button
          key={index}
          title={option}
          onPress={() => handleAnswer(false)}
          disabled={isAnswered}
        />
      ))}
      <Button
        title={currentQuizQuestion.correct_answer}
        onPress={() => handleAnswer(true)}
        disabled={isAnswered}
      />

      {isAnswered && (
        <Text style={styles.correctAnswer}>
          Correct answer: {correctAnswer}
        </Text>
      )}

      {isAnswered && currentQuestion < questions.length - 1 && (
         <View style={styles.nextQuestionButtonContainer}>
        
        <Button 
          title="Next Question"
          onPress={handleNextQuestion}
        />
      </View>
      )}

      {currentQuestion === questions.length - 1 && (
        <Text>Final score: {score}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',

  },
  correctAnswer: {
    color: 'red',
    marginTop: 30,
    fontSize:20,
  },
  nextQuestionButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
    
  },
  
});

export default ScienceScreen;
