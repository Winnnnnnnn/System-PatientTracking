//启动路口
$(function () {
    initStaffNav();
});

/**
 * 初始化工作人员页导航栏
 */
function initStaffNav() {
    var name = getUrlParam('name');
    $('#staff_nav_name').html(name);
    //判断当前路由
    var menu = getUrlParam('menu');
    if (null == menu) {
        initPatient();
    } else {
        switch (menu) {
            case 'patient':
                initPatient();
                break;
            case 'case':
                initClose();
                break;
        }
    }
    //绑定导航按钮
    $('#staff_nav_patient').click(function () {
        window.location = '/page/staff/staff.jsp?name=' + name + '&menu=patient';
    });
    $('#staff_nav_case').click(function () {
        window.location = '/page/staff/staff.jsp?name=' + name + '&menu=case';
    });
}

/**
 * 初始化患者管理
 */
function initPatient() {
    $('#staff_patient').show();
    //初始化表格
    initPatientTable(1);
    //绑定日期选择组件
    $('#staff_patient_dialog_date').datetimepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        startView: 2,
        minView: 2,
        initialDate: new Date(),
        forceParse: true,
        bootcssVer:3,
        language: 'zh-CN'
    });
    //实时自动计算年龄
    $('#staff_patient_dialog_date').change(function () {
        $('#staff_patient_dialog_age').val(jsGetAge($(this).val()));
    });
}

/**
 * 初始化患者信息表
 */
function initPatientTable(pageNumber) {
//初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/staff',
        data:{action:'ACTION_STAFF_GET_PATIENTS'},
        id:'#staff_patient_table',
        toolbar:'#staff_patient_toolbar',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'name',
            title: '姓名',
            align: 'center'
        },{
            field: 'idcard',
            title: '身份证号',
            align: 'center'
        },{
            field: 'sex',
            title: '性别',
            align: 'center'
        },{
            field: 'date',
            title: '出生日期',
            align: 'center'
        },{
            field: 'age',
            title: '年龄',
            align: 'center'
        },{
            field: 'phone',
            title: '联系方式',
            align: 'center'
        },{
            field: 'other',
            title: '其他说明',
            align: 'center'
        },{
            field:'balance',
            title:'账户余额',
            align:'center'
        },{
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var patient = escape(JSON.stringify(row));
                return "<div class='btn btn-group'><button class='btn btn-info' data-toggle=\"modal\" data-target=\"#staff_patient_dialog\" onclick='editPatient(\"" + patient + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;信息修改</button><button class='btn btn-primary' data-toggle=\"modal\" data-target=\"#staff_patient_dialog\" onclick='topUpPatient(\"" + patient + "\")'><span class='glyphicon glyphicon-credit-card'></span>&nbsp;余额充值</button><button class='btn btn-danger' data-toggle=\"modal\" data-target=\"#staff_patient_dialog\" onclick='delPatient(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 初始化患者管理对话框
 */
function initPatientDialog() {
    $('#staff_patient_dialog_patient').hide();
    $('#staff_patient_dialog_reset').hide();
    $('#staff_patient_dialog_warn').hide();
    $('#staff_patient_dialog_btn_add').hide();
    $('#staff_patient_dialog_btn_edit').hide();
    $('#staff_patient_dialog_btn_del').hide();
    $('#staff_patient_dialog_btn_reset').hide();
}

/**
 * 添加患者
 */
function addPatient() {
    initPatientDialog();
    //清除数据
    $('#staff_patient_dialog_name').val('');
    $('#staff_patient_dialog_idcard').val('');
    $('#staff_patient_dialog_date').val('');
    $('#staff_patient_dialog_age').val('');
    $('#staff_patient_dialog_phone').val('');
    $('#staff_patient_dialog_other').val('');
    $('#staff_patient_dialog_patient').show();
    $('#staff_patient_dialog_label').html('添加患者');
    $('#staff_patient_dialog_btn_add').show();
    $('#staff_patient_dialog_pwd').val('');
}

/**
 * 绑定添加患者按钮
 */
$('#staff_patient_dialog_btn_add').click(function () {
    //获取数据
    var name = $('#staff_patient_dialog_name').val();
    var idcard = $('#staff_patient_dialog_idcard').val();
    var sex = $('#staff_patient_dialog_sex').val();
    var date = $('#staff_patient_dialog_date').val();
    var age = $('#staff_patient_dialog_age').val();
    var phone = $('#staff_patient_dialog_phone').val();
    var other = $('#staff_patient_dialog_other').val();
    var pwd = $('#staff_patient_dialog_pwd').val();
    //数据校验
    if ('' == name || '' == idcard || '' == date || '' == phone) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_STAFF_ADD_PATIENT',
            name:name,
            idcard:idcard,
            sex:sex,
            date:date,
            age:age,
            phone:phone,
            other:other,
            pwd:pwd
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/staff',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    alert('添加成功!');
                    //刷新表格
                    $('#staff_patient_dialog').modal('hide');
                    initPatientTable(1);
                } else {
                    alert('该患者已经存在!');
                }
            },
            error: function () {
                alert('添加失败!')
            }
        });
    }
});

/**
 * 编辑患者信息
 * @param data
 */
function editPatient(data) {
    var patient = JSON.parse(unescape(data));
    //填充数据
    initPatientDialog();
    $('#staff_patient_dialog_id').val(patient.id);
    $('#staff_patient_dialog_name').val(patient.name);
    $('#staff_patient_dialog_idcard').val(patient.idcard);
    $('#staff_patient_dialog_date').val(patient.date);
    $('#staff_patient_dialog_age').val(patient.age);
    $('#staff_patient_dialog_phone').val(patient.phone);
    $('#staff_patient_dialog_other').val(patient.other);
    $('#staff_patient_dialog_sex').val(patient.sex);
    $('#staff_patient_dialog_patient').show();
    $('#staff_patient_dialog_label').html('修改患者');
    $('#staff_patient_dialog_btn_edit').show();
    $('#staff_patient_dialog_pwd').val(new Base64().decode(patient.pwd));
}

