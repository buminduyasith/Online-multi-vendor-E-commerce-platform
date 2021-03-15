package com.onlineshop.bumidu.shippingservices.Models;

import javax.persistence.*;

@Entity
public class Shipping {

    @Id
    @Column(name = "cart_id")
    private Long id;
    private int fkCusId;
    private String fName;
    private String lName;
    private String addressLineOne;
    private int cityCode;
    private int provinceCode;
    private int districtCode;

    @OneToOne
    @MapsId
    @JoinColumn(name = "cart_id")
    private Cart cart;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getFkCusId() {
        return fkCusId;
    }

    public void setFkCusId(int fkCusId) {
        this.fkCusId = fkCusId;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public String getAddressLineOne() {
        return addressLineOne;
    }

    public void setAddressLineOne(String addressLineOne) {
        this.addressLineOne = addressLineOne;
    }

    public int getCityCode() {
        return cityCode;
    }

    public void setCityCode(int cityCode) {
        this.cityCode = cityCode;
    }

    public int getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(int provinceCode) {
        this.provinceCode = provinceCode;
    }

    public int getDistrictCode() {
        return districtCode;
    }

    public void setDistrictCode(int districtCode) {
        this.districtCode = districtCode;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }
}



