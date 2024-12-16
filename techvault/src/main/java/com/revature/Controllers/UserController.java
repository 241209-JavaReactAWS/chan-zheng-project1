package com.revature.Controllers;

import java.util.List;
import java.util.Optional;

import com.revature.Models.Product;
import com.revature.Models.User;
import com.revature.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerHandler(@RequestBody User user){
        User possibleUser = userService.createNewUser(user);

        if(possibleUser == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else {
            return new ResponseEntity<>(possibleUser, HttpStatus.CREATED);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginHandler(@RequestBody User user){
        User possibleUser = userService.loginUser(user);

        if(possibleUser != null){
            return new ResponseEntity<>(possibleUser, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<User> getUserHandler(@PathVariable int userId){
        System.out.println(userId);
        Optional<User> possibleUser = userService.getUserById(userId);

        if(possibleUser.isPresent()){
            return new ResponseEntity<>(possibleUser.get(), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user")
    public List<User> getAllUserHandler(){
        return userService.getAllUsers();
    }
}