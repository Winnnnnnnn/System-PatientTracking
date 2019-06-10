<%--
  Created by IntelliJ IDEA.
  User: 潘佳丽
  Date: 2019/2/27
  Time: 1:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>工作人员管理</title>
</head>
<body>
<div id="admin_staff" class="AdminMainItem">
    <div id="admin_staff_toolbar" class="btn-group">
        <%--新增按钮--%>
        <button class="btn btn-info" data-toggle="modal" data-target="#admin_staff_dialog" onclick="addStaff()"><span class="glyphicon glyphicon-plus"></span>&nbsp;新增工作人员</button>
    </div>
    <table id="admin_staff_table" class="table"></table>
</div>
</body>
</html>
