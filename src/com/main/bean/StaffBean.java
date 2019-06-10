package com.main.bean;

/**
 * @author 潘佳丽
 * @date 2019/02/26
 * @describe 工作人员信息Bean
 */
public class StaffBean {
    private int id;
    private String name;
    private String phone;
    private String pwd;

    public StaffBean() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
}
