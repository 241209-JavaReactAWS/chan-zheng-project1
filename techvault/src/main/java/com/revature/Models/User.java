package com.revature.Models;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    @Column (name = "username", unique = true)
    private String username;
    @Column (name = "password")
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToMany
    @JoinTable(
            name = "users_products",
            joinColumns = @JoinColumn(name = "userId"),
            inverseJoinColumns = @JoinColumn(name = "productId")
    )
    private Set<Product> favorites;

    public User(){
    }
    
    public User(int userId, String username, String password, Role role){
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.role = role;
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

    public void setRole(Role role) {
        this.role = role;
    }

    public void setFavorites(Set<Product> favorites) {
        this.favorites = favorites;
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

    public Role getRole() {
        return role;
    }

    public Set<Product> getFavorites(){
        return favorites;
    }
}
