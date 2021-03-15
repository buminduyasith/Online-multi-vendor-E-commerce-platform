package com.onlineshop.bumidu.authserver.Service;

import com.onlineshop.bumidu.authserver.Exception.EmailAlreadyexsistException;
import com.onlineshop.bumidu.authserver.Models.User;
import com.onlineshop.bumidu.authserver.Models.UserRoles;
import com.onlineshop.bumidu.authserver.Repository.CustomerRepository;
import com.onlineshop.bumidu.authserver.Repository.SellerRepository;
import com.onlineshop.bumidu.authserver.Repository.UserRepository;
import com.onlineshop.bumidu.authserver.Repository.UserRolesRepository;
import com.onlineshop.bumidu.authserver.dto.CustomerRegisterDTO;
import com.onlineshop.bumidu.authserver.dto.SellerRegisterDTO;
import org.bumidu.onlineshop.commons.Models.Customer;
import org.bumidu.onlineshop.commons.Models.Seller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.file.FileAlreadyExistsException;

@Service
//@Transactional
public class UserAccountsService {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    UserRolesRepository userRolesRepository;

    @Autowired
    SellerRepository sellerRepository;

    //@Transactional(rollbackFor = )
    public Customer createCustomerAccount(CustomerRegisterDTO customerRegisterDTO) {

        if(userRepository.getUserByUsername(customerRegisterDTO.getEmail())!=null){

            throw new EmailAlreadyexsistException("Email already exist");
        }


        String Password = customerRegisterDTO.getPassword();


        customerRegisterDTO.setPassword(bCryptPasswordEncoder.encode(Password));

        User newUser =new User(
                customerRegisterDTO.getFname(),
                customerRegisterDTO.getPassword(),
                true,
                customerRegisterDTO.getEmail()

        );

        try {

            User Creatednewuser =  userRepository.save(newUser);
            UserRoles newuserroles = new UserRoles();
            newuserroles.setUser_id(Creatednewuser.getId());
            newuserroles.setRole_id(1);
            userRolesRepository.save(newuserroles);

            Customer newCustomer = new Customer(
                    Creatednewuser.getId(),
                    customerRegisterDTO.getFname(),
                    customerRegisterDTO.getLname(),
                    customerRegisterDTO.getDob(),
                    customerRegisterDTO.getPnumber()
            );



           return customerRepository.save(newCustomer);


        }catch (Exception ex){

            throw new RuntimeException(ex.getMessage());

        }


    }

    public Seller CreateSellerAccount(SellerRegisterDTO sellerRegisterDTO){

        if(userRepository.getUserByUsername(sellerRegisterDTO.getEmail())!=null){

            throw new EmailAlreadyexsistException("Email already exist");
        }



        String password = sellerRegisterDTO.getPassword();
        sellerRegisterDTO.setPassword(bCryptPasswordEncoder.encode(password));



        User newuser = new User(
                sellerRegisterDTO.getFname(),
                sellerRegisterDTO.getPassword(),
                true,
                sellerRegisterDTO.getEmail()
        );


        User createdUser = userRepository.save(newuser);

        UserRoles newUserRole = new UserRoles();
        newUserRole.setUser_id(createdUser.getId());
        newUserRole.setRole_id(2);
        userRolesRepository.save(newUserRole);

        Seller newSeller = new Seller(
                createdUser.getId(),
                sellerRegisterDTO.getFname(),
                sellerRegisterDTO.getLname(),
                sellerRegisterDTO.getShop_name(),
                sellerRegisterDTO.getPnumber()
        );

        return sellerRepository.save(newSeller);


    }
}
