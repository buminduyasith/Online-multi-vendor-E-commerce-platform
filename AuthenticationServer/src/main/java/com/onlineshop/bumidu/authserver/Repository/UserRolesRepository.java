package com.onlineshop.bumidu.authserver.Repository;

import com.onlineshop.bumidu.authserver.Models.UserRoles;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRolesRepository extends CrudRepository<UserRoles,Integer> {



}
