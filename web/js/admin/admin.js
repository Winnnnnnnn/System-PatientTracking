//启动路口
$(function () {
    initAdminNav();
});

/**
 * 初始化左侧导航栏
 */
function initAdminNav() {
    var menu = getUrlParam('menu');
    if (null == menu) {
        //默认选中第一个
        initDoctor();
    } else {
        switch (menu) {
            case 'doctor':
                initDoctor();
                break;
            case 'staff':
                initStaff();
                break;
            case 'admin':
                initAdmin();
                break;
            case 'drug':
                initDrug();
                break;
            case 'project':
                initProject();
                break;
        }
    }
    $('#admin_nav_doctor').click(function () {
        window.location = '/page/admin/admin.jsp?power=' + getUrlParam('power') + '&menu=doctor';
    });
    $('#admin_nav_staff').click(function () {
        window.location = '/page/admin/admin.jsp?power=' + getUrlParam('power') + '&menu=staff';
    });
    $('#admin_nav_admin').click(function () {
        window.location = '/page/admin/admin.jsp?power=' + getUrlParam('power') + '&menu=admin';
    });
    $('#admin_nav_drup').click(function () {
        window.location = '/page/admin/admin.jsp?power=' + getUrlParam('power') + '&menu=drug';
    });
    $('#admin_nav_project').click(function () {
        window.location = '/page/admin/admin.jsp?power=' + getUrlParam('power') + '&menu=project';
    });
}

/**
 * 初始化医务人员管理
 */
function initDoctor() {
    //控制布局动态显示
    $('#admin_doctor').show();
    initDoctorTable(1);
}

/**
 * 初始化医务人员信息表
 */
function initDoctorTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/admin',
        data:{action:'ACTION_ADMIN_GET_DOCTORS'},
        id:'#admin_doctor_table',
        toolbar:'#admin_doctor_toolbar',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'name',
            title: '姓名',
            align: 'center'
        }, {
            field: 'phone',
            title: '手机号',
            align: 'center'
        }, {
            field: 'pwd',
            title: '密码',
            align: 'center',
            formatter: function (value, row, index) {
                return new Base64().decode(value);
            }
        }, {
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var doctor = escape(JSON.stringify(row));
                return "<div class='btn-group'><button class='btn btn-info' data-toggle=\"modal\" data-target=\"#admin_doctor_dialog\" onclick='editDoctor(\"" + doctor + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;编辑</button><button class='btn btn-danger' data-toggle=\"modal\" data-target=\"#admin_doctor_dialog\" onclick='delDoctor(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 隐藏按钮
 */
function hideDoctorBtn() {
    $('#admin_doctor_dialog_btn_add').hide();
    $('#admin_doctor_dialog_btn_edit').hide();
    $('#admin_doctor_dialog_btn_del').hide();
    $('#admin_doctor_dialog_body').hide();
    $('#admin_doctor_dialog_warn').hide();
}

/**
 * 添加医务人员
 */
function addDoctor() {
    hideDoctorBtn();
    $('#admin_doctor_dialog_body').show();
    //清空数据
    $('#admin_doctor_dialog_name').val('');
    $('#admin_doctor_dialog_phone').val('');
    $('#admin_doctor_dialog_pwd').val('');
    $('#admin_doctor_dialog_label').html('新增医务人员');
    $('#admin_doctor_dialog_btn_add').show();
}

/**
 * 绑定新增医务人员按钮
 */
$('#admin_doctor_dialog_btn_add').click(function () {
    //获取数据
    var name = $('#admin_doctor_dialog_name').val();
    var phone = $('#admin_doctor_dialog_phone').val();
    var pwd = $('#admin_doctor_dialog_pwd').val();
    //数据校验
    if ('' == name || '' == phone || '' == pwd) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_ADD_DOCTOR',
            name:name,
            phone:phone,
            pwd:pwd
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    alert('新增成功!');
                    //刷新表格
                    $('#admin_doctor_dialog').modal('hide');
                    initDoctorTable(1);
                } else {
                    alert('该医务人员已经存在!');
                }
            },
            error: function () {
                alert('新增失败!')
            }
        });
    }
});

/**
 * 编辑医务人员信息
 * @param data
 */
