package com.fitletic.spring.Service;

import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Entity.Workouts.Workout;
import com.fitletic.spring.Repository.Workouts.WorkoutRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WorkoutService {
    private final WorkoutRepository workoutRepository;


    public WorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;

    }
    //returns a Workout
    public Workout createWorkout(Workout workout, User user){
        workout.setUserId(user.getId());
        return workoutRepository.save(workout);
    }

    public List<Workout> getAllWorkouts(User user){
       return new ArrayList<>(workoutRepository.findAllByUserId(user.getId())) ;
    }

    public void deleteWorkout(String  workoutId){
        workoutRepository.deleteById(workoutId);
    }



}
