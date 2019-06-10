//启动路口
$(function () {
    //绑定登录按钮
    $('#login').click(function () {
       var name = $('#name').val();
       var pwd = $('#pwd').val();
       if ('' == name || '' == pwd) {
           alert('数据无效!');
       } else {
           var data = {
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
                   window.location = '/page/admin/admin.jsp?name=' + res.name + '&power=' + res.power;
               },
               error: function () {
                   alert('用户名/密码错误!');
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
            $('#name').focus();
        }
    });
});