//患者列表
var arr_patients = null;
var arr_idcard = null;
var id_patients = -1;
//项目列表
var projects = null;
var projects_list = null;
//药品列表
var drugs = null;
var drugs_list = null;

//启动路口
$(function () {
    initDoctorPage();
});

/**
 * 初始化页面
 */
function initDoctorPage() {
    //导航栏初始化
    $('#doctor_nav_name').html(getUrlParam('name'));
    $('#doctor_nav_logout').click(function () {
        window.location = '/page/doctor/login.jsp';
    });
    //初始化病历表
    initDoctorTable(1);
}

/**
 * 初始化表格
 * @param pageNumber
 */
function initDoctorTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/doctor',
        data:{action:'ACTION_DOCTOR_GET_CASE',doctor:getUrlParam('id')},
        id:'#doctor_table',
        toolbar:'#doctor_toolbar',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'id',
            title: '病历编号',
            align: 'center'
        },{
            field: 'name',
            title: '患者姓名',
            align: 'center'
        },{
            field: 'idcard',
            title: '身份证号',
            align: 'center'
        },{
            field: 'zhusu',
            title: '主诉',
            align: 'center'
        },{
            field: 'detail',
            title: '诊断',
            align: 'center'
        },{
            field: 'projects',
            title: '检查',
            align: 'center',
            formatter: function (value, row, index) {
                var projects = JSON.parse(value);
                var result = '';
                $.each(projects,function (i,obj) {
                    result += obj.title + "<br/>";
                });
                return result;
            }
        },{
            field: 'drugs',
            title: '药品',
            align: 'center',
            formatter: function (value, row, index) {
                var drugs = JSON.parse(value);
                var result = '';
                $.each(drugs,function (i,obj) {
                    result += obj.title + "×" + obj.num + "<br/>";
                });
                return result;
            }
        },{
            field: 'pay',
            title: '项目价格',
            align: 'center'
        },{
            field: 'state',
            title: '项目状态',
            align: 'center',
            formatter: function (value, row, index) {
                switch (value) {
                    case 0:
                        return '待支付';
                    case 1:
                        return '已支付';
                }
            }
        },{
            field: 'starttime',
            title: '就诊时间',
            align: 'center'
        },{
            field: 'endtime',
            title: '复诊时间',
            align: 'center',
            formatter: function (value, row, index) {
                return value.replace('T','&nbsp;');
            }
        },{
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var cases = escape(JSON.stringify(row));
                return "<div class='btn-group'><button class='btn btn-info' data-toggle=\"modal\" data-target=\"#doctor_dialog\" onclick='editCase(\"" + cases + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;编辑</button><button class='btn btn-danger' data-toggle=\"modal\" data-target=\"#doctor_dialog\" onclick='delCase(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 初始化对话框
 */
function initDoctorDialog() {
    $('#doctor_dialog_body').hide();
    $('#doctor_dialog_warn').hide();
    $('#doctor_dialog_btn_add').hide();
    $('#doctor_dialog_btn_del').hide();
    $('#doctor_dialog_btn_edit').hide();
}

/**
 * 创建病历
 */
function addCase() {
    $("[data-toggle='tooltip']").tooltip({html : true });
    //清空数据
    projects_list = new Array();
    drugs_list = new Array();
    initDoctorDialog();
    $('#doctor_dialog_body').show();
    $('#doctor_dialog_btn_add').show();
    $('#doctor_dialog_label').html('创建病历');
    $('#doctor_dialog_idcard_list').empty();
    $('#doctor_dialog_idcard').val('');
    $("#doctor_dialog_idcard").removeAttr("disabled");
    $('#doctor_dialog_zhusu').val('');
    $('#doctor_dialog_projects').empty();
    $('#doctor_dialog_detail').val('');
    $('#doctor_dialog_drugs').empty();
    $('#doctor_dialog_endtime').val('2019-01-01T00:00');
    $('#doctor_dialog_pay').val('');
    $('#doctor_dialog_patient').hide();
    id_patients = -1;
    //获取全部患者信息
    $.ajax({
        type: 'post',
        url: '/doctor',
        dataType: "json",
        data: {action:'ACTION_DOCTOR_GET_PATIENTS'},
        success: function (res) {
            arr_patients = new Array();
            arr_idcard = new Array();
            arr_patients = res;
            $.each(arr_patients, function (i, obj) {
                //提供下拉选择
                var browser = '<option value="' + obj.idcard + '">';
                $('#doctor_dialog_idcard_list').append(browser);
                arr_idcard.push(obj.idcard);
            });
            //绑定身份证输入框
            $('#doctor_dialog_idcard').change(function () {
                if (arr_idcard.indexOf($(this).val()) != -1) {
                    var idcard = $(this).val();
                    //获取患者信息
                    $.each(arr_patients, function (i, obj) {
                        if (obj.idcard == idcard) {
                            var info = '<div class="DoctorDialogPatientInfoTop">\
                                <h4>' + obj.name + '</h4>\
                                <h4>' + obj.sex + '</h4>\
                                <h4>' + obj.date + '</h4>\
                                <h4>' + obj.age + '</h4>\
                                <h4>' + obj.phone + '</h4>\
                                <h4>' + obj.other + '</h4>\
                            </div>';
                            $('#doctor_dialog_patient').empty();
                            $('#doctor_dialog_patient').append(info);
                            $('#doctor_dialog_patient').show();
                            //获取历史病历
                            $.ajax({
                                type: 'post',
                                url: '/doctor',
                                dataType: "json",
                                data: {action:'ACTION_DOCTOR_GET_HIS_CASE',patient:obj.id},
                                success: function (data) {
                                    if (data != null && data.length>0) {
                                        var cases = "<div class='CasesList'><h3>历史病历</h3>";
                                        //预览患者的历史病历
                                        $.each(data,function (i,obj) {
                                            cases +=
                                                "<div>" +
                                                    "<h5>主诉：" + obj.zhusu +  "</h5>" +
                                                    "<h5>诊断：" + obj.detail +  "</h5>" +
                                                    "<h5>就诊：" + obj.starttime +  "</h5>" +
                                                    "<h5>复诊：" + obj.endtime.replace('T','&nbsp;') +  "</h5>" +
                                                "</div>"
                                        });
                                        //闭合
                                        cases += "</div>";
                                        $('#doctor_dialog_patient').attr('title',cases).tooltip('fixTitle');;
                                        $("[data-toggle='tooltip']").tooltip({html : true });
                                    } else {
                                        //预览患者的历史病历
                                        var cases =
                                            "<div class='CasesList'>无历史病历</div>";
                                        $('#doctor_dialog_patient').attr('title',cases).tooltip('fixTitle');;
                                        $("[data-toggle='tooltip']").tooltip({html : true });
                                    }
                                },
                                error: function () {
                                    //预览患者的历史病历
                                    var cases =
                                        "<div class='CasesList'>无历史病历</div>";
                                    $('#doctor_dialog_patient').attr('title',cases).tooltip('fixTitle');;
                                    $("[data-toggle='tooltip']").tooltip({html : true });
                                }
                            });
                            id_patients = obj.id;
                        }
                    });
                } else {
                    id_patients = -1;
                    $('#doctor_dialog_patient').empty();
                    $('#doctor_dialog_patient').hide();
                }
            });
        },
        error: function () {
            arr_patients = null;
            arr_idcard = null;
            id_patients = -1;
        }
    });
}

/**
 * 添加药品到病历中
 */
function addDrugToCase(){
    $('#doctor_drug_dialog').on("hidden.bs.modal",function(){
        $(document.body).addClass("modal-open");
    });
    $('#doctor_drug_dialog_list').empty();
    $('#doctor_drug_dialog_list').append('<option>请选择一个药品</option>');
    $('#doctor_drug_dialog_price').val('');
    $('#doctor_drug_dialog_num').val(1);
    $('#doctor_drug_dialog_num').change(function () {
        var price = parseFloat($('#doctor_drug_dialog_price').val()) * $(this).val();
        $('#doctor_drug_dialog_price').val(price);
    });
    //获取药品
    var data = {
        action:'ACTION_ADMIN_GET_DRUG'
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (data) {
            if (null != data && data.length>0) {
                //赋值给全局
                drugs = data;
                $.each(data,function (i,obj) {
                    var op = "<option value='" + i + "'>" + obj.title + "</option>";
                    $('#doctor_drug_dialog_list').append(op);
                });
                //绑定选择事件
                $('#doctor_drug_dialog_list').change(function () {
                    if ($(this).val()!='请选择一个药品') {
                        $('#doctor_drug_dialog_num').val(1);
                        //选择有效值
                        $('#doctor_drug_dialog_price').val(parseFloat(drugs[$(this).val()].price)*$('#doctor_drug_dialog_num').val());
                    } else {
                        $('#doctor_drug_dialog_num').val(1);
                        $('#doctor_drug_dialog_price').val('');
                    }
                });
            } else {
                alert('暂无药品!');
                $('#doctor_drug_dialog').modal('hide');
            }
        },
        error: function () {
            alert('暂无药品!');
            $('#doctor_drug_dialog').modal('hide');
        }
    });
}

