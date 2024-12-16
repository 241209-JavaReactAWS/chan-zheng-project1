package com.revature.Models;

import jakarta.persistence.*;
@Entity
@Table(name = "users")
public class User {

    @Column (name = "userId")
    @Id @GeneratedValue
    private int userId;
    @Column (name = "username")
    private String username;
    @Column (name = "password")
    private String password;
    @Column (name = "admin")
    private boolean admin;

    public User(){
    }
    
    public User(int userId, String username, String password, boolean admin){
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.admin = admin;
    }
    public void setUserID(int userId){
        this.userId = userId;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public int getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public boolean isAdmin() {
        return admin;
    }
}
