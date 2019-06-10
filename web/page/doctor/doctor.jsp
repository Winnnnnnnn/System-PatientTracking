<%--
  Created by IntelliJ IDEA.
  User: 潘佳丽
  Date: 2019/3/2
  Time: 18:24
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
        <li class="fr"><a href="/">欢迎您：<span id="doctor_nav_name"></span>（请您谨慎处理私密信息）退出登录&nbsp;<span class="glyphicon glyphicon-log-out"></span></a></li>
    </ul>
</div>
<div class="cf"></div>
<div class="BaseCase" style="width: 98%;">
    <div id="doctor_toolbar" class="btn-group">
        <%--新增按钮--%>
        <button class="btn btn-info" data-toggle="modal" data-target="#doctor_dialog" onclick="addCase()"><span class="glyphicon glyphicon-plus"></span>&nbsp;创建病历</button>
    </div>
    <%--该医生创建的全部病历--%>
    <table id="doctor_table" class="table"></table>
</div>
<%--操作对话框--%>
<div class="modal fade" id="doctor_dialog" tabindex="-1" role="dialog" aria-labelledby="doctor_dialog_label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="doctor_dialog_label"></h4>
            </div>
            <div class="modal-body">
                <input type="hidden" id="doctor_dialog_id">
                <div id="doctor_dialog_body" class="form-horizontal text-center">
                    <h4 class="title">患者信息（输入正确的身份证自动显示）</h4>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">身份证号</label>
                        <div class="col-sm-10">
                            <input id="doctor_dialog_idcard" type="text" class="form-control" list="doctor_dialog_idcard_list">
                            <datalist id="doctor_dialog_idcard_list"></datalist>
                        </div>
                    </div>
                    <%--患者信息--%>
                    <div data-placement="left" data-toggle="tooltip" class="DoctorDialogPatientInfo" id="doctor_dialog_patient"></div>
                    <div class="cf"></div>
                    <%--病历信息--%>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">患者主诉</label>
                        <div class="col-sm-10">
                            <textarea id="doctor_dialog_zhusu" class="form-control" rows="4"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">检查项目</label>
                        <div class="col-sm-10">
                            <button data-toggle="modal" data-target="#doctor_project_dialog" onclick="addProjectToCase()" class="btn btn-default btn-sm" style="margin-bottom: 10px">添加新项目</button>
                            <div id="doctor_dialog_projects"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">医生诊断</label>
                        <div class="col-sm-10">
                            <textarea id="doctor_dialog_detail" class="form-control" rows="4"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">药品清单</label>
                        <div class="col-sm-10">
                            <button data-toggle="modal" data-target="#doctor_drug_dialog" onclick="addDrugToCase()" class="btn btn-default btn-sm" style="margin-bottom: 10px">添加新药品</button>
                            <div id="doctor_dialog_drugs"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">复诊日期</label>
                        <div class="col-sm-10">
                            <input id="doctor_dialog_endtime" type="datetime-local" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">全部价格</label>
                        <div class="col-sm-10">
                            <input id="doctor_dialog_pay" type="text" disabled class="form-control">
                        </div>
                    </div>
                </div>
                <div id="doctor_dialog_warn"><h4>确认要删除吗？</h4></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button id="doctor_dialog_btn_add" type="button" class="btn btn-info">创建</button>
                <button id="doctor_dialog_btn_edit" type="button" class="btn btn-info">修改</button>
                <button id="doctor_dialog_btn_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--添加项目对话框--%>
<div class="modal fade" id="doctor_project_dialog" tabindex="-1" role="dialog" aria-labelledby="doctor_project_dialog_label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="doctor_project_dialog_label">选择项目</h4>
            </div>
            <div class="modal-body">
                <div class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">项目列表</label>
                        <div class="col-sm-10">
                            <select id="doctor_project_dialog_list" class="form-control">
                                <option>请选择一个项目</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">项目价格</label>
                        <div class="col-sm-10">
                            <input id="doctor_project_dialog_price" class="form-control" disabled>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button id="doctor_project_dialog_btn_add" type="button" class="btn btn-info">添加</button>
            </div>
        </div>
    </div>
</div>
<%--添加药品对话框--%>
<div class="modal fade" id="doctor_drug_dialog" tabindex="-1" role="dialog" aria-labelledby="doctor_drug_dialog_label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="doctor_drug_dialog_label">选择项目</h4>
            </div>
            <div class="modal-body">
                <div class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">药品列表</label>
                        <div class="col-sm-10">
                            <select id="doctor_drug_dialog_list" class="form-control">
                                <option>请选择一个药品</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">药品数量</label>
                        <div class="col-sm-10">
                            <input type="number" id="doctor_drug_dialog_num" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">药品价格</label>
                        <div class="col-sm-10">
                            <input id="doctor_drug_dialog_price" class="form-control" disabled>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button id="doctor_drug_dialog_btn_add" type="button" class="btn btn-info">添加</button>
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
<script src="../../js/libs/bootstrap-datetimepicker.js"></script>
<script src="../../js/libs/locale/bootstrap-datetimepicker.zh-CN.js"></script>
<%--导入js--%>
<script src="../../js/utils/base64.js"></script>
<script src="../../js/doctor/doctor.js"></script>
</body>
</html>
