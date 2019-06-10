package com.main.bean;

/**
 * @author 潘佳丽
 * @date 2019/02/26
 * @describe 管理员Bean
 */
public class AdminBean {
    private int id;
    private String name;
    private String pwd;
    private int power;

    public AdminBean() {
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

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public int getPower() {
        return power;
    }

    public void setPower(int power) {
        this.power = power;
    }
}
