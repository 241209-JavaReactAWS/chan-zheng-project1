package com.revature.Services;

import com.revature.DAOs.UserDAO;
import com.revature.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class UserService {
    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO){
        this.userDAO = userDAO;
    }

    public Optional<User> getUserById(int userId){
        return userDAO.findById(userId);
    }

    public List<User> getAllUsers(){
        return userDAO.findAll();
    }

    public User createNewUser(User user){
        return userDAO.save(user);
    }

    public User loginUser(User user){
        User account = userDAO.findByUsername(user.getUsername());
        if (account != null && account.getPassword().equals(user.getPassword())){
            return account;
        }
        return null;
    }
}