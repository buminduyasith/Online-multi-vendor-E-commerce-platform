package com.onlineshop.bumidu.authserver.Service;

import com.onlineshop.bumidu.authserver.Models.User;
import com.onlineshop.bumidu.authserver.Repository.CustomerRepository;
import com.onlineshop.bumidu.authserver.Repository.UserRepository;
import com.onlineshop.bumidu.authserver.Repository.UserRolesRepository;
import org.bumidu.onlineshop.commons.Models.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerSerivce {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    UserRepository userRepository;


    public Customer getCustomerDetails(String email){

        User user = userRepository.getUserByUsername(email);

        Customer customer = customerRepository.getUserByFkID(user.getId());

        int x = 2;

        return customer;

    }
}
