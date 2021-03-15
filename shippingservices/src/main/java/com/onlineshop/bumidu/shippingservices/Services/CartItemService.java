package com.onlineshop.bumidu.shippingservices.Services;

import com.onlineshop.bumidu.shippingservices.Models.CartItem;
import com.onlineshop.bumidu.shippingservices.Repository.CartItemRepository;
import com.onlineshop.bumidu.shippingservices.Repository.Cartrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {

    @Autowired
    CartItemRepository cartItemRepository;

   public List<CartItem> getOrderItemsForSellers(int id){

       List<CartItem> cartItem = cartItemRepository.getOrdersForSellers(id);

       if(cartItem != null){
           return cartItem;
       }
       else{
           return  null;
       }

   }

    public List<CartItem> getOrderItemsForCustomer(int id){

        List<CartItem> cartItem = cartItemRepository.getOrdersForCustomer(id);

        if(cartItem != null){
            return cartItem;
        }
        else{
            return  null;
        }

    }

   public void updateStatus(Long id , int status){

       cartItemRepository.updateStatus(id,status);

   }

    @Transactional
    public void canclOrder(String ordernumber){

        cartItemRepository.cancelorder(ordernumber);

    }

}
