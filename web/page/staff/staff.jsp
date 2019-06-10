<%--
  Created by IntelliJ IDEA.
  User: 潘佳丽
  Date: 2019/2/27
  Time: 22:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>病人跟踪治疗信息系统</title>
    <link rel="stylesheet" href="../../css/base.css">
    <link rel="stylesheet" href="../../css/libs/bootstrap.css">
    <link rel="stylesheet" href="../../css/libs/bootstrap-table.css">
    <link rel="stylesheet" href="../../css/libs/bootstrap-datetimepicker.css">
</head>
<body>
<%--顶部导航栏--%>
<jsp:include page="../widget/staff/navbar.jsp"></jsp:include>
<%--患者管理--%>
<jsp:include page="../widget/staff/patient.jsp"></jsp:include>
<%--结算中心--%>
<jsp:include page="../widget/staff/close.jsp"></jsp:include>
<%--导入jquery--%>
<script src="../../js/libs/jquery-3.3.1.js"></script>
<%--导入bootstrap--%>
<script src="../../js/libs/bootstrap.js"></script>
<script src="../../js/libs/bootstrap-table.js"></script>
<script src="../../js/libs/locale/bootstrap-table-zh-CN.js"></script>
<script src="../../js/utils/table.js"></script>
<script src="../../js/libs/bootstrap-datetimepicker.js"></script>
<script src="../../js/libs/locale/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="../../js/libs/bootstrap-table-export.js"></script>
<script src="../../js/libs/tableExport.js"></script>
<script src="../../js/libs/libs/js-xlsx/xlsx.core.min.js"></script>
<script src="../../js/libs/libs/FileSaver/FileSaver.min.js"></script>
<%--导入js--%>
<script src="../../js/utils/base64.js"></script>
<script src="../../js/staff/staff.js"></script>
</body>
</html>
