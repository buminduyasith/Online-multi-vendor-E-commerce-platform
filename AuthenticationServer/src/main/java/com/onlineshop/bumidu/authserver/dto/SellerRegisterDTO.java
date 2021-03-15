package com.onlineshop.bumidu.authserver.dto;

import java.util.Date;

public class SellerRegisterDTO {

    private String fname;

    private String lname;

    private String password;

    private String email;

    private String shop_name;

    private String pnumber;



    public SellerRegisterDTO() {
    }

    public SellerRegisterDTO(String fname, String lname, String password, String email, String shop_name, String pnumber) {
        this.fname = fname;
        this.lname = lname;
        this.password = password;
        this.email = email;
        this.shop_name = shop_name;
        this.pnumber = pnumber;

    }



    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getShop_name() {
        return shop_name;
    }

    public void setShop_name(String shop_name) {
        this.shop_name = shop_name;
    }

    public String getPnumber() {
        return pnumber;
    }

    public void setPnumber(String pnumber) {
        this.pnumber = pnumber;
    }
}
