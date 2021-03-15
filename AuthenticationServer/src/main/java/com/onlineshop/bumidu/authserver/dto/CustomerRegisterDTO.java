package com.onlineshop.bumidu.authserver.dto;

import java.util.Date;

public class CustomerRegisterDTO {

    private String fname;

    private String lname;

    private String password;

    private String email;

    private Date dob;

    private String pnumber;

    public CustomerRegisterDTO(String fname, String lname, String password, String email, Date dob, String pnumber) {
        this.fname = fname;
        this.lname = lname;
        this.password = password;
        this.email = email;

        this.dob = dob;
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



    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getPnumber() {
        return pnumber;
    }

    public void setPnumber(String pnumber) {
        this.pnumber = pnumber;
    }

    // private Set<Role> roles = new HashSet<>();
}
