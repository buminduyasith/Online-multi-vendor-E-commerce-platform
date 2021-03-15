package com.onlineshop.bumidu.inventoryservice.Models;

import javax.persistence.*;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pid;
    private int sellerid;
    private int categoryid;
    private String pdiscription;
    private String pthumbnail ;
    private String pphotos ;
    private  int qty;
    private String sku ;
    private double price;
    private String brand ;
    private String title ;
    private Boolean availability;
    private int Warranty;

    public int getWarranty() {
        return Warranty;
    }

    public void setWarranty(int warranty) {
        Warranty = warranty;
    }

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public int getSellerid() {
        return sellerid;
    }

    public void setSellerid(int sellerid) {
        this.sellerid = sellerid;
    }

    public int getCategoryid() {
        return categoryid;
    }

    public void setCategoryid(int categoryid) {
        this.categoryid = categoryid;
    }

   

    public String getPdiscription() {
        return pdiscription;
    }

    public void setPdiscription(String pdiscription) {
        this.pdiscription = pdiscription;
    }

    public String getPthumbnail() {
        return pthumbnail;
    }

    public void setPthumbnail(String pthumbnail) {
        this.pthumbnail = pthumbnail;
    }

    public String getPphotos() {
        return pphotos;
    }

    public void setPphotos(String pphotos) {
        this.pphotos = pphotos;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public Boolean getAvailability() {
        return availability;
    }

    public void setAvailability(Boolean availability) {
        this.availability = availability;
    }
}
