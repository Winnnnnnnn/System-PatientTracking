//启动入口
$(function () {
    //绑定登录按钮
    $('#login').click(function () {
        //获取数据
        var phone = $('#phone').val();
        var pwd = $('#pwd').val();
        //数据校验
        if ('' == phone || '' == pwd) {
            alert('请输入手机号/密码');
        } else {
            //封装数据
            var data = {
                action:'ACTION_DOCTOR_LOGIN',
                phone:phone,
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
                    alert('手机号/密码错误!');
                }
            });
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
            $('#phone').focus();
        }
    });
});