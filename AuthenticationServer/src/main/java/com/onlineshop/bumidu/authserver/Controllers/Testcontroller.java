package com.onlineshop.bumidu.authserver.Controllers;

import com.onlineshop.bumidu.authserver.Service.CustomerSerivce;
import com.onlineshop.bumidu.authserver.Service.SellerService;
import com.onlineshop.bumidu.authserver.dto.CustomerTest;
import org.bumidu.onlineshop.commons.Models.Customer;
import org.bumidu.onlineshop.commons.Models.Seller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "test/api/v1")
public class Testcontroller {

    @Autowired
    CustomerSerivce customerSerivce;

    @Autowired
    SellerService sellerService;

    @GetMapping()
    public String t(){
        return "hi welcome";
    }

    @GetMapping(value = "/test")
    public String test(){
        return "works fine";
    }







}
