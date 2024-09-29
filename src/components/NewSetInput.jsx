import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';

const NewSetInput = () => {

  const [ reps, setReps ] = useState('');
  const [ weight, setWeight ] = useState('');

  const addSet = () => {
    console.warn('Added set', reps, weight);

    // Add set to the database

    setReps('');
    setWeight('');
  };

  return (
    <View style={styles.container}>
      <TextInput 
        value={reps} 
        onChangeText={setReps} 
        placeholder='Reps'
        style={styles.input}
        keyboardType='numeric' 
      />
      <TextInput 
        value={weight} 
        onChangeText={setWeight} 
        placeholder='Weight' 
        style={styles.input} 
        keyboardType='numeric'
      />
      <Button title='Add' onPress={addSet}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gainsboro',
    padding: 10,
    borderRadius: 5
  }
});

export default NewSetInput;