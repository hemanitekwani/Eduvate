import React,{useState,useEffect} from 'react';
import { View,Text,Button,StyleSheet } from 'react-native';


const ComputerScreen = () => {
    const[questions,setQuestions] = useState([]);
    const[currentQuestion,setCurrentQuestion]= useState(0);
    const[score,setScore] =useState(0);
    const[isAnswered,setIsAnswered] =useState(false);
    const[correctAnswer,setCorrectAnswer]=useState('');

    useEffect(()=> {
      fetch('https://opentdb.com/api.php?amount=30&category=18')
      .then(response => response.json())
      .then(data=> {
            setQuestions(data.results)
      })
      .catch(error=> {
        console.log("Error fetching:",error)

      });
    },[]);

    const handleAnswer = isCorrect => {

        if(isCorrect) {
            setScore(score+1)
        }
        else {
            setCorrectAnswer(questions[currentQuestion].correct_answer);
        }

         setIsAnswered(true)
    };

    const handleNextQuestion = () => {
       if(currentQuestion<questions.length-1) {

        setCurrentQuestion(currentQuestion+1);
        setIsAnswered(false);
        setCorrectAnswer('');
       }
       else {
        console.log('final score',score)
       }
      };
      if(questions.length===0) {
       return(
        <View>
            <Text> Loading....</Text>
        </View>
       );
      }
      const currentQuizQuestion = questions[currentQuestion];

      return (
        <View style = {[styles.container , {backgroundColor:'black'}]}>

      <Text style={{ fontWeight: 'bold', textAlign: 'center', marginTop: 40, fontSize: 30, color: 'white' }}> Welcome to Programming Quiz!</Text>
      <Text style={{ textAlign: 'center', marginTop: 120, fontSize: 20, color: 'white' }}>Question:{currentQuizQuestion.question}</Text>
      <Text   style={{ textAlign: 'center', marginTop: 50, fontSize: 20, color: 'white' }} >Options:</Text>

      {currentQuizQuestion.incorrect_answers.map((option,index)=> (
      <Button
      Key ={index}
      title={option}
      onPress={() => handleAnswer(false)}
        disabled={isAnswered}
        />
       ))}
       <Button
       title = {currentQuizQuestion.correct_answer}
       onPress={()=> handleAnswer(true)}
       disabled={isAnswered}
       />

       {isAnswered && (
        <Text style={styles.correctAnswer}>
          Correct answer: {correctAnswer}
        </Text>
      )}

      {isAnswered && currentQuestion < questions.length-1 && (
      <View style ={styles.nextQuestionButtonContainer}>
        <Button 
          title="Next Question"
          onPress={handleNextQuestion}
        />
      </View>
      )}
      {currentQuestion === questions.length-1 && (
       <Text> Final Score: {score} </Text>
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

export default ComputerScreen;


      