function editDoctor(data) {
    hideDoctorBtn();
    $('#admin_doctor_dialog_body').show();
    //填充数据
    var doctor = JSON.parse(unescape(data));
    $('#admin_doctor_dialog_id').val(doctor.id);
    $('#admin_doctor_dialog_name').val(doctor.name);
    $('#admin_doctor_dialog_phone').val(doctor.phone);
    $('#admin_doctor_dialog_pwd').val(new Base64().decode(doctor.pwd));
    $('#admin_doctor_dialog_label').html('编辑医务人员');
    $('#admin_doctor_dialog_btn_edit').show();
}

/**
 * 绑定编辑医务人员按钮
 */
$('#admin_doctor_dialog_btn_edit').click(function () {
    //获取数据
    var id = $('#admin_doctor_dialog_id').val();
    var name = $('#admin_doctor_dialog_name').val();
    var phone = $('#admin_doctor_dialog_phone').val();
    var pwd = $('#admin_doctor_dialog_pwd').val();
    //数据校验
    if ('' == name || '' == phone || '' == pwd) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_EDIT_DOCTOR',
            id:id,
            name:name,
            phone:phone,
            pwd:pwd
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    alert('修改成功!');
                    //刷新表格
                    $('#admin_doctor_dialog').modal('hide');
                    initDoctorTable($('#admin_doctor_table').bootstrapTable('getOptions').pageNumber);
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
 * 删除医务人员
 * @param id
 */
function delDoctor(id) {
    hideDoctorBtn();
    $('#admin_doctor_dialog_warn').show();
    $('#admin_doctor_dialog_id').val(id);
    $('#admin_doctor_dialog_label').html('删除医务人员');
    $('#admin_doctor_dialog_btn_del').show();
}

/**
 * 绑定删除医务人员按钮
 */
$('#admin_doctor_dialog_btn_del').click( function () {
    var id = $('#admin_doctor_dialog_id').val();
    //封装数据
    var data = {
        action: 'ACTION_ADMIN_DEL_DOCTOR',
        id: id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (data) {
            if (data) {
                alert('删除成功!');
                //刷新表格
                $('#admin_doctor_dialog').modal('hide');
                initDoctorTable($('#admin_doctor_table').bootstrapTable('getOptions').pageNumber);
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
 * 初始化工作人员管理
 */
function initStaff() {
    //控制布局动态显示
    $('#admin_staff').show();
    initStaffTable(1);
}

/**
 * 初始化工作人员信息表
 */
function initStaffTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/admin',
        data:{action:'ACTION_ADMIN_GET_STAFFS'},
        id:'#admin_staff_table',
        toolbar:'#admin_staff_toolbar',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'name',
            title: '姓名',
            align: 'center'
        }, {
            field: 'phone',
            title: '手机号',
            align: 'center'
        }, {
            field: 'pwd',
            title: '密码',
            align: 'center',
            formatter: function (value, row, index) {
                return new Base64().decode(value);
            }
        }, {
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var staff = escape(JSON.stringify(row));
                return "<div class='btn-group'><button class='btn btn-info' data-toggle=\"modal\" data-target=\"#admin_staff_dialog\" onclick='editStaff(\"" + staff + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;编辑</button><button class='btn btn-danger' data-toggle=\"modal\" data-target=\"#admin_staff_dialog\" onclick='delStaff(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 隐藏按钮
 */
function hideStaffBtn() {
    $('#admin_staff_dialog_btn_add').hide();
    $('#admin_staff_dialog_btn_edit').hide();
    $('#admin_staff_dialog_btn_del').hide();
    $('#admin_staff_dialog_body').hide();
    $('#admin_staff_dialog_warn').hide();
}

/**
 * 添加工作人员
 */
function addStaff() {
    hideStaffBtn();
    $('#admin_staff_dialog_body').show();
    //清空数据
    $('#admin_staff_dialog_name').val('');
    $('#admin_staff_dialog_phone').val('');
    $('#admin_staff_dialog_pwd').val('');
    $('#admin_staff_dialog_label').html('新增工作人员');
    $('#admin_staff_dialog_btn_add').show();
}

/**
 * 绑定新增工作人员按钮
 */
$('#admin_staff_dialog_btn_add').click(function () {
    //获取数据
    var name = $('#admin_staff_dialog_name').val();
    var phone = $('#admin_staff_dialog_phone').val();
    var pwd = $('#admin_staff_dialog_pwd').val();
    //数据校验
    if ('' == name || '' == phone || '' == pwd) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_ADD_STAFF',
            name:name,
            phone:phone,
            pwd:pwd
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    alert('新增成功!');
                    //刷新表格
                    $('#admin_staff_dialog').modal('hide');
                    initStaffTable(1);
                } else {
                    alert('该工作人员已经存在!');
                }
            },
            error: function () {
                alert('新增失败!')
            }
        });
    }
});

/**
 * 编辑工作人员信息
 * @param data
 */
function editStaff(data) {
    hideStaffBtn();
    $('#admin_staff_dialog_body').show();
    //填充数据
    var doctor = JSON.parse(unescape(data));
    $('#admin_staff_dialog_id').val(doctor.id);
    $('#admin_staff_dialog_name').val(doctor.name);
    $('#admin_staff_dialog_phone').val(doctor.phone);
    $('#admin_staff_dialog_pwd').val(new Base64().decode(doctor.pwd));
    $('#admin_staff_dialog_label').html('编辑工作人员');
    $('#admin_staff_dialog_btn_edit').show();
}

/**
 * 绑定编辑工作人员按钮
 */
$('#admin_staff_dialog_btn_edit').click(function () {
    //获取数据
    var id = $('#admin_staff_dialog_id').val();
    var name = $('#admin_staff_dialog_name').val();
    var phone = $('#admin_staff_dialog_phone').val();
    var pwd = $('#admin_staff_dialog_pwd').val();
    //数据校验
    if ('' == name || '' == phone || '' == pwd) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_EDIT_STAFF',
            id:id,
            name:name,
            phone:phone,
            pwd:pwd
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    alert('修改成功!');
                    //刷新表格
                    $('#admin_staff_dialog').modal('hide');
                    initStaffTable($('#admin_staff_table').bootstrapTable('getOptions').pageNumber);
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
 * 删除工作人员
 * @param id
 */
function delStaff(id) {
    hideStaffBtn();
    $('#admin_staff_dialog_warn').show();
    $('#admin_staff_dialog_id').val(id);
    $('#admin_staff_dialog_label').html('删除工作人员');
    $('#admin_staff_dialog_btn_del').show();
}

/**
 * 绑定删除工作人员按钮
 */
$('#admin_staff_dialog_btn_del').click( function () {
    var id = $('#admin_staff_dialog_id').val();
    //封装数据
    var data = {
        action: 'ACTION_ADMIN_DEL_STAFF',
        id: id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (data) {
            if (data) {
                alert('删除成功!');
                //刷新表格
                $('#admin_staff_dialog').modal('hide');
                initStaffTable($('#admin_staff_table').bootstrapTable('getOptions').pageNumber);
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
 * 初始化管理人员管理
 */
function initAdmin() {
    $('#admin_admin').show();
    //判断权限
    var power = getUrlParam('power');
    switch (power) {
        case '0':
            $('#admin_admin_has_power').show();
            initAdminTable(1);
            break;
        case '1':
            $('#admin_admin_no_power').show();
            break;
    }
}

/**
 * 初始化管理员信息表
 * @param pageNumber
 */
function initAdminTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/admin',
        data:{action:'ACTION_ADMIN_GET_ADMIN'},
        id:'#admin_admin_table',
        toolbar:'#admin_admin_toolbar',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'name',
            title: '姓名',
            align: 'center'
        }, {
            field: 'pwd',
            title: '密码',
            align: 'center',
            formatter: function (value, row, index) {
                return new Base64().decode(value);
            }
        }, {
            field: 'power',
            title: '权限',
            align: 'center',
            formatter: function (value, row, index) {
                switch (value) {
                    case 0:
                        return '超级管理员';
                    case 1:
                        return '普通管理员';
                }
            }
        },{
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var admin = escape(JSON.stringify(row));
                return "<div class='btn-group'><button class='btn btn-info' data-toggle=\"modal\" data-target=\"#admin_admin_dialog\" onclick='editAdmin(\"" + admin + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;编辑</button><button class='btn btn-danger' data-toggle=\"modal\" data-target=\"#admin_admin_dialog\" onclick='delAdmin(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 隐藏管理员对话框相关组件
 */
function hideAdminBtn() {
    $('#admin_admin_dialog_btn_add').hide();
    $('#admin_admin_dialog_btn_edit').hide();
    $('#admin_admin_dialog_btn_del').hide();
    $('#admin_admin_dialog_body').hide();
    $('#admin_admin_dialog_warn').hide();
}

/**
 * 添加管理员
 */
function addAdmin() {
    hideAdminBtn();
    //清空数据
    $('#admin_admin_dialog_name').val('');
    $('#admin_admin_dialog_pwd').val('');
    $('#admin_admin_dialog_label').html('新增管理员');
    $('#admin_admin_dialog_body').show();
    $('#admin_admin_dialog_btn_add').show();
}

/**
 * 绑定添加管理员按钮
 */
$('#admin_admin_dialog_btn_add').click(function () {
    //获取数据
    var name = $('#admin_admin_dialog_name').val();
    var pwd = $('#admin_admin_dialog_pwd').val();
    var power = $('#admin_admin_dialog_power').val();
    //数据校验
    if ('' == name || '' == pwd) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_ADD_ADMIN',
            name:name,
            pwd:pwd,
            power:power
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    alert('新增成功!');
                    //刷新表格
                    $('#admin_admin_dialog').modal('hide');
                    initAdminTable(1);
                } else {
                    alert('该管理员已存在!');
                }
            },
            error: function () {
                alert('新增失败!')
            }
        });
    }
});

/**
 * 编辑管理员
 * @param data
 */
function editAdmin(data) {
    hideAdminBtn();
    //填充数据
    var admin = JSON.parse(unescape(data));
    $('#admin_admin_dialog_id').val(admin.id);
    $('#admin_admin_dialog_name').val(admin.name);
    $('#admin_admin_dialog_pwd').val(new Base64().decode(admin.pwd));
    $('#admin_admin_dialog_power').val(admin.power);
    $('#admin_admin_dialog_label').html('编辑管理员');
    $('#admin_admin_dialog_body').show();
    $('#admin_admin_dialog_btn_edit').show();
}

/**
 * 绑定编辑管理员按钮
 */
$('#admin_admin_dialog_btn_edit').click(function () {
    //获取数据
    var id = $('#admin_admin_dialog_id').val();
    var name = $('#admin_admin_dialog_name').val();
    var pwd = $('#admin_admin_dialog_pwd').val();
    var power = $('#admin_admin_dialog_power').val();
    //数据校验
    if ('' == name || '' == pwd) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_EDIT_ADMIN',
            id:id,
            name:name,
            pwd:pwd,
            power:power
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    alert('编辑成功!');
                    //刷新表格
                    $('#admin_admin_dialog').modal('hide');
                    initAdminTable($('#admin_admin_table').bootstrapTable('getOptions').pageNumber);
                } else {
                    alert('编辑失败!');
                }
            },
            error: function () {
                alert('编辑失败!')
            }
        });
    }
});

