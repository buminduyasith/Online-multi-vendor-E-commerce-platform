package com.onlineshop.bumidu.inventoryservice.Repository;


import com.onlineshop.bumidu.inventoryservice.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface ProductRepository extends JpaRepository<Product,Integer> {

    @Query("SELECT p FROM Product p WHERE p.sellerid = :id")
    public List<Product> getProductForSellers(@Param("id") int id);

    @Query("SELECT p FROM Product p WHERE p.sellerid = :id AND p.sku = :sku")
    public Optional<Product> getProduct(@Param("id") int id, @Param("sku") String sku);


    @Query("SELECT p FROM Product p WHERE p.sku = :sku")
    public Optional<Product> getProductBySKU(@Param("sku") String  sku);

}
