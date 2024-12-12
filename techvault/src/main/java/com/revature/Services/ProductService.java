package com.revature.Services;

import com.revature.DAOs.ProductDAO;
import com.revature.Models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
@Service
public class ProductService {
    private final ProductDAO productDAO;

    @Autowired
    public ProductService(ProductDAO productDAO){
        this.productDAO = productDAO;
    }

    public List<Product> getAllProduct(){
        return productDAO.findAll();
    }

    public Product createNewProduct(Product product){
        return productDAO.save(product);
    }

    public Optional<Product> getProductById(int productId){
        return productDAO.findById(productId);
    }
    @Transactional
    public void updateProductById(int productId, Product product){
        Product oldProduct = productDAO.findByProductId(productId);

        if (product != null){
            oldProduct.setName(product.getName());
            oldProduct.setPrice(product.getPrice());
            oldProduct.setDescription(product.getDescription());
        }
    }
    @Transactional
    public boolean deleteProductById(int productId){
        Optional<Product> product = productDAO.findById(productId);

        if (product != null){
            productDAO.deleteByProductId(productId);
            return true;
        }
        return false;
    }
}