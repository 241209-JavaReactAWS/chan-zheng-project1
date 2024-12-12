package com.revature.DAOs;

import com.revature.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDAO extends JpaRepository<User, Integer>{
    User findByUsername(String username);

    Optional<User> findByUserId(int userId);
}