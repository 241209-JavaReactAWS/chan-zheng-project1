package com.revature.Controllers;

import java.util.List;
import java.util.Optional;

import com.revature.Models.Product;
import com.revature.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("product")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<Product> createProductHandler(@RequestBody Product product){
        Product possibleProduct = productService.createNewProduct(product);

        return new ResponseEntity<>(possibleProduct, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Product> getAllProductHandler(){
        return productService.getAllProduct();
    }

    @GetMapping("{productId}")
    public ResponseEntity<Product> getProductHandler(@PathVariable int productId){
        Optional<Product> possibleProduct = productService.getProductById(productId);

        if(possibleProduct.isPresent() ){
            return new ResponseEntity<>(possibleProduct.get(), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("{productId}")
    public ResponseEntity<Integer> updateProductHandler(@PathVariable int productId, @RequestBody Product product){
        Optional<Product> possibleProduct = productService.getProductById(productId);

        if(possibleProduct.isPresent()){
            productService.updateProductById(productId, product);
            return new ResponseEntity<>(HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("{productId}")
    public ResponseEntity<Integer> deleteProductHandler(@PathVariable int productId){
        Optional<Product> possibleProduct = productService.getProductById(productId);

        if(possibleProduct.isPresent()){
            productService.deleteProductById(productId);
            return new ResponseEntity<>(HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}