/**
 * 绑定编辑患者按钮
 */
$('#staff_patient_dialog_btn_edit').click(function () {
    //获取数据
    var id = $('#staff_patient_dialog_id').val();
    var name = $('#staff_patient_dialog_name').val();
    var idcard = $('#staff_patient_dialog_idcard').val();
    var sex = $('#staff_patient_dialog_sex').val();
    var date = $('#staff_patient_dialog_date').val();
    var age = $('#staff_patient_dialog_age').val();
    var phone = $('#staff_patient_dialog_phone').val();
    var other = $('#staff_patient_dialog_other').val();
    var pwd = $('#staff_patient_dialog_pwd').val();
    //数据校验
    if ('' == name || '' == idcard || '' == date || '' == phone) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_STAFF_EDIT_PATIENT',
            id:id,
            name:name,
            idcard:idcard,
            sex:sex,
            date:date,
            age:age,
            phone:phone,
            other:other,
            pwd:pwd
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/staff',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    alert('修改成功!');
                    //刷新表格
                    $('#staff_patient_dialog').modal('hide');
                    initPatientTable($('#staff_patient_dialog').bootstrapTable('getOptions').pageNumber);
                } else {
                    alert('修改失败!');
                }
            },
            error: function () {
                alert('修改失败!')
            }
        });
    }
});

/**
 * 余额充值
 * @param data
 */
function topUpPatient(data) {
    var patient = JSON.parse(unescape(data));
    //填充数据
    initPatientDialog();
    $('#staff_patient_dialog_id').val(patient.id);
    $('#staff_patient_dialog_reset_name').html('姓名：' + patient.name);
    $('#staff_patient_dialog_reset_last').html('余额：' + patient.balance);
    $('#staff_patient_dialog_reset').show();
    $('#staff_patient_dialog_label').html('余额充值');
    $('#staff_patient_dialog_reset_num').val('');
    $('#staff_patient_dialog_btn_reset').show();
}

/**
 * 绑定充值按钮
 */
$('#staff_patient_dialog_btn_reset').click(function () {
    //获取数据
    var id = $('#staff_patient_dialog_id').val();
    var balance = $('#staff_patient_dialog_reset_num').val();
    if ('' == balance) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_STAFF_TOP_UP_PATIENT',
            id:id,
            balance:balance
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/staff',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    alert('充值成功!');
                    //刷新表格
                    $('#staff_patient_dialog').modal('hide');
                    initPatientTable($('#staff_patient_dialog').bootstrapTable('getOptions').pageNumber);
                } else {
                    alert('充值失败!');
                }
            },
            error: function () {
                alert('充值失败!')
            }
        });
    }
});

/**
 * 删除患者
 * @param id
 */
function delPatient(id) {
    initPatientDialog();
    $('#staff_patient_dialog_id').val(id);
    $('#staff_patient_dialog_label').html('删除患者');
    $('#staff_patient_dialog_warn').show();
    $('#staff_patient_dialog_btn_del').show();
}

/**
 * 绑定删除患者按钮
 */
$('#staff_patient_dialog_btn_del').click(function () {
    var id = $('#staff_patient_dialog_id').val();
    //封装数据
    var data = {
        action:'ACTION_STAFF_DEL_PATIENT',
        id:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/staff',
        dataType: "json",
        data: data,
        success: function (data) {
            if (data) {
                alert('删除成功!');
                //刷新表格
                $('#staff_patient_dialog').modal('hide');
                initPatientTable($('#staff_patient_dialog').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('删除失败!');
            }
        },
        error: function () {
            alert('删除失败!')
        }
    });
});

/**
 * 自动计算年龄
 * @param strBirthday
 * @returns {number}
 */
function jsGetAge(strBirthday){
    var returnAge;
    var strBirthdayArr=strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];
    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();
    if(nowYear == birthYear){
        returnAge = 0;//同年 则为0岁
    }
    else{
        var ageDiff = nowYear - birthYear ; //年之差
        if(ageDiff > 0){
            if(nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay;//日之差
                if(dayDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
            else
            {
                var monthDiff = nowMonth - birthMonth;//月之差
                if(monthDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
        }
        else
        {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return returnAge;//返回周岁年龄
}

/**
 * 初始化结算中心
 */
function initClose() {
    $('#staff_close').show();
    initCloseTable(1);
}

/**
 * 初始化表格
 * @param pageNumber
 */
function initCloseTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/staff',
        data:{action:'ACTION_STAFF_GET_CASE'},
        id:'#staff_close_table',
        toolbar:'',
        pageNumber:pageNumber,
        search:true,
        export:true,
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
                var state = row.state;
                var idcard = row.idcard;
                var pay = row.pay;
                switch (state) {
                    case 0:
                        return '<button class="btn btn-danger" onclick="doClose(\'' + idcard + '\',\'' + pay + '\',\'' + value + '\')">结算</button>';
                    case 1:
                        return '已完成';
                }
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 结算操作
 * @param idcard
 * @param pay
 * @param id
 */
function doClose(idcard,pay,id) {
    //封装数据
    var data = {
        action:'ACTION_STAFF_CLOSE',
        idcard:idcard,
        pay:pay,
        id:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/staff',
        dataType: "json",
        data: data,
        success: function (data) {
            if (data) {
                alert('结算成功!');
                //刷新表格
                initCloseTable($('#staff_close_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('结算失败!');
            }
        },
        error: function () {
            alert('结算失败!')
        }
    });
}

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