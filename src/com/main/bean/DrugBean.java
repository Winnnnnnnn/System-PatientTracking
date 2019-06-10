package com.main.bean;

/**
 * @author 潘佳丽
 * @date 2019/04/07
 * @describe 药品Bean
 */
public class DrugBean {
    private int id;
    private String title;
    private String price;

    public DrugBean() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}
