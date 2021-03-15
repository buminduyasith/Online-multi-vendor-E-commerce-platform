package com.onlineshop.bumidu.inventoryservice.Services;

import com.onlineshop.bumidu.inventoryservice.Exceptions.ApiException;
import com.onlineshop.bumidu.inventoryservice.Exceptions.ResourceNotFoundException;
import com.onlineshop.bumidu.inventoryservice.Models.Category;
import com.onlineshop.bumidu.inventoryservice.Models.Product;
import com.onlineshop.bumidu.inventoryservice.Repository.Categoryrepository;
import com.onlineshop.bumidu.inventoryservice.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;


    public Product addNewProduct(Product product){

       return productRepository.save(product);

    }

    public List<Product> getAllProducts(){

        //throw new RuntimeException("not working ");

        //return productRepository.findAll();
        //int x = 5/0;
        Optional<List<Product>> products = Optional.ofNullable(productRepository.findAll());
        products.orElseThrow(()-> new ResourceNotFoundException("products are not found"));
        return products.get();



    }

    public Product getProductBySkuforSeller(int id,String sku){

        Optional<Product> product = productRepository.getProduct(id,sku);

        if(product.isPresent()){
            return product.get();
        }else{
            return null;
        }

    }

    public List<Product> getProductBySellerId(int id){

        return productRepository.getProductForSellers(id);

    }

    public Product getProductBySKU(String sku){

        Product product = productRepository.getProductBySKU(sku).orElseThrow(() -> new ResourceNotFoundException("Error: No product found."));

        return product;
//        if(product.isPresent()){
//            return product.get();
//        }
//        else{
//            return product.
//        }
    }


    public void deleteProductById(int id){

        productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Error: No product found."));

        productRepository.deleteById(id);
    }


}
