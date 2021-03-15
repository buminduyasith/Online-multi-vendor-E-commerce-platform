package com.onlineshop.bumidu.authserver.Service;

import com.onlineshop.bumidu.authserver.Models.User;
import com.onlineshop.bumidu.authserver.Repository.CustomerRepository;
import com.onlineshop.bumidu.authserver.Repository.SellerRepository;
import com.onlineshop.bumidu.authserver.Repository.UserRepository;
import org.bumidu.onlineshop.commons.Models.Customer;
import org.bumidu.onlineshop.commons.Models.Seller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SellerService {

    @Autowired
    SellerRepository sellerRepository;

    @Autowired
    UserRepository userRepository;


    public Seller getSellerDetails(String email){

        User user = userRepository.getUserByUsername(email);

        Optional<Seller> seller = sellerRepository.getUserByFkID(user.getId());

        if(seller.isPresent()){
            return  seller.get();
        }

        else{
            return  null;
        }

        //int x = 2;

       // return seller;

    }

    public Seller  getSellerbyId(int id){

        Optional<Seller> seller = sellerRepository.findById(id);

        if(seller.isPresent()){
            return  seller.get();
        }
        else {
            return null;
        }


    }
}