/**
 * 删除管理员
 * @param id
 */
function delAdmin(id) {
    hideAdminBtn();
    //填充数据
    $('#admin_admin_dialog_id').val(id);
    $('#admin_admin_dialog_warn').show();
    $('#admin_admin_dialog_label').html('删除管理员');
    $('#admin_admin_dialog_btn_del').show();
}

/**
 * 绑定删除管理员按钮
 */
$('#admin_admin_dialog_btn_del').click(function () {
    //获取数据
    var id = $('#admin_admin_dialog_id').val();
    //封装数据
    var data = {
        action:'ACTION_ADMIN_DEL_ADMIN',
        id:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (data) {
            if (data) {
                alert('删除成功!');
                //刷新表格
                $('#admin_admin_dialog').modal('hide');
                initAdminTable($('#admin_admin_table').bootstrapTable('getOptions').pageNumber);
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
 * 初始化药品管理
 */
function initDrug() {
    //控制布局动态显示
    $('#admin_drug').show();
    initDrugTable(1);
}

/**
 * 初始化医务人员信息表
 */
function initDrugTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/admin',
        data:{action:'ACTION_ADMIN_GET_DRUG'},
        id:'#admin_drug_table',
        toolbar:'#admin_drug_toolbar',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'title',
            title: '药品名称',
            align: 'center'
        }, {
            field: 'price',
            title: '药品价格',
            align: 'center'
        }, {
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var doctor = escape(JSON.stringify(row));
                return "<div class='btn-group'><button class='btn btn-info' data-toggle=\"modal\" data-target=\"#admin_drug_dialog\" onclick='editDrug(\"" + doctor + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;编辑</button><button class='btn btn-danger' data-toggle=\"modal\" data-target=\"#admin_drug_dialog\" onclick='delDrug(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 隐藏按钮
 */
function hideDrugBtn() {
    $('#admin_drug_dialog_btn_add').hide();
    $('#admin_drug_dialog_btn_edit').hide();
    $('#admin_drug_dialog_btn_del').hide();
    $('#admin_drug_dialog_body').hide();
    $('#admin_drug_dialog_warn').hide();
}

/**
 * 添加药品
 */
function addDrug() {
    hideDrugBtn();
    $('#admin_drug_dialog_body').show();
    //清空数据
    $('#admin_drug_dialog_title').val('');
    $('#admin_drug_dialog_price').val('');
    $('#admin_drug_dialog_label').html('添加药品');
    $('#admin_drug_dialog_btn_add').show();
}

/**
 * 绑定添加药品
 */
$('#admin_drug_dialog_btn_add').click(function () {
    //获取数据
    var title = $('#admin_drug_dialog_title').val();
    var price = $('#admin_drug_dialog_price').val();
    //数据校验
    if ('' == title || '' == price) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_ADD_DRUG',
            title:title,
            price:price
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    alert('添加成功!');
                    //刷新表格
                    $('#admin_drug_dialog').modal('hide');
                    initDrugTable(1);
                } else {
                    alert('添加失败!');
                }
            },
            error: function () {
                alert('添加失败!')
            }
        });
    }
});

