package com.onlineshop.bumidu.shippingservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = {"org.bumidu.onlineshop.commons.Models","com.onlineshop.bumidu.shippingservices.Models"})
public class ShippingservicesApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShippingservicesApplication.class, args);
    }

}
