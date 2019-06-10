<%--
  Created by IntelliJ IDEA.
  User: 潘佳丽
  Date: 2019/2/27
  Time: 2:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>管理员管理</title>
</head>
<body>
<div id="admin_admin" class="AdminMainItem">
    <div id="admin_admin_no_power" class="AdminMainNoPower">
        <h1>抱歉!您没有权限访问该页面!</h1>
    </div>
    <div id="admin_admin_has_power" class="AdminMainHasPower">
        <div id="admin_admin_toolbar" class="btn-group">
            <%--新增按钮--%>
            <button class="btn btn-info" data-toggle="modal" data-target="#admin_admin_dialog" onclick="addAdmin()"><span class="glyphicon glyphicon-plus"></span>&nbsp;新增管理员</button>
        </div>
        <table id="admin_admin_table" class="table"></table>
    </div>
</div>
</body>
</html>
