/**
 * 页面启动路口
 */
$(function () {
    initNav();
});

/**
 * 初始化导航栏
 */
function initNav() {
    $('#patient_top_nav_info_name').html(getUrlParam("name"));
    //获取钱包
    $.ajax({
        type: 'post',
        url: '/patient',
        dataType: "json",
        data: {action:'ACTION_PATIENT_GET_PAY',patient:getUrlParam("id")},
        success: function (data) {
            $('#patient_top_nav_pay').html(data);
        },
        error: function() {
            $('#patient_top_nav_pay').html('0');
        }
    });
    var menu = getUrlParam("menu");
    if (null == menu) {
        initCases();
    }
    $('#top_nav_my').click(function () {
        window.location = "/page/patient/patient.jsp?id=" + getUrlParam("id") + "&name=" + getUrlParam("name");
    });
}

/**
 * 初始化我的病历
 */
function initCases() {
    $('#mycase').fadeIn(500);
    //获取历史病历
    $.ajax({
        type: 'post',
        url: '/patient',
        dataType: "json",
        data: {action:'ACTION_PATIENT_GET_HIS_CASE',patient:getUrlParam('id')},
        success: function (data) {
            if (data != null && data.length>0) {
                $.each(data,function (i,obj) {
                    var endtime = obj.endtime.split('T');
                    var nowtime = getNowFormatDate();
                    var time = datedifference(endtime,nowtime);
                    var time_result = time<=7?"<h4 class=\"fr\" style='color: red;'>*即将到复诊时间：" + obj.endtime.replace('T',"&nbsp;") + "</h4>":"<h4 class=\"fr\">复诊时间：" + obj.endtime.replace('T',"&nbsp;") + "</h4>";
                    var projects = '';
                    var drugs = '';
                    $.each(JSON.parse(obj.projects),function (i,obj) {
                        projects += obj.title + "&nbsp;&nbsp;" + obj.price + "<br/>";
                    });
                    $.each(JSON.parse(obj.drugs),function (i,obj) {
                        drugs += obj.title + "×" + obj.num + "&nbsp;&nbsp;" + obj.price + "<br/>";
                    });
                    var status = obj.state==1?"<h3 class=\"fl\">已支付</h3>":"<button class=\"btn btn-info\" onclick='closeBtn(\"" + obj.id + "\",\"" + obj.patient + "\",\"" + obj.pay + "\")'>结算</button>";
                    var cases = "    <div class=\"MyCaseHas\">" +
                        "        <div>" +
                        "            <h3 class=\"fl\">病历清单</h3>" +
                        "            <h3 class=\"fl MyCaseHasPrice\">¥" + obj.pay + "</h3>" +
                        status +
                        time_result +
                        "            <h4 class=\"fr MyCaseHasTime\">就诊时间：" + obj.starttime + "</h4>" +
                        "        </div>" +
                        "        <div class=\"cf\"></div>" +
                        "        <p>主治医师：" + obj.doctorname + "</p>" +
                        "        <p>患者主诉：" + obj.zhusu + "</p>" +
                        "        <p>检查项目：<br/>" + projects + "</p>" +
                        "        <p>医生诊断：" + obj.detail + "</p>" +
                        "        <p>药物清单：<br/>" + drugs + "</p>" +
                        "    </div>";
                    $('#mycase').append(cases);
                });
            } else {
                var cases = "<div class=\"MyCaseNo\">" +
                    "<h3>暂无病历!</h3>" +
                    "</div>";
                $('#mycase').append(cases);
            }
        },
        error: function () {
            var cases = "<div class=\"MyCaseNo\">" +
                "<h3>暂无病历!</h3>" +
                "</div>";
            $('#mycase').append(cases);
        }
    });
}

/**
 * 结算
 * @param id
 */
function closeBtn(id,patient,pay) {
    //封装数据
    var data = {
        action:'ACTION_PATIENT_CLOSE',
        patient:patient,
        pay:pay,
        id:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/patient',
        dataType: "json",
        data: data,
        success: function (data) {
            if (data) {
                alert('结算成功!');
                window.location = "/page/patient/patient.jsp?id=" + getUrlParam("id") + "&name=" + getUrlParam("name");
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

/**
 * 时间差计算
 * @param sDate1
 * @param sDate2
 * @returns {number}
 */
function datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式
    var dateSpan,
        tempDate,
        iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays
}

/**
 * 获取当前日期
 * @returns {string}
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}