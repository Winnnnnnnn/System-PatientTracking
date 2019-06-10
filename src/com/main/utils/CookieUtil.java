package com.main.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;

/**
 * @author 潘佳丽
 * @date 2019/01/13
 * @describe Cookie操作工具
 */
public class CookieUtil {
    /**
     * 添加Cookie
     * @param response
     * @param key
     * @param value
     */
    public static void addCookie(HttpServletResponse response, String key, String value) {
        Cookie cookie = new Cookie(key,value);
        //过期时间设置为24小时
        cookie.setMaxAge(60*60*24);
        response.addCookie(cookie);
    }

    /**
     * 获取Cookie
     * @param request
     * @param key
     * @return
     */
    public static String getCookie(HttpServletRequest request, String key) {
        String value = "";
        if (request.getCookies() != null) {
            //获取cookie集合
            List<Cookie> cookies = Arrays.asList(request.getCookies());
            if (cookies != null) {
                for (Cookie cookie:cookies) {
                    if (cookie.getName().equals(key)) {
                        value = cookie.getValue();
                        break;
                    }
                }
            }
        }
        return value;
    }

    /**
     * 删除Cookie
     * @param request
     * @param response
     * @param key
     */
    public static void delCookie(HttpServletRequest request, HttpServletResponse response, String key) {
        //获取Cookie集合
        List<Cookie> cookies = Arrays.asList(request.getCookies());
        if (cookies != null) {
            for (Cookie cookie:cookies) {
                if (cookie.getName().equals(key)) {
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }
            }
        }
    }
}