/**
 * 编辑药品
 * @param data
 */
function editDrug(data) {
    hideDrugBtn();
    //填充数据
    var admin = JSON.parse(unescape(data));
    $('#admin_drug_dialog_id').val(admin.id);
    $('#admin_drug_dialog_title').val(admin.title);
    $('#admin_drug_dialog_price').val(admin.price);
    $('#admin_drug_dialog_label').html('编辑药品');
    $('#admin_drug_dialog_body').show();
    $('#admin_drug_dialog_btn_edit').show();
}

/**
 * 绑定编辑药品按钮
 */
$('#admin_drug_dialog_btn_edit').click(function () {
    //获取数据
    var id = $('#admin_drug_dialog_id').val();
    var title = $('#admin_drug_dialog_title').val();
    var price = $('#admin_drug_dialog_price').val();
    //数据校验
    if ('' == title || '' == price) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_EDIT_DRUG',
            id:id,
            title:title,
            price:price
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    alert('修改成功!');
                    //刷新表格
                    $('#admin_drug_dialog').modal('hide');
                    initDrugTable($('#admin_drug_table').bootstrapTable('getOptions').pageNumber);
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
 * 删除药品
 * @param id
 */
function delDrug(id) {
    hideDrugBtn();
    //填充数据
    $('#admin_drug_dialog_id').val(id);
    $('#admin_drug_dialog_warn').show();
    $('#admin_drug_dialog_label').html('删除药品');
    $('#admin_drug_dialog_btn_del').show();
}

/**
 * 绑定删除药品按钮
 */
$('#admin_drug_dialog_btn_del').click(function () {
    //获取数据
    var id = $('#admin_drug_dialog_id').val();
    //封装数据
    var data = {
        action:'ACTION_ADMIN_DEL_DRUG',
        id:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (data) {
            if (data) {
                alert('删除成功!');
                //刷新表格
                $('#admin_drug_dialog').modal('hide');
                initDrugTable($('#admin_drug_table').bootstrapTable('getOptions').pageNumber);
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
 * 初始化项目管理
 */
function initProject() {
    //控制布局动态显示
    $('#admin_project').show();
    initProjectTable(1);
}

/**
 * 初始化项目信息表
 */
function initProjectTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/admin',
        data:{action:'ACTION_ADMIN_GET_PROJECT'},
        id:'#admin_project_table',
        toolbar:'#admin_project_toolbar',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'title',
            title: '项目名称',
            align: 'center'
        }, {
            field: 'price',
            title: '项目价格',
            align: 'center'
        }, {
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var doctor = escape(JSON.stringify(row));
                return "<div class='btn-group'><button class='btn btn-info' data-toggle=\"modal\" data-target=\"#admin_project_dialog\" onclick='editProject(\"" + doctor + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;编辑</button><button class='btn btn-danger' data-toggle=\"modal\" data-target=\"#admin_project_dialog\" onclick='delProject(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 隐藏按钮
 */
function hideProjectBtn() {
    $('#admin_project_dialog_btn_add').hide();
    $('#admin_project_dialog_btn_edit').hide();
    $('#admin_project_dialog_btn_del').hide();
    $('#admin_project_dialog_body').hide();
    $('#admin_project_dialog_warn').hide();
}

/**
 * 添加项目
 */
function addProject() {
    hideProjectBtn();
    $('#admin_project_dialog_body').show();
    //清空数据
    $('#admin_project_dialog_title').val('');
    $('#admin_project_dialog_price').val('');
    $('#admin_project_dialog_label').html('添加项目');
    $('#admin_project_dialog_btn_add').show();
}

/**
 * 绑定添加项目
 */
$('#admin_project_dialog_btn_add').click(function () {
    //获取数据
    var title = $('#admin_project_dialog_title').val();
    var price = $('#admin_project_dialog_price').val();
    //数据校验
    if ('' == title || '' == price) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_ADD_PROJECT',
            title:title,
            price:price
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    alert('添加成功!');
                    //刷新表格
                    $('#admin_project_dialog').modal('hide');
                    initProjectTable(1);
                } else {
                    alert('添加失败!');
                }
            },
            error: function () {
                alert('添加失败!')
            }
        });
    }
});

/**
 * 编辑项目
 * @param data
 */
function editProject(data) {
    hideProjectBtn();
    //填充数据
    var admin = JSON.parse(unescape(data));
    $('#admin_project_dialog_id').val(admin.id);
    $('#admin_project_dialog_title').val(admin.title);
    $('#admin_project_dialog_price').val(admin.price);
    $('#admin_project_dialog_label').html('编辑项目');
    $('#admin_project_dialog_body').show();
    $('#admin_project_dialog_btn_edit').show();
}

/**
 * 绑定编辑药品按钮
 */
$('#admin_project_dialog_btn_edit').click(function () {
    //获取数据
    var id = $('#admin_project_dialog_id').val();
    var title = $('#admin_project_dialog_title').val();
    var price = $('#admin_project_dialog_price').val();
    //数据校验
    if ('' == title || '' == price) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_EDIT_PROJECT',
            id:id,
            title:title,
            price:price
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    alert('修改成功!');
                    //刷新表格
                    $('#admin_project_dialog').modal('hide');
                    initProjectTable($('#admin_project_table').bootstrapTable('getOptions').pageNumber);
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
 * 删除项目
 * @param id
 */
function delProject(id) {
    hideProjectBtn();
    //填充数据
    $('#admin_project_dialog_id').val(id);
    $('#admin_project_dialog_warn').show();
    $('#admin_project_dialog_label').html('删除项目');
    $('#admin_project_dialog_btn_del').show();
}

/**
 * 绑定删除项目按钮
 */
$('#admin_project_dialog_btn_del').click(function () {
    //获取数据
    var id = $('#admin_project_dialog_id').val();
    //封装数据
    var data = {
        action:'ACTION_ADMIN_DEL_PROJECT',
        id:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (data) {
            if (data) {
                alert('删除成功!');
                //刷新表格
                $('#admin_project_dialog').modal('hide');
                initProjectTable($('#admin_project_table').bootstrapTable('getOptions').pageNumber);
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
        return unescape(r[2]);
    return null;
}