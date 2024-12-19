package com.revature.Services;

import com.revature.DAOs.ProductDAO;
import com.revature.DAOs.UserDAO;
import com.revature.Models.Product;
import com.revature.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class UserService {
    private final UserDAO userDAO;
    private final ProductDAO productDAO;

    @Autowired
    public UserService(UserDAO userDAO, ProductDAO productDAO){
        this.userDAO = userDAO;
        this.productDAO = productDAO;
    }

    public Optional<User> getUserById(int userId){
        return userDAO.findByUserId(userId);
    }

    public User getUserByUsername(String username){
        return userDAO.findByUsername(username);
    }

    public List<User> getAllUsers(){
        return userDAO.findAll();
    }

    public User createNewUser(User user){
        User account = userDAO.findByUsername(user.getUsername());
        if (account == null) {
            return userDAO.save(user);
        }
        return null;
    }

    public User loginUser(User user){
        User account = userDAO.findByUsername(user.getUsername());
        if (account != null && account.getPassword().equals(user.getPassword())){
            return account;
        }
        return null;
    }

    public User addProductToFavorites(String username, int productId){
        User possibleUser = userDAO.findByUsername(username);
        Product possibleProduct = productDAO.findByProductId(productId);

        if(possibleUser == null || possibleProduct == null){
            return null;
        }

        Set<Product> favorites = possibleUser.getFavorites();
        favorites.add(possibleProduct);
        possibleUser.setFavorites(favorites);

        return userDAO.save(possibleUser);
    }

    public User removeProductFromFavorites(String username, int productId){
        User possibleUser = userDAO.findByUsername(username);
        Product possibleProduct = productDAO.findByProductId(productId);

        if(possibleUser == null || possibleProduct == null){
            return null;
        }

        Set<Product> favorites = possibleUser.getFavorites();
        favorites.remove(possibleProduct);
        possibleUser.setFavorites(favorites);

        return userDAO.save(possibleUser);
    }
}