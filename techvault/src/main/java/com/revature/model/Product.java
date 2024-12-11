package com.revature.models;

@Entity
public class Product{
    private int productID;
    private String name;
    private double price;
    private String description;

    public Product(){

    }
    
    public Product(int productID, String name, double price, String description){
        this.productID = productID;
        this.name = name;
        this.price = price;
        this.description = description;
    }

    public void setProductID(int productID){
        this.productID = productID;
    }

    public int getProductID(){
        return this.productID;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return this.name;
    }

    public void setPrice(double price){
        this.price = price;
    }

    public double getPrice(){
        return this.price;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public String getDescrption(){
        return this.description;
    }
}

