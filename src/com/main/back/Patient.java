package com.main.back;

import com.main.bean.AdminBean;
import com.main.bean.CaseBean;
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
 * @date 2019/04/07
 * @describe 患者后台
 */
@WebServlet(name="patient",urlPatterns="/patient")
public class Patient extends HttpServlet {
    /**
     * 处理浏览器GET请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.sendRedirect("/page/patient/patient.jsp");
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
        //获取回写对象
        PrintWriter printWriter = resp.getWriter();
        //动作分发
        switch (action) {
            case ACTION_PATIENT_LOGIN:
                printWriter.print(doLogin(req));
                break;
            case ACTION_PATIENT_GET_HIS_CASE:
                printWriter.print(doDoctorGetHisCase(req));
                break;
            case ACTION_PATIENT_CLOSE:
                printWriter.print(doClose(req));
                break;
            case ACTION_PATIENT_GET_PAY:
                printWriter.print(doGetPay(req));
                break;
        }
    }

    /**
     * 患者登录动作
     * @param req
     * @return
     */
    private String doLogin(HttpServletRequest req) {
        String sql = "select * from patients where idcard=? and pwd=?";
        String[] p = {req.getParameter("idcard"), Base64Util.encode(req.getParameter("pwd"))};
        PatientBean patientBean = SqlHelper.doObjQuery(sql,p,PatientBean.class);
        if (patientBean != null) {
            JSONObject jsonObject = JSONObject.fromObject(patientBean);
            return jsonObject.toString();
        } else {
            return "";
        }
    }

    /**
     * 患者获取历史病历
     * @param req
     * @return
     */
    private String doDoctorGetHisCase(HttpServletRequest req) {
        String sql = "select cases.*,doctors.name doctorname from cases,doctors where patient=? and cases.doctor=doctors.id order by id desc";
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

    /**
     * 结算
     * @param req
     * @return
     */
    private Boolean doClose(HttpServletRequest req) {
        String sql_c = "select * from patients where id=?";
        String[] p_c = {
                req.getParameter("patient")
        };
        PatientBean patientBean = SqlHelper.doObjQuery(sql_c,p_c,PatientBean.class);
        if (patientBean != null) {
            //实时余额
            double all = patientBean.getBalance() - Double.parseDouble(req.getParameter("pay"));
            String sql_t = "update patients set balance=? where id=?";
            String[] p_t = {
                    String.valueOf(all),
                    req.getParameter("patient")
            };
            int result = SqlHelper.doUpdate(sql_t,p_t);
            if (result>0) {
                String sql = "update cases set state=? where id=?";
                String[] p = {
                        String.valueOf(1),
                        req.getParameter("id")
                };
                int r = SqlHelper.doUpdate(sql,p);
                if (r>0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * 获取钱包
     * @param req
     * @return
     */
    private String doGetPay(HttpServletRequest req) {
        String sql_c = "select * from patients where id=?";
        String[] p_c = {
                req.getParameter("patient")
        };
        PatientBean patientBean = SqlHelper.doObjQuery(sql_c,p_c,PatientBean.class);
        if (patientBean != null) {
            return String.valueOf(patientBean.getBalance());
        } else {
            return "";
        }
    }
}
