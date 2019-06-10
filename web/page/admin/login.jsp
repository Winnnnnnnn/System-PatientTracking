<%--
  Created by IntelliJ IDEA.
  User: 潘佳丽
  Date: 2019/2/26
  Time: 21:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>病人跟踪治疗信息系统</title>
    <link rel="stylesheet" href="../../css/base.css">
</head>
<body class="AdminBody">
<%--透明蒙板--%>
<div class="Mask"></div>
<%--登录框--%>
<div class="AdminLoginBg">
    <%--logo--%>
    <img src="../../image/logo.png">
    <div class="AdminLoginFromBg">
        <div class="AdminLoginInputBg">
            <img src="../../image/icon/用户.png">
            <input id="name" type="text" placeholder="请输入用户名" autocomplete="off">
        </div>
        <div class="cf" style="margin-top: 20px;"></div>
        <div class="AdminLoginInputBg">
            <img src="../../image/icon/密码.png">
            <input id="pwd" type="password" placeholder="请输入密码" autocomplete="off">
        </div>
        <div class="cf" style="margin-top: 20px;"></div>
        <button id="login">立即登录</button>
    </div>
</div>
<script src="../../js/libs/jquery-3.3.1.js"></script>
<script src="../../js/admin/login.js"></script>
</body>
</html>
