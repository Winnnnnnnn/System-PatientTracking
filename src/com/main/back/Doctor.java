package com.main.back;

import com.main.bean.CaseBean;
import com.main.bean.DoctorBean;
import com.main.bean.PatientBean;
import com.main.utils.Base64Util;
import com.main.utils.SqlHelper;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static com.main.utils.ConstUtil.*;

/**
 * @author 潘佳丽
 * @date 2019/03/02
 * @describe 医务人员后台
 */
@WebServlet(name="doctor",urlPatterns="/doctor")
public class Doctor extends HttpServlet {
    /**
     * 处理浏览器GET请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.sendRedirect("/page/doctor/login.jsp");
    }

    /**
     * 处理浏览器POST请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //调整编码，防止中文乱码
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        //获取动作
        String action = req.getParameter("action");
        //获取回调对象
        PrintWriter printWriter = resp.getWriter();
        switch (action) {
            case ACTION_DOCTOR_LOGIN:
                //医务人员登录
                printWriter.print(doDoctorLogin(req));
                break;
            case ACTION_DOCTOR_GET_CASE:
                //医务人员获取病历
                printWriter.print(doDoctorGetCase(req));
                break;
            case ACTION_DOCTOR_GET_PATIENTS:
                //医务人员获取患者信息
                printWriter.print(doDoctorGetPatient());
                break;
            case ACTION_DOCTOR_ADD_CASE:
                //医务人员创建病历
                printWriter.print(doDoctorAddCase(req));
                break;
            case ACTION_DOCTOR_EDIT_CASE:
                //医务人员编辑病历
                printWriter.print(doDoctorEditCase(req));
                break;
            case ACTION_DOCTOR_DEL_CASE:
                //医务人员删除病历
                printWriter.print(doDoctorDelCase(req));
                break;
            case ACTION_DOCTOR_GET_HIS_CASE:
                printWriter.print(doDoctorGetHisCase(req));
                break;
        }
    }

    /**
     * 医务人员登录动作
     * @param req
     * @return
     */
    private String doDoctorLogin(HttpServletRequest req) {
        String sql = "select * from doctors where phone=? and pwd=?";
        String[] p = {req.getParameter("phone"), Base64Util.encode(req.getParameter("pwd"))};
        DoctorBean doctorBean = SqlHelper.doObjQuery(sql,p,DoctorBean.class);
        if (doctorBean != null) {
            JSONObject jsonObject = JSONObject.fromObject(doctorBean);
            return jsonObject.toString();
        } else {
            return "";
        }
    }

    /**
     * 获取全部病历
     * @param req
     * @return
     */
    private String doDoctorGetCase(HttpServletRequest req) {
        String sql = "select cases.*,patients.name,patients.idcard,patients.sex,patients.date,patients.age,patients.phone,patients.other from patients,cases where cases.doctor=? and cases.patient=patients.id order by cases.id desc";
        String[] p = {req.getParameter("doctor")};
        List<CaseBean> caseBeanList = SqlHelper.doListQuery(sql,p,CaseBean.class);
        if (caseBeanList != null) {
            JSONArray jsonArray = JSONArray.fromObject(caseBeanList);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 获取全部患者
     * @return
     */
    private String doDoctorGetPatient() {
        String sql = "select * from patients order by id desc";
        List<PatientBean> patientBeanList = SqlHelper.doListQuery(sql,null,PatientBean.class);
        if (null != patientBeanList) {
            JSONArray jsonArray = JSONArray.fromObject(patientBeanList);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 创建病历
     * @param req
     * @return
     */
    private Boolean doDoctorAddCase(HttpServletRequest req) {
        String sql = "insert into cases(patient,doctor,zhusu,projects,detail,drugs,starttime,endtime,pay) values(?,?,?,?,?,?,?,?,?)";
        String[] p ={
                req.getParameter("patient"),
                req.getParameter("doctor"),
                req.getParameter("zhusu"),
                req.getParameter("projects"),
                req.getParameter("detail"),
                req.getParameter("drugs"),
                req.getParameter("starttime"),
                req.getParameter("endtime"),
                req.getParameter("pay")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 修改病历
     * @param req
     * @return
     */
    private Boolean doDoctorEditCase(HttpServletRequest req) {
        String sql = "update cases set zhusu=?,projects=?,detail=?,drugs=?,endtime=?,pay=? where id=?";
        String[] p = {
                req.getParameter("zhusu"),
                req.getParameter("projects"),
                req.getParameter("detail"),
                req.getParameter("drugs"),
                req.getParameter("endtime"),
                req.getParameter("pay"),
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除病历
     * @param req
     * @return
     */
    private Boolean doDoctorDelCase(HttpServletRequest req) {
        String sql = "delete from cases where id=?";
        String[] p = {
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取历史病历
     * @param req
     * @return
     */
    private String doDoctorGetHisCase(HttpServletRequest req) {
        String sql = "select * from cases where patient=? order by id desc";
        String[] p = {
                req.getParameter("patient")
        };
        List<CaseBean> caseBeanList = SqlHelper.doListQuery(sql,p,CaseBean.class);
        if (null != caseBeanList) {
            JSONArray jsonArray = JSONArray.fromObject(caseBeanList);
            return jsonArray.toString();
        } else {
            return "";
        }
    }
}
