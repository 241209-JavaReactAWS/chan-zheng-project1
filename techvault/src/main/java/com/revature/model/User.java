package com.revature.models;

public class User {
    private int userID;
    private String username;
    private String password;
}

public void setUserID(int userID){
    this.userID = userID;
}

public int getUserID(){
    return this.userID;
}

public void setUsername(String username){
    this.username = username;
}

public String getUsername(){
    return this.username;
}

public void setPassword(String password){
    this.password = password;
}

public String getPassword(){
    return this.password;
}