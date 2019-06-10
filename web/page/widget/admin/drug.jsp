<%--
  Created by IntelliJ IDEA.
  User: 潘佳丽
  Date: 2019/4/7
  Time: 16:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>医务人员管理</title>
</head>
<body>
<div id="admin_drug" class="AdminMainItem">
    <div id="admin_drug_toolbar" class="btn-group">
        <%--新增按钮--%>
        <button class="btn btn-info" data-toggle="modal" data-target="#admin_drug_dialog" onclick="addDrug()"><span class="glyphicon glyphicon-plus"></span>&nbsp;添加药品</button>
    </div>
    <table id="admin_drug_table" class="table"></table>
</div>
</body>
</html>
