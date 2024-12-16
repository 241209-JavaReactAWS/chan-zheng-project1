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
    @Column (name = "image")
    private String image;
    @Column (name = "price")
    private double price;
    @Column (name = "description")
    private String description;
    @Column (name = "link")
    private String link;

    public Product(){
    }

    public Product(int productId, String name, String image, double price, String description, String link){
        this.productId = productId;
        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
        this.link = link;
    }

    public void setProductId(int productId){
        this.productId = productId;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setImage(String image){
        this.image = image;
    }

    public void setPrice(double price){
        this.price = price;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public void setLink(String link){
        this.link = link;
    }

    public int getProductId() {
        return productId;
    }

    public String getName() {
        return name;
    }

    public String getImage() {
        return image;
    }

    public double getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public String getLink() {
        return link;
    }
}

