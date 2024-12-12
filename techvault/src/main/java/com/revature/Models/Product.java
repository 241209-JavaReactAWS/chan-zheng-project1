package com.revature.Models;

import jakarta.persistence.*;
@Entity
@Table (name = "prodocts")
public class Product{

    @Column (name = "productId")
    @Id @GeneratedValue
    private int productId;
    @Column (name = "name")
    private String name;
    @Column (name = "price")
    private double price;
    @Column (name = "description")
    private String description;

    public Product(){
    }

    public Product(int productId, String name, double price, String description){
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.description = description;
    }

    public void setProductId(int productId){
        this.productId = productId;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setPrice(double price){
        this.price = price;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public int getProductId() {
        return productId;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }
}

