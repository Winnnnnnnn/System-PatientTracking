<%--
  Created by IntelliJ IDEA.
  User: 潘佳丽
  Date: 2019/2/26
  Time: 23:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>医务人员管理</title>
</head>
<body>
<div id="admin_doctor" class="AdminMainItem">
    <div id="admin_doctor_toolbar" class="btn-group">
        <%--新增按钮--%>
        <button class="btn btn-info" data-toggle="modal" data-target="#admin_doctor_dialog" onclick="addDoctor()"><span class="glyphicon glyphicon-plus"></span>&nbsp;新增医务人员</button>
    </div>
    <table id="admin_doctor_table" class="table"></table>
</div>
</body>
</html>
