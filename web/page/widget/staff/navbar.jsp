<%--
  Created by IntelliJ IDEA.
  User: 潘佳丽
  Date: 2019/2/28
  Time: 0:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>工作人员导航栏</title>
</head>
<body>
<%--轮播--%>
<div id="topBanner" class="carousel slide" data-ride="carousel">
    <!-- 轮播（Carousel）项目 -->
    <div class="carousel-inner">
        <div class="item active">
            <img src="../../image/ban1.jpg" class="HomeTopImg">
        </div>
        <div class="item">
            <img src="../../image/ban2.jpg" class="HomeTopImg">
        </div>
        <div class="item">
            <img src="../../image/ban3.jpg" class="HomeTopImg">
        </div>
        <div class="item">
            <img src="../../image/ban4.jpg" class="HomeTopImg">
        </div>
    </div>
    <!-- 轮播（Carousel）导航 -->
    <a class="left carousel-control" href="#topBanner" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#topBanner" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>
<%--顶部布局--%>
<div class="TopNav">
    <ul>
        <li class="fr"><a href="/">欢迎您：<span id="staff_nav_name"></span>（请您谨慎处理私密信息）退出登录&nbsp;<span class="glyphicon glyphicon-log-out"></span></a></li>
        <li class="fr" id="staff_nav_case"><a href="#"><span class="glyphicon glyphicon-tags"></span>&nbsp;结算中心</a></li>
        <li class="fr" id="staff_nav_patient"><a href="#"><span class="glyphicon glyphicon-user"></span>&nbsp;患者管理</a></li>
    </ul>
</div>
<div class="cf"></div>
</body>
</html>
