package com.revature.DAOs;

import com.revature.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductDAO extends JpaRepository<Product, Integer>{
    void deleteByProductId(int productId);
    Product findByProductId(int productId);
}