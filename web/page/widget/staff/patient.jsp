<%--
  Created by IntelliJ IDEA.
  User: 潘佳丽
  Date: 2019/2/28
  Time: 20:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>患者管理</title>
</head>
<body>
<div id="staff_patient" class="StaffBody BaseCase">
    <div id="staff_patient_toolbar" class="btn-group">
        <%--新增按钮--%>
        <button class="btn btn-info" data-toggle="modal" data-target="#staff_patient_dialog" onclick="addPatient()"><span class="glyphicon glyphicon-plus"></span>&nbsp;添加患者</button>
    </div>
    <table id="staff_patient_table" class="table"></table>
</div>
<div class="modal fade" id="staff_patient_dialog" tabindex="-1" role="dialog" aria-labelledby="staff_patient_dialog_label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="staff_patient_dialog_label"></h4>
            </div>
            <div class="modal-body">
                <%--等待操作ID--%>
                <input type="hidden" id="staff_patient_dialog_id">
                <%--患者信息--%>
                <div id="staff_patient_dialog_patient" class="form-horizontal">
                    <%--姓名--%>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-10">
                            <input id="staff_patient_dialog_name" type="text" class="form-control">
                        </div>
                    </div>
                    <%--密码--%>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">密码</label>
                        <div class="col-sm-10">
                            <input id="staff_patient_dialog_pwd" type="text" class="form-control">
                        </div>
                    </div>
                    <%--身份证号--%>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">身份证号</label>
                        <div class="col-sm-10">
                            <input id="staff_patient_dialog_idcard" type="text" class="form-control">
                        </div>
                    </div>
                    <%--性别--%>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">性别</label>
                        <div class="col-sm-10">
                            <select id="staff_patient_dialog_sex" class="form-control">
                                <option value="男">男</option>
                                <option value="女">女</option>
                            </select>
                        </div>
                    </div>
                    <%--出生日期--%>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">出生日期</label>
                        <div class="col-sm-10">
                            <input id="staff_patient_dialog_date" type="text" class="form-control">
                        </div>
                    </div>
                    <%--年龄--%>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">年龄</label>
                        <div class="col-sm-10">
                            <input id="staff_patient_dialog_age" type="text" class="form-control" disabled>
                        </div>
                    </div>
                    <%--联系方式--%>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">联系方式</label>
                        <div class="col-sm-10">
                            <input id="staff_patient_dialog_phone" type="text" class="form-control">
                        </div>
                    </div>
                    <%--其他说明--%>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">其他说明</label>
                        <div class="col-sm-10">
                            <textarea id="staff_patient_dialog_other" class="form-control" rows="11"></textarea>
                        </div>
                    </div>
                </div>
                <%--充值信息--%>
                <div id="staff_patient_dialog_reset" class="form-horizontal text-center">
                    <%--充值人姓名--%>
                    <div class="form-group">
                        <label id="staff_patient_dialog_reset_name" class="col-sm-12"></label>
                    </div>
                    <%--当前余额--%>
                    <div class="form-group">
                        <label id="staff_patient_dialog_reset_last" class="col-sm-12"></label>
                    </div>
                    <%--充值金额--%>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">充值金额</label>
                        <div class="col-sm-10">
                            <input id="staff_patient_dialog_reset_num" type="text" class="form-control">
                        </div>
                    </div>
                </div>
                <div id="staff_patient_dialog_warn"><h4 class="modal-title">确定要删除吗？</h4></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button id="staff_patient_dialog_btn_add" type="button" class="btn btn-info">新增</button>
                <button id="staff_patient_dialog_btn_edit" type="button" class="btn btn-info">修改</button>
                <button id="staff_patient_dialog_btn_reset" type="button" class="btn btn-danger">充值</button>
                <button id="staff_patient_dialog_btn_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
