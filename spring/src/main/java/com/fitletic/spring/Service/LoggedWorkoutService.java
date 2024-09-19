package com.fitletic.spring.Service;

import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Entity.Workouts.LoggedWorkout;
import com.fitletic.spring.Entity.Workouts.LoggedWorkoutResponse;
import com.fitletic.spring.Repository.Workouts.LoggedWorkoutRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class LoggedWorkoutService {
    private final LoggedWorkoutRepository loggedWorkoutRepository;
    private final UserExerciseService userExerciseService;
    private final UserService userService;

    public LoggedWorkoutService(LoggedWorkoutRepository loggedWorkoutRepository, UserExerciseService userExerciseService, UserService userService) {
        this.loggedWorkoutRepository = loggedWorkoutRepository;
        this.userExerciseService = userExerciseService;
        this.userService = userService;
    }

    public LoggedWorkout saveLoggedWorkout(String workoutId) {
        User user=userService.getAuthenticatedUser();
        LocalDateTime date=LocalDateTime.now();
        LoggedWorkout loggedWorkout = new LoggedWorkout();
        loggedWorkout.setWorkoutId(workoutId);
        loggedWorkout.setDate(date);
        loggedWorkout.setUserId(user.getId());
        return loggedWorkoutRepository.save(loggedWorkout);
    }

    public LoggedWorkoutResponse getLoggedWorkoutResponse(LoggedWorkout loggedWorkout)
    {
        LoggedWorkoutResponse loggedWorkoutResponse=new LoggedWorkoutResponse();
        loggedWorkoutResponse.setWorkoutId(loggedWorkout.getWorkoutId());
        loggedWorkoutResponse.setDate(loggedWorkout.getDate());
        loggedWorkoutResponse.setCalories(userExerciseService.getCalories(loggedWorkoutResponse.getWorkoutId()));
        return loggedWorkoutResponse;
    }

    public List<LoggedWorkout> getLoggedWorkoutsList()
    {
        User user=userService.getAuthenticatedUser();
        LocalDateTime date=LocalDateTime.now();
        return loggedWorkoutRepository.findAllByDateAndUserId(date,user.getId());
    }
    public List<LoggedWorkoutResponse> getLoggedWorkoutsResponsesList(List<LoggedWorkout> loggedWorkouts)
    {
        List<LoggedWorkoutResponse> loggedWorkoutResponses=new ArrayList<>();
        for(LoggedWorkout loggedWorkout:loggedWorkouts)
        {
            loggedWorkoutResponses.add(getLoggedWorkoutResponse(loggedWorkout));
        }
        return loggedWorkoutResponses;
    }
}
