import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Stack } from 'expo-router';
import { useState } from "react";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import client from "../graphqlClient";
import NewSetInput from "../components/NewSetInput";


const document = gql`
  query exercises($name: String) {
    exercises(name: $name) {
      name
      muscle
      instructions
      equipment
    }
  }
`;

export default function ExerciseDetailsScreen() {

  const {name} = useLocalSearchParams();

  const {data, isLoading, error} = useQuery({
    queryKey: ['exercises', name],
    queryFn: () => client.request(document, { name })
  });

  const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);

  if(isLoading){
    return <ActivityIndicator/>
  } 
    
  if(error){
    return <Text>Failed to fetch exercise details.</Text>
  } 

  const exercise = data.exercises[0];

  if(!exercise){
    return (
      <Text>Exercise not found.</Text>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

        <Stack.Screen options={{ title: exercise.name }}/>

        <View style={styles.panel}>
          <Text  style={styles.exerciseName}>{exercise.name}</Text>
          <Text style={styles.exerciseSubtitle}>
            <Text style={styles.exercisesSubItem}>{exercise.muscle}</Text> | 
            <Text style={styles.exercisesSubItem}> {exercise.equipment}</Text>
          </Text>
        </View>

        <View style={styles.panelInstructions}>
          <Text style={styles.exerciseInstructions} numberOfLines={isInstructionExpanded ? 0 : 5}>
            {exercise.instructions}
          </Text>
          <Text 
            onPress={() => setIsInstructionExpanded(!isInstructionExpanded)} 
            style={styles.seeMore}
          >
            {isInstructionExpanded ? 'See less' : 'See more'}
          </Text>
        </View>
        <NewSetInput/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10
  },
  panel:{
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: '500'
  },
  
  exerciseSubtitle: {
    color: 'dimgray'
  },
  exercisesSubItem: {
    textTransform: 'capitalize'
  },
  panelInstructions:{
    backgroundColor: 'white',
    padding: 10
  },
  exerciseInstructions:{
    fontSize: 16,
    lineHeight: 22
  },
  seeMore:{
    alignSelf: 'center',
    padding: 10,
    fontWeight: '600',
    color: 'gray'
  }
});