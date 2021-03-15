package com.onlineshop.bumidu.shippingservices.Repository;

import com.onlineshop.bumidu.shippingservices.Models.Cart;
import com.onlineshop.bumidu.shippingservices.Models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface Cartrepository extends JpaRepository<Cart,Long> {


    @Query("SELECT u FROM Cart u WHERE u.fkCusId = :id")
    public List<Cart> getCartdetailsAndOrdersForCustomer(@Param("id") int id);

}
