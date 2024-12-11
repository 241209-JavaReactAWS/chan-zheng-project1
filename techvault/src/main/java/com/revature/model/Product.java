package com.revature.models;

public class Product{
    private int productID;
    private String name;
    private double price;
    private String description;

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

