package com.onlineshop.bumidu.authserver.Controllers;

import com.onlineshop.bumidu.authserver.Models.User;
import com.onlineshop.bumidu.authserver.Service.CustomerSerivce;
import com.onlineshop.bumidu.authserver.Service.SellerService;
import com.onlineshop.bumidu.authserver.Service.UserAccountsService;
import com.onlineshop.bumidu.authserver.dto.CustomerRegisterDTO;
import com.onlineshop.bumidu.authserver.dto.CustomerTest;
import com.onlineshop.bumidu.authserver.dto.SellerRegisterDTO;
import org.bumidu.onlineshop.commons.Models.Customer;
import org.bumidu.onlineshop.commons.Models.Seller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class UsersRegisterController {

    @Autowired
    UserAccountsService userAccountsService;

    @Autowired
    CustomerSerivce customerSerivce;

    @Autowired
    SellerService sellerService;

    @GetMapping(value = "/ping")
    public String test(){
        return "pong";
    }

    @PostMapping(value = "/customers")
    public ResponseEntity<Object> customerRegister(@RequestBody CustomerRegisterDTO customerRegisterDTO){

       try {
           Customer customer =  userAccountsService.createCustomerAccount(customerRegisterDTO);
           return ResponseEntity.ok().body(customer);
       }catch (Exception ex){
           return ResponseEntity.badRequest().body(ex.getMessage());
       }

    }

    @PostMapping(value = "/sellers")
    public ResponseEntity<Object> sellerRegister(@RequestBody SellerRegisterDTO sellerRegisterDTO){

     //   try{
            Seller seller = userAccountsService.CreateSellerAccount(sellerRegisterDTO);
            return ResponseEntity.ok().body(seller);
        //}catch (Exception ex){
       ///     return ResponseEntity.badRequest().body(ex.getMessage());
      //  }



    }

    @PostMapping(value = "/customerdetails")
    public Customer customer(@RequestBody CustomerTest customer){

        return customerSerivce.getCustomerDetails(customer.getEmail());
    }

    @GetMapping(value = "/sellers")
    public ResponseEntity<Seller> customer(@RequestParam String email){

        Seller seller = sellerService.getSellerDetails(email);
        if(seller!=null){
            return ResponseEntity.ok().body(seller);
        }
        else {

            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping(value = "/seller/{id}")
    public Seller getSellerByid(@PathVariable(value = "id") int id){

        Seller seller = sellerService.getSellerbyId(id);

        if(seller!=null){
            return seller;
        }
        else{
            return null;
        }
    }



}