/**
 * 添加药品到列表中
 */
$('#doctor_drug_dialog_btn_add').click(function () {
    var index = $('#doctor_drug_dialog_list').val();
    if (index != '请选择一个药品') {
        drugs[index].num = $('#doctor_drug_dialog_num').val();
        drugs[index].price = $('#doctor_drug_dialog_price').val();
        //选择有效值
        drugs_list.push(drugs[index]);
        var all_price = parseFloat($('#doctor_dialog_pay').val()==''?0:$('#doctor_dialog_pay').val()) + parseFloat(drugs[index].price);
        $('#doctor_dialog_pay').val(all_price);
        var count = drugs_list.length-1;
        var op =
            "<div class=\"ItemCard\">" +
            "<h4>" + drugs[index].title + "×" + drugs[index].num + "&nbsp;&nbsp;￥" + $('#doctor_drug_dialog_price').val() + "</h4>" +
            "<span onclick='delDrugFromCase(\"" + count + "\")' class=\"close glyphicon glyphicon-remove\"></span>" +
            "</div>";
        $('#doctor_dialog_drugs').append(op);
        $('#doctor_drug_dialog').modal('hide');
    } else {
        alert('请选择一个药品');
    }
});

/**
 * 从列表中删除
 */
function delDrugFromCase(id) {
    var all_price = parseFloat($('#doctor_dialog_pay').val()) - parseFloat(drugs_list[id].price);
    $('#doctor_dialog_pay').val(all_price);
    drugs_list.splice(id,1);
    $('#doctor_dialog_drugs').empty();
    $.each(drugs_list,function (i,obj) {
        var op =
            "<div class=\"ItemCard\">" +
            "<h4>" + obj.title + "×" + obj.num + "&nbsp;&nbsp;￥" + obj.price + "</h4>" +
            "<span onclick='delDrugFromCase(\"" + i + "\")' class=\"close glyphicon glyphicon-remove\"></span>" +
            "</div>";
        $('#doctor_dialog_drugs').append(op);
    });
}

