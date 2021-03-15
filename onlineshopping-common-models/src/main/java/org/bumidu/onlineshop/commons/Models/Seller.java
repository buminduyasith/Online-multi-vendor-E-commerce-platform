package org.bumidu.onlineshop.commons.Models;

import javax.persistence.*;

@Entity
@Table(name = "seller")
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int seller_id;

    private int fk_user_id;

    private String seller_fname;

    private String seller_lname;

    private String shop_name;

    private String pnumber;

    public Seller() {
    }

    public Seller(int fk_user_id, String seller_fname, String seller_lname, String shop_name, String pnumber) {

        this.fk_user_id = fk_user_id;
        this.seller_fname = seller_fname;
        this.seller_lname = seller_lname;
        this.shop_name = shop_name;
        this.pnumber = pnumber;
    }

    public int getSeller_id() {
        return seller_id;
    }

    public void setSeller_id(int seller_id) {
        this.seller_id = seller_id;
    }

    public int getFk_user_id() {
        return fk_user_id;
    }

    public void setFk_user_id(int fk_user_id) {
        this.fk_user_id = fk_user_id;
    }

    public String getSeller_fname() {
        return seller_fname;
    }

    public void setSeller_fname(String seller_fname) {
        this.seller_fname = seller_fname;
    }

    public String getSeller_lname() {
        return seller_lname;
    }

    public void setSeller_lname(String seller_lname) {
        this.seller_lname = seller_lname;
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
