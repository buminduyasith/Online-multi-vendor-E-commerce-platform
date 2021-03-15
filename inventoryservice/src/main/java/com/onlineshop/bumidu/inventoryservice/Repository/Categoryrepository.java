package com.onlineshop.bumidu.inventoryservice.Repository;

import com.onlineshop.bumidu.inventoryservice.Models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface Categoryrepository extends JpaRepository<Category,Integer> {

}