/**
 * 添加项目到病历中
 */
function addProjectToCase(){
    $('#doctor_project_dialog').on("hidden.bs.modal",function(){
        $(document.body).addClass("modal-open");
    });
    $('#doctor_project_dialog_list').empty();
    $('#doctor_project_dialog_list').append('<option>请选择一个项目</option>');
    $('#doctor_project_dialog_price').val('');
    //获取项目
    var data = {
        action:'ACTION_ADMIN_GET_PROJECT'
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (data) {
            if (null != data && data.length>0) {
                //赋值给全局
                projects = data;
                $.each(data,function (i,obj) {
                    var op = "<option value='" + i + "'>" + obj.title + "</option>";
                    $('#doctor_project_dialog_list').append(op);
                });
                //绑定选择事件
                $('#doctor_project_dialog_list').change(function () {
                    if ($(this).val()!='请选择一个项目') {
                        //选择有效值
                        $('#doctor_project_dialog_price').val(projects[$(this).val()].price);
                    } else {
                        $('#doctor_project_dialog_price').val('');
                    }
                });
            } else {
                alert('暂无项目!');
                $('#doctor_project_dialog').modal('hide');
            }
        },
        error: function () {
            alert('暂无项目!');
            $('#doctor_project_dialog').modal('hide');
        }
    });
}

/**
 * 绑定项目的选择
 */
$('#doctor_project_dialog_btn_add').click(function () {
    var index = $('#doctor_project_dialog_list').val();
    if (index != '请选择一个项目') {
        //选择有效值
        projects_list.push(projects[index]);
        var all_price = parseFloat($('#doctor_dialog_pay').val()==''?0:$('#doctor_dialog_pay').val()) + parseFloat(projects[index].price);
        $('#doctor_dialog_pay').val(all_price);
        var count = projects_list.length-1;
        var op =
                "<div class=\"ItemCard\">" +
                    "<h4>" + projects[index].title + "&nbsp;&nbsp;￥" + projects[index].price + "</h4>" +
                    "<span onclick='delProjectFromCase(\"" + count + "\")' class=\"close glyphicon glyphicon-remove\"></span>" +
                "</div>";
        $('#doctor_dialog_projects').append(op);
        $('#doctor_project_dialog').modal('hide');
    } else {
        alert('请选择一个项目');
    }
});

