package com.revature.Controllers;

import java.util.List;
import java.util.Optional;

import com.revature.Models.Product;
import com.revature.Models.Role;
import com.revature.Models.User;
import com.revature.Services.UserService;
import jakarta.servlet.http.HttpSession;
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
        }
        return new ResponseEntity<>(possibleUser, HttpStatus.CREATED);

    }

    @PostMapping("/login")
    public ResponseEntity<User> loginHandler(@RequestBody User user, HttpSession session){
        User possibleUser = userService.loginUser(user);

        if(possibleUser != null){

            session.setAttribute("username", possibleUser.getUsername());
            session.setAttribute("userId", possibleUser.getUserId());
            session.setAttribute("role", possibleUser.getRole());

            return new ResponseEntity<>(possibleUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutHandler(HttpSession session){
        session.invalidate();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/favorites/{productId}")
    public ResponseEntity<User> addProductToFavoriteHandler(HttpSession session, @PathVariable int productId){
        if(session.isNew() || session.getAttribute("username") == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        User returnedUser = userService.addProductToFavorites((String) session.getAttribute("username"), productId);

        if(returnedUser == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(returnedUser, HttpStatus.OK);
    }

    @DeleteMapping("/favorites/{productId}")
    public ResponseEntity<User> deleteProductFromFavoritesHandler(HttpSession session, @PathVariable int productId){
        if(session.isNew() || session.getAttribute("username") == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        User returnedUser = userService.removeProductFromFavorites((String) session.getAttribute("username"), productId);

        if(returnedUser == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(returnedUser, HttpStatus.OK);
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<User> getUserHandler(HttpSession session, @PathVariable int userId){

        if(session.isNew() || !Role.ADMIN.equals(session.getAttribute("role"))) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Optional<User> possibleUser = userService.getUserById(userId);

        if(possibleUser.isPresent()){
            return new ResponseEntity<>(possibleUser.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> getAllUserHandler(HttpSession session){

        if(session.isNew() || !Role.ADMIN.equals(session.getAttribute("role"))) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }
}