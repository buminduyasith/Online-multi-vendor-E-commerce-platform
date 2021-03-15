package com.onlineshop.bumidu.shippingservices.Models;


import org.bumidu.onlineshop.commons.Models.Seller;

import java.util.List;

public class Reply {

    private Seller seller;

    private Cart cart;

    private CartItem cartItem;

    public Reply() {
    }

    public Reply(Seller seller, Cart cart, CartItem cartItem) {
        this.seller = seller;
        this.cart = cart;
        this.cartItem = cartItem;
    }

    public Seller getSeller() {
        return seller;
    }

    public void setSeller(Seller seller) {
        this.seller = seller;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public CartItem getCartItem() {
        return cartItem;
    }

    public void setCartItem(CartItem cartItem) {
        this.cartItem = cartItem;
    }
}
