package com.onlineshop.bumidu.shippingservices.Repository;

import com.onlineshop.bumidu.shippingservices.Models.Cart;
import com.onlineshop.bumidu.shippingservices.Models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface CartItemRepository extends JpaRepository<CartItem,Long> {

    @Query("SELECT u FROM CartItem u WHERE u.sellerId = :id")
    public List<CartItem> getOrdersForSellers(@Param("id") int id);

    @Query("SELECT u FROM CartItem u WHERE u.cart.fkCusId = :id")
    public List<CartItem> getOrdersForCustomer(@Param("id") int id);

    @Modifying
    @Query("Update CartItem c SET c.status=:status WHERE c.id=:id")
    public void updateStatus(@Param("id") Long id, @Param("status") int status);

    @Modifying
    @Query("Update CartItem u SET u.isDeleted =true WHERE u.orderNumber = :ordernumber")
    public void cancelorder(@Param("ordernumber") String ordernumber);

}
