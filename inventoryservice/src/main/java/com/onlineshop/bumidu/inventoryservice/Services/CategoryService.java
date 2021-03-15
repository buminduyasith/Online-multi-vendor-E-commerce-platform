package com.onlineshop.bumidu.inventoryservice.Services;


import com.onlineshop.bumidu.inventoryservice.Models.Category;
import com.onlineshop.bumidu.inventoryservice.Repository.Categoryrepository;
import com.onlineshop.bumidu.inventoryservice.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    Categoryrepository categoryrepository;

    public Optional<Category> getallProdcutsForCategroyById (int id){

        return categoryrepository.findById(id);

    }

}
