package com.onlineshop.bumidu.shippingservices.Controllers;

import com.onlineshop.bumidu.shippingservices.Models.CartItem;
import com.onlineshop.bumidu.shippingservices.Models.Response;
import com.onlineshop.bumidu.shippingservices.Services.CartItemService;
import com.onlineshop.bumidu.shippingservices.Services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/v1/")
public class CartItemController {

    @Autowired
    CartItemService cartItemService;

    @GetMapping(value = "/cartItemService/ping")
    public String test(){

        return "pong";
    }

    @GetMapping(value = "/orders/sellers/{id}")
    public ResponseEntity<Response> getOrdersForSellers(@PathVariable int id){

        Response response = new Response();



        List<CartItem> cartItem = cartItemService.getOrderItemsForSellers(id);

        response.setData(cartItem);

        if(cartItem!=null){
            return ResponseEntity.ok().body(response);
        }
        else{
            return ResponseEntity.notFound().build();
        }

    }

    @PutMapping(value = "/orders")
    @Transactional
    public void updateItemStatus(@RequestParam(value = "id") Long id, @RequestParam(value = "status") int status){

        cartItemService.updateStatus(id,status);

    }

    @GetMapping(value = "/orders/customers/{id}")
    public ResponseEntity<List<CartItem>> getOrdersForCustomer(@PathVariable int id){



        List<CartItem> cartItem = cartItemService.getOrderItemsForCustomer(id);


        if(cartItem!=null){
            return ResponseEntity.ok().body(cartItem);
        }
        else{
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping(value = "/orders/{id}")
    public ResponseEntity cancelOrder
            (@PathVariable(value = "id") String ordernumber){


        try {
            cartItemService.canclOrder(ordernumber);
            return ResponseEntity.ok().build();
        }catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }



    }


}
