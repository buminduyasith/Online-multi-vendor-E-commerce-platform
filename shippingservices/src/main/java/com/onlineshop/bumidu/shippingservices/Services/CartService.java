package com.onlineshop.bumidu.shippingservices.Services;

//import com.onlineshop.bumidu.shippingservices.DTO.PurchaseDetailDTO;
import com.onlineshop.bumidu.shippingservices.Models.Cart;
import com.onlineshop.bumidu.shippingservices.Models.CartItem;
import com.onlineshop.bumidu.shippingservices.Models.Post;
import com.onlineshop.bumidu.shippingservices.Models.Reply;
import com.onlineshop.bumidu.shippingservices.Repository.CartItemRepository;
import com.onlineshop.bumidu.shippingservices.Repository.Cartrepository;
//import com.onlineshop.bumidu.shippingservices.Repository.ShippingRepository;
import org.bumidu.onlineshop.commons.Models.Seller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    Cartrepository cartrepository;

    RestTemplate restTemplate = new RestTemplate();


    /*@Autowired
    ShippingRepository shippingRepository;*/


   /* public PurchaseDetailDTO addProductToCart(PurchaseDetailDTO purchaseDetailDTO){

        Cart newCart = new Cart(
                purchaseDetailDTO.getTotalprice(),
                purchaseDetailDTO.getFkcousid(),
                purchaseDetailDTO.getCartdate(),
                purchaseDetailDTO.getItemcount()
        );

        Cart saveCart = cartrepository.save(newCart);

        List<CartItem> cartItemArrayList = new ArrayList<>();


        purchaseDetailDTO.getCartItemList().forEach(f -> f.setFkcartid(Integer.valueOf(saveCart.getCartid())));

        purchaseDetailDTO.getCartItemList().stream().forEachOrdered(cartItemArrayList::add);

        cartItemRepository.saveAll(cartItemArrayList);

        return purchaseDetailDTO;



    }*/


    public Cart addProductToCart(Cart cart){

        cart.getCartItems().forEach(item -> cart.setCart(item));

        return cartrepository.save(cart);


    }

    public Cart getCartDetails(Long id){

        Optional<Cart> cart = cartrepository.findById(id);

        if(cart.isPresent()){
            return cart.get();
        }

        else{
           return null;
        }

    }

    public List<Reply> getCartDetailsAndOrdersForCustomer(int id){

        List<Cart> cart = cartrepository.getCartdetailsAndOrdersForCustomer(id);
        List<Reply> replies = new ArrayList<>();

        for(Cart c: cart){
            Reply reply = new Reply();
            for(CartItem ci: c.getCartItems()){
                //ci.getSellerId()

               Seller seller =  restTemplate.getForObject("http://localhost:8081/api/v1/seller/"+ci.getSellerId(), Seller.class);



               reply.setSeller(seller);
               reply.setCartItem(ci);


            }
            reply.setCart(c);
            replies.add(reply);
        }


        if(replies != null){
             return replies;

        }
        else{
            return  null;
        }


    }


}
