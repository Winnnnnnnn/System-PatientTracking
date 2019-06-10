//启动路口
$(function () {
    //绑定登录按钮
    $('#login').click(function () {
        var name = $('#name').val();
        var pwd = $('#pwd').val();
        var type = $('#type').val();
        if ('' == name || '' == pwd) {
            alert('数据无效!');
        } else {
            var data = null;
            switch (type) {
                case '0':
                    //封装数据
                    data = {
                        action:'ACTION_PATIENT_LOGIN',
                        idcard:name,
                        pwd:pwd
                    };
                    //提交数据到后台
                    $.ajax({
                        type: 'post',
                        url: '/patient',
                        dataType: "json",
                        data: data,
                        success: function (res) {
                            //登录成功
                            window.location = '/page/patient/patient.jsp?id=' + res.id + '&name=' + res.name + '&pay=' + res.balance;
                        },
                        error: function () {
                            alert('账号/密码错误!');
                        }
                    });
                    break;
                case '1':
                    //封装数据
                    data = {
                        action:'ACTION_STAFF_LOGIN',
                        phone:name,
                        pwd:pwd
                    };
                    //提交数据到后台
                    $.ajax({
                        type: 'post',
                        url: '/staff',
                        dataType: "json",
                        data: data,
                        success: function (res) {
                            //登录成功
                            window.location = '/page/staff/staff.jsp?name=' + res.name;
                        },
                        error: function () {
                            alert('账号/密码错误!');
                        }
                    });
                    break;
                case '2':
                    //封装数据
                    data = {
                        action:'ACTION_DOCTOR_LOGIN',
                        phone:name,
                        pwd:pwd
                    };
                    //提交数据到后台
                    $.ajax({
                        type: 'post',
                        url: '/doctor',
                        dataType: "json",
                        data: data,
                        success: function (res) {
                            //登录成功
                            window.location = '/page/doctor/doctor.jsp?id=' + res.id + '&name=' + res.name;
                        },
                        error: function () {
                            alert('账号/密码错误!');
                        }
                    });
                    break;
                case '3':
                    data = {
                        action:'ACTION_ADMIN_LOGIN',
                        name:name,
                        pwd:pwd
                    };
                    $.ajax({
                        type: 'post',
                        url: '/admin',
                        dataType: "json",
                        data: data,
                        success: function (res) {
                            //登录成功
                            window.location = '/page/admin/admin.jsp?power=' + res.power;
                        },
                        error: function () {
                            alert('账号/密码错误!');
                        }
                    });
                    break;
            }
        }
    });
    //监听用户按键
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            //回车绑定登录按钮
            $('#login').click();
        }
        if (event.keyCode == 40) {
            //向下键绑定密码输入框
            $('#pwd').focus();
        }
        if (event.keyCode == 38) {
            //向上键绑定用户名输入框
            $('#name').focus();
        }
    });
});