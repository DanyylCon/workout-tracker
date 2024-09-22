import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import exercises from '../../assets/data/exercises.json';
import ExerciseListItem from '../components/ExerciseListItem';
import { useQuery } from '@tanstack/react-query';


export default function ExercisesScreen() {

  const {data, isLoading} = useQuery({
    queryKey: ['exercises'],
    queryFn: () => {return exercises}
  });

  if(isLoading){
    return <ActivityIndicator/>
  }

  return (
    <View style={styles.container}>

      <FlatList 
        data={data}
        contentContainerStyle={{ gap: 5 }}
        keyExtractor={(item, index) => item.name + index }
        renderItem={({ item }) => <ExerciseListItem item={item} />}
      />
      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  } 
});
