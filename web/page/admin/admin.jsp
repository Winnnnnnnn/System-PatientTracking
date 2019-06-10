<%--
  Created by IntelliJ IDEA.
  User: 潘佳丽
  Date: 2019/2/26
  Time: 22:35
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
</head>
<body>
<%--左侧导航栏--%>
<jsp:include page="../widget/admin/navbar.jsp"></jsp:include>
<%--右侧内容填充区--%>
<div class="BaseCase">
    <%--医务人员管理--%>
    <jsp:include page="../widget/admin/doctor.jsp"></jsp:include>
    <%--工作人员管理--%>
    <jsp:include page="../widget/admin/staff.jsp"></jsp:include>
    <%--管理人员管理--%>
    <jsp:include page="../widget/admin/admin.jsp"></jsp:include>
    <%--药品管理--%>
    <jsp:include page="../widget/admin/drug.jsp"></jsp:include>
    <%--项目管理--%>
    <jsp:include page="../widget/admin/project.jsp"></jsp:include>
</div>
<%--添加/编辑/删除对话框--%>
<div class="modal fade" id="admin_doctor_dialog" tabindex="-1" role="dialog" aria-labelledby="admin_doctor_dialog_label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="admin_doctor_dialog_label"></h4>
            </div>
            <div class="modal-body">
                <input type="hidden" id="admin_doctor_dialog_id">
                <div id="admin_doctor_dialog_body" class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-10">
                            <input id="admin_doctor_dialog_name" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">手机号</label>
                        <div class="col-sm-10">
                            <input id="admin_doctor_dialog_phone" type="text" class="form-control" onkeyup="value=value.replace(/[^\d]/g,'')">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">密码</label>
                        <div class="col-sm-10">
                            <input id="admin_doctor_dialog_pwd" type="text" class="form-control">
                        </div>
                    </div>
                </div>
                <div id="admin_doctor_dialog_warn"><h4>确定要删除吗？</h4></div>
            </div>
            <%--底部按钮栏--%>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button id="admin_doctor_dialog_btn_add" type="button" class="btn btn-info">新增</button>
                <button id="admin_doctor_dialog_btn_edit" type="button" class="btn btn-info">修改</button>
                <button id="admin_doctor_dialog_btn_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--添加/编辑/删除对话框--%>
<div class="modal fade" id="admin_staff_dialog" tabindex="-1" role="dialog" aria-labelledby="admin_staff_dialog_label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="admin_staff_dialog_label"></h4>
            </div>
            <div class="modal-body">
                <input type="hidden" id="admin_staff_dialog_id">
                <div id="admin_staff_dialog_body" class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-10">
                            <input id="admin_staff_dialog_name" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">手机号</label>
                        <div class="col-sm-10">
                            <input id="admin_staff_dialog_phone" type="text" class="form-control" onkeyup="value=value.replace(/[^\d]/g,'')">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">密码</label>
                        <div class="col-sm-10">
                            <input id="admin_staff_dialog_pwd" type="text" class="form-control">
                        </div>
                    </div>
                </div>
                <div id="admin_staff_dialog_warn"><h4>确定要删除吗？</h4></div>
            </div>
            <%--底部按钮栏--%>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button id="admin_staff_dialog_btn_add" type="button" class="btn btn-info">新增</button>
                <button id="admin_staff_dialog_btn_edit" type="button" class="btn btn-info">修改</button>
                <button id="admin_staff_dialog_btn_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--添加/编辑/删除对话框--%>
<div class="modal fade" id="admin_admin_dialog" tabindex="-1" role="dialog" aria-labelledby="admin_admin_dialog_label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="admin_admin_dialog_label"></h4>
            </div>
            <div class="modal-body">
                <input type="hidden" id="admin_admin_dialog_id">
                <div id="admin_admin_dialog_body" class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-10">
                            <input id="admin_admin_dialog_name" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">密码</label>
                        <div class="col-sm-10">
                            <input id="admin_admin_dialog_pwd" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">权限</label>
                        <div class="col-sm-10">
                            <select id="admin_admin_dialog_power" class="form-control">
                                <option value="0">超级管理员</option>
                                <option value="1">普通管理员</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div id="admin_admin_dialog_warn"><h4>确定要删除吗？</h4></div>
            </div>
            <%--底部按钮栏--%>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button id="admin_admin_dialog_btn_add" type="button" class="btn btn-info">新增</button>
                <button id="admin_admin_dialog_btn_edit" type="button" class="btn btn-info">修改</button>
                <button id="admin_admin_dialog_btn_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--添加/编辑/删除对话框--%>
<div class="modal fade" id="admin_drug_dialog" tabindex="-1" role="dialog" aria-labelledby="admin_drug_dialog_label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="admin_drug_dialog_label"></h4>
            </div>
            <div class="modal-body">
                <input type="hidden" id="admin_drug_dialog_id">
                <div id="admin_drug_dialog_body" class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">药品名称</label>
                        <div class="col-sm-10">
                            <input id="admin_drug_dialog_title" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">药品价格</label>
                        <div class="col-sm-10">
                            <input id="admin_drug_dialog_price" type="text" class="form-control">
                        </div>
                    </div>
                </div>
                <div id="admin_drug_dialog_warn"><h4>确定要删除吗？</h4></div>
            </div>
            <%--底部按钮栏--%>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button id="admin_drug_dialog_btn_add" type="button" class="btn btn-info">新增</button>
                <button id="admin_drug_dialog_btn_edit" type="button" class="btn btn-info">修改</button>
                <button id="admin_drug_dialog_btn_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--添加/编辑/删除对话框--%>
<div class="modal fade" id="admin_project_dialog" tabindex="-1" role="dialog" aria-labelledby="admin_project_dialog_label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="admin_project_dialog_label"></h4>
            </div>
            <div class="modal-body">
                <input type="hidden" id="admin_project_dialog_id">
                <div id="admin_project_dialog_body" class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">项目名称</label>
                        <div class="col-sm-10">
                            <input id="admin_project_dialog_title" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">项目价格</label>
                        <div class="col-sm-10">
                            <input id="admin_project_dialog_price" type="text" class="form-control">
                        </div>
                    </div>
                </div>
                <div id="admin_project_dialog_warn"><h4>确定要删除吗？</h4></div>
            </div>
            <%--底部按钮栏--%>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button id="admin_project_dialog_btn_add" type="button" class="btn btn-info">新增</button>
                <button id="admin_project_dialog_btn_edit" type="button" class="btn btn-info">修改</button>
                <button id="admin_project_dialog_btn_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--导入jquery--%>
<script src="../../js/libs/jquery-3.3.1.js"></script>
<%--导入bootstrap--%>
<script src="../../js/libs/bootstrap.js"></script>
<script src="../../js/libs/bootstrap-table.js"></script>
<script src="../../js/libs/locale/bootstrap-table-zh-CN.js"></script>
<script src="../../js/utils/table.js"></script>
<%--导入js--%>
<script src="../../js/utils/base64.js"></script>
<script src="../../js/admin/admin.js"></script>
</body>
</html>