/**
 * 从列表中删除
 */
function delProjectFromCase(id) {
    var all_price = parseFloat($('#doctor_dialog_pay').val()) - parseFloat(projects_list[id].price);
    $('#doctor_dialog_pay').val(all_price);
    projects_list.splice(id,1);
    $('#doctor_dialog_projects').empty();
    $.each(projects_list,function (i,obj) {
        var op =
            "<div class=\"ItemCard\">" +
            "<h4>" + obj.title + "&nbsp;&nbsp;￥" + obj.price + "</h4>" +
            "<span onclick='delProjectFromCase(\"" + i + "\")' class=\"close glyphicon glyphicon-remove\"></span>" +
            "</div>";
        $('#doctor_dialog_projects').append(op);
    });
}

/**
 * 绑定创建按钮
 */
$('#doctor_dialog_btn_add').click(function () {
    //判断患者数据
    if (-1 == id_patients) {
        alert('请选择患者!');
    } else {
        //获取数据
        var zhusu = $('#doctor_dialog_zhusu').val();
        var projects = JSON.stringify(projects_list);
        var detail = $('#doctor_dialog_detail').val();
        var drugs = JSON.stringify(drugs_list);
        var endtime = $('#doctor_dialog_endtime').val();
        var pay = $('#doctor_dialog_pay').val();
        var date = new Date();
        var month = date.getMonth()+1;
        var starttime = date.getFullYear() + '-' + month + '-' + date.getDate();
        //封装数据
        var data = {
            action:'ACTION_DOCTOR_ADD_CASE',
            patient:id_patients,
            doctor:getUrlParam('id'),
            zhusu:zhusu,
            projects:projects,
            detail:detail,
            drugs:drugs,
            starttime:starttime,
            endtime:endtime,
            pay:pay
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/doctor',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('创建成功!');
                    //隐藏对话框
                    $('#doctor_dialog').modal('hide');
                    //刷新表格
                    initDoctorTable(1);
                } else {
                    alert('创建失败!');
                }
            },
            error: function () {
                alert('创建失败!');
            }
        });
    }
});

/**
 * 编辑病历
 * @param data
 */
