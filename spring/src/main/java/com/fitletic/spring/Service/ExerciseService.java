package com.fitletic.spring.Service;

import com.fitletic.spring.Entity.Workouts.Exercise;
import com.fitletic.spring.Repository.Workouts.ExerciseRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;

    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    public List<Exercise> findAllById(List<String> id) {
        return exerciseRepository.findAllById(id);
    }
    public List<String> findAllTypes(List<Exercise> exercises) {
        List<String> types = new ArrayList<>();
        for (Exercise exercise : exercises) {
            types.add(exercise.getType());
        }
        return types;
    }

    public int getTotalCalories(List<String> types, List<Integer> time) {
        int calories =0;
       for(int i=0;i< types.size();i++){
           switch (types.get(i)) {
               case "Strength" -> calories += time.get(i) * 4;
               case "Stretching" -> calories += time.get(i) * 3;
               case "Plyometrics" -> calories += (int) (time.get(i) * 8.5);
               case "Powerlifting" -> calories += (int) (time.get(i) * 6.67);
               default -> calories += time.get(i) * 3;
           }
       }
    return calories;
    }
    public String getExerciseName(String exerciseId){
        Exercise exercise=exerciseRepository.findExerciseById(exerciseId);
        return exercise.getTitle();
    }
}
