<%--
  Created by IntelliJ IDEA.
  User: Win
  Date: 2019/4/7
  Time: 12:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>病人跟踪治疗信息系统</title>
    <link rel="stylesheet" href="../../css/libs/bootstrap.css">
    <link rel="stylesheet" href="../../css/libs/bootstrap-table.css">
    <link rel="stylesheet" href="../../css/base.css">
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
<%--顶部导航栏--%>
<div class="TopNav">
    <ul>
        <li class="fr" id="patient_top_nav_info"><a href="/">欢迎您：<span id="patient_top_nav_info_name"></span>&nbsp;&nbsp;退出登录</a></li>
        <li class="fr"><a>当前余额：<span id="patient_top_nav_pay"></span></a></li>
        <li class="fr" id="top_nav_my"><a href="#">我的病历</a></li>
    </ul>
</div>
<%--个人病历--%>
<div class="MyCase" id="mycase" style="display: none;">
    <h2>我的病历</h2>
</div>
<%--导入jquery--%>
<script src="../../js/libs/jquery-3.3.1.js"></script>
<%--导入bootstrap--%>
<script src="../../js/libs/bootstrap.js"></script>
<script src="../../js/libs/bootstrap-table.js"></script>
<script src="../../js/libs/locale/bootstrap-table-zh-CN.js"></script>
<script src="../../js/utils/table.js"></script>
<script src="../../js/patient.js"></script>
</body>
</html>
