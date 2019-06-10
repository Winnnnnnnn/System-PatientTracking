<%--
  Created by IntelliJ IDEA.
  User: Win
  Date: 2019/4/7
  Time: 16:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>医务人员管理</title>
</head>
<body>
<div id="admin_project" class="AdminMainItem">
    <div id="admin_project_toolbar" class="btn-group">
        <%--新增按钮--%>
        <button class="btn btn-info" data-toggle="modal" data-target="#admin_project_dialog" onclick="addProject()"><span class="glyphicon glyphicon-plus"></span>&nbsp;添加项目</button>
    </div>
    <table id="admin_project_table" class="table"></table>
</div>
</body>
</html>