function editCase(data) {
    //清空数据
    projects_list = new Array();
    drugs_list = new Array();
    var cases = JSON.parse(unescape(data));
    //填充数据
    initDoctorDialog();
    $('#doctor_dialog_body').show();
    $('#doctor_dialog_btn_edit').show();
    $('#doctor_dialog_label').html('编辑病历');
    $('#doctor_dialog_idcard_list').empty();
    $('#doctor_dialog_id').val(cases.id);
    $('#doctor_dialog_idcard').val(cases.idcard);
    $("#doctor_dialog_idcard").attr("disabled","disabled");
    $('#doctor_dialog_zhusu').val(cases.zhusu);
    $('#doctor_dialog_detail').val(cases.detail);
    projects_list = JSON.parse(cases.projects);
    $('#doctor_dialog_projects').empty();
    $.each(projects_list,function (i,obj) {
        var op =
            "<div class=\"ItemCard\">" +
            "<h4>" + obj.title + "&nbsp;&nbsp;￥" + obj.price + "</h4>" +
            "<span onclick='delProjectFromCase(\"" + i + "\")' class=\"close glyphicon glyphicon-remove\"></span>" +
            "</div>";
        $('#doctor_dialog_projects').append(op);
    });
    drugs_list = JSON.parse(cases.drugs);
    $('#doctor_dialog_drugs').empty();
    $.each(drugs_list,function (i,obj) {
        var op =
            "<div class=\"ItemCard\">" +
            "<h4>" + obj.title + "×" + obj.num + "&nbsp;&nbsp;￥" + obj.price + "</h4>" +
            "<span onclick='delDrugFromCase(\"" + i + "\")' class=\"close glyphicon glyphicon-remove\"></span>" +
            "</div>";
        $('#doctor_dialog_drugs').append(op);
    });
    $('#doctor_dialog_endtime').val(cases.endtime);
    $('#doctor_dialog_pay').val(cases.pay);
    var info = '<div class="DoctorDialogPatientInfoTop">\
                                <h4>' + cases.name + '</h4>\
                                <h4>' + cases.sex + '</h4>\
                                <h4>' + cases.date + '</h4>\
                                <h4>' + cases.age + '</h4>\
                                <h4>' + cases.phone + '</h4>\
                                <h4>' + cases.other + '</h4>\
                            </div>';
    $('#doctor_dialog_patient').empty();
    $('#doctor_dialog_patient').append(info);
    $('#doctor_dialog_patient').show();
    //获取历史病历
    $.ajax({
        type: 'post',
        url: '/doctor',
        dataType: "json",
        data: {action:'ACTION_DOCTOR_GET_HIS_CASE',patient:cases.patient},
        success: function (data) {
            if (data != null && data.length>0) {
                var cases_tmp = "<div class='CasesList'><h3>历史病历</h3>";
                //预览患者的历史病历
                $.each(data,function (i,obj) {
                    cases_tmp +=
                        "<div>" +
                        "<h5>主诉：" + obj.zhusu +  "</h5>" +
                        "<h5>诊断：" + obj.detail +  "</h5>" +
                        "<h5>就诊：" + obj.starttime +  "</h5>" +
                        "<h5>复诊：" + obj.endtime.replace('T','&nbsp;') +  "</h5>" +
                        "</div>"
                });
                //闭合
                cases_tmp += "</div>";
                $('#doctor_dialog_patient').attr('title',cases_tmp).tooltip('fixTitle');;
                $("[data-toggle='tooltip']").tooltip({html : true });
            } else {
                //预览患者的历史病历
                var cases =
                    "<div class='CasesList'>无历史病历</div>";
                $('#doctor_dialog_patient').attr('title',cases).tooltip('fixTitle');;
                $("[data-toggle='tooltip']").tooltip({html : true });
            }
        },
        error: function () {
            //预览患者的历史病历
            var cases =
                "<div class='CasesList'>无历史病历</div>";
            $('#doctor_dialog_patient').attr('title',cases).tooltip('fixTitle');;
            $("[data-toggle='tooltip']").tooltip({html : true });
        }
    });
}

/**
 * 绑定编辑按钮
 */
$('#doctor_dialog_btn_edit').click(function () {
    //获取数据
    var id = $('#doctor_dialog_id').val();
    //获取数据
    var zhusu = $('#doctor_dialog_zhusu').val();
    var projects = JSON.stringify(projects_list);
    var detail = $('#doctor_dialog_detail').val();
    var drugs = JSON.stringify(drugs_list);
    var endtime = $('#doctor_dialog_endtime').val();
    var pay = $('#doctor_dialog_pay').val();
    //封装数据
    var data = {
        action:'ACTION_DOCTOR_EDIT_CASE',
        id:id,
        zhusu:zhusu,
        projects:projects,
        detail:detail,
        drugs:drugs,
        endtime:endtime,
        pay:pay
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/doctor',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('修改成功!');
                //隐藏对话框
                $('#doctor_dialog').modal('hide');
                //刷新表格
                initDoctorTable($('#doctor_dialog').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('修改失败!');
            }
        },
        error: function () {
            alert('修改失败!');
        }
    });
});

/**
 * 删除病历
 * @param id
 */
function delCase(id) {
    initDoctorDialog();
    $('#doctor_dialog_id').val(id);
    $('#doctor_dialog_warn').show();
    $('#doctor_dialog_btn_del').show();
    $('#doctor_dialog_label').html('删除病历');
}

/**
 * 绑定删除按钮
 */
$('#doctor_dialog_btn_del').click(function () {
    //获取数据
    var id = $('#doctor_dialog_id').val();
    //封装数据
    var data = {
        action:'ACTION_DOCTOR_DEL_CASE',
        id:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/doctor',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('删除成功!');
                //隐藏对话框
                $('#doctor_dialog').modal('hide');
                //刷新表格
                initDoctorTable($('#doctor_dialog').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('删除失败!');
            }
        },
        error: function () {
            alert('删除失败!');
        }
    });
});

/**
 * 获取url中的指定参数
 * @param {any} name
 */
function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    //返回参数值
    if (r != null)
        return decodeURI(r[2]);
    return null;
}