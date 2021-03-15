package com.onlineshop.bumidu.authserver.Repository;

import org.bumidu.onlineshop.commons.Models.Customer;
import org.bumidu.onlineshop.commons.Models.Seller;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SellerRepository extends CrudRepository<Seller,Integer> {

    @Query("SELECT u FROM Seller u WHERE u.fk_user_id = :fkid")
    public Optional<Seller> getUserByFkID(@Param("fkid") int fkid);
}
