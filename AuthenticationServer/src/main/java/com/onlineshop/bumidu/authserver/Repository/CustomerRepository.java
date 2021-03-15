package com.onlineshop.bumidu.authserver.Repository;

import com.onlineshop.bumidu.authserver.Models.User;
import org.bumidu.onlineshop.commons.Models.Customer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends CrudRepository<Customer,Integer> {


    @Query("SELECT u FROM Customer u WHERE u.fk_user_id = :fkid")
    public Customer getUserByFkID(@Param("fkid") int fkid);

}
