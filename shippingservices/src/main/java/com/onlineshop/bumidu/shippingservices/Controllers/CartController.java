package com.onlineshop.bumidu.shippingservices.Controllers;



//import com.onlineshop.bumidu.shippingservices.DTO.PurchaseDetailDTO;
import com.onlineshop.bumidu.shippingservices.Models.Cart;
import com.onlineshop.bumidu.shippingservices.Models.CartItem;
import com.onlineshop.bumidu.shippingservices.Models.Reply;
import com.onlineshop.bumidu.shippingservices.Services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")

public class CartController {

    @Autowired
    CartService cartService;

    @GetMapping(value = "/ping")
    public String test(){

        return "pong";
    }

   /* @PostMapping(value = "/cart")
    public PurchaseDetailDTO addProductToCart(@RequestBody PurchaseDetailDTO purchaseDetailDTO){

      //  return purchaseDetailDTO;
       return cartService.addProductToCart(purchaseDetailDTO);

    }*/

    @PostMapping(value = "/cart")
    public Cart addProductToCart(@RequestBody Cart cart){

        //return cart;
        return cartService.addProductToCart(cart);

    }

    //requestparm;

    @GetMapping(value = "/cart/{id}")
    public ResponseEntity<Cart> getPlacedOrders(@PathVariable Long id){

       Cart cart = cartService.getCartDetails(id);

       if(cart!=null){
           return ResponseEntity.ok().body(cart);
       }else{

           return ResponseEntity.notFound().build();
       }

        //return cartService.addProductToCart(cart);

    }


    @GetMapping(value = "/cart/customer/{id}")
    public ResponseEntity< List<Reply>> getOrdersForCustomer(@PathVariable int id){

        List<Reply> replies = cartService.getCartDetailsAndOrdersForCustomer(id);



        if(replies!=null){
            return ResponseEntity.ok().body(replies);
        }else{

            return ResponseEntity.notFound().build();
        }

        //return cartService.addProductToCart(cart);

    }


}
