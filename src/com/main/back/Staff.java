package com.main.back;

import com.main.bean.CaseBean;
import com.main.bean.PatientBean;
import com.main.bean.StaffBean;
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
 * @date 2019/02/27
 * @describe 工作人员操作后台
 */
@WebServlet(name="staff",urlPatterns="/staff")
public class Staff extends HttpServlet {
    /**
     * 处理浏览器GET请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.sendRedirect("/page/staff/login.jsp");
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
            case ACTION_STAFF_LOGIN:
                //工作人员登录
                printWriter.print(doStaffLogin(req));
                break;
            case ACTION_STAFF_GET_PATIENTS:
                //工作人员获取患者列表
                printWriter.print(doStaffGetPatients());
                break;
            case ACTION_STAFF_ADD_PATIENT:
                //工作人员添加患者
                printWriter.print(doStaffAddPatient(req));
                break;
            case ACTION_STAFF_EDIT_PATIENT:
                //工作人员编辑患者
                printWriter.print(doStaffEditPatient(req));
                break;
            case ACTION_STAFF_DEL_PATIENT:
                //工作人员删除患者
                printWriter.print(doStaffDelPatient(req));
                break;
            case ACTION_STAFF_TOP_UP_PATIENT:
                //工作人员充值患者钱包
                printWriter.print(doStaffTopUpPatient(req));
                break;
            case ACTION_STAFF_GET_CASE:
                //获取订单列表
                printWriter.print(doStaffGetCases());
                break;
            case ACTION_STAFF_CLOSE:
                //结算
                printWriter.print(doStaffClose(req));
                break;
        }
    }

    /**
     * 工作人员登录动作
     * @param req
     * @return
     */
    private String doStaffLogin(HttpServletRequest req) {
        String sql = "select * from staffs where phone=? and pwd=?";
        String[] p = {req.getParameter("phone"), Base64Util.encode(req.getParameter("pwd"))};
        StaffBean staffBean = SqlHelper.doObjQuery(sql,p,StaffBean.class);
        if (staffBean != null) {
            JSONObject jsonObject = JSONObject.fromObject(staffBean);
            return jsonObject.toString();
        } else {
            return "";
        }
    }

    /**
     * 获取患者列表
     * @return
     */
    private String doStaffGetPatients() {
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
     * 添加患者
     * @param req
     * @return
     */
    private Boolean doStaffAddPatient(HttpServletRequest req) {
        String sql_c = "select * from patients where idcard=?";
        String[] p_c = {req.getParameter("idcard")};
        PatientBean patientBean = SqlHelper.doObjQuery(sql_c,p_c,PatientBean.class);
        if (patientBean != null) {
            return false;
        } else {
            String sql = "insert into patients(name,idcard,sex,date,age,phone,other,pwd) values(?,?,?,?,?,?,?,?)";
            String[] p = {
                    req.getParameter("name"),
                    req.getParameter("idcard"),
                    req.getParameter("sex"),
                    req.getParameter("date"),
                    req.getParameter("age"),
                    req.getParameter("phone"),
                    req.getParameter("other"),
                    Base64Util.encode(req.getParameter("pwd"))
            };
            int result = SqlHelper.doUpdate(sql,p);
            if (result>0) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * 编辑患者信息
     * @param req
     * @return
     */
    private Boolean doStaffEditPatient(HttpServletRequest req) {
        String sql = "update patients set name=?,idcard=?,sex=?,date=?,age=?,phone=?,other=?,pwd=? where id=?";
        String[] p = {
                req.getParameter("name"),
                req.getParameter("idcard"),
                req.getParameter("sex"),
                req.getParameter("date"),
                req.getParameter("age"),
                req.getParameter("phone"),
                req.getParameter("other"),
                Base64Util.encode(req.getParameter("pwd")),
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
     * 工作人员删除患者
     * @param req
     * @return
     */
    private Boolean doStaffDelPatient(HttpServletRequest req) {
        String sql = "delete from patients where id=?";
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
     * 患者钱包充值
     * @param req
     * @return
     */
    private Boolean doStaffTopUpPatient(HttpServletRequest req) {
        String sql_c = "select * from patients where id=?";
        String[] p_c = {
                req.getParameter("id")
        };
        PatientBean patientBean = SqlHelper.doObjQuery(sql_c,p_c,PatientBean.class);
        if (patientBean != null) {
            //实时余额
            double all = patientBean.getBalance() + Double.parseDouble(req.getParameter("balance"));
            String sql = "update patients set balance=? where id=?";
            String[] p = {
                    String.valueOf(all),
                    req.getParameter("id")
            };
            int result = SqlHelper.doUpdate(sql,p);
            if (result>0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * 获取订单列表
     * @return
     */
    private String doStaffGetCases() {
        String sql = "select cases.*,patients.name,patients.idcard,patients.sex,patients.date,patients.age,patients.phone,patients.other,doctors.name doctorname from patients,cases,doctors where cases.doctor=doctors.id and cases.patient=patients.id order by cases.id desc";
        List<CaseBean> caseBeanList = SqlHelper.doListQuery(sql,null,CaseBean.class);
        if (caseBeanList != null) {
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
    private Boolean doStaffClose(HttpServletRequest req) {
        String sql_c = "select * from patients where idcard=?";
        String[] p_c = {
                req.getParameter("idcard")
        };
        PatientBean patientBean = SqlHelper.doObjQuery(sql_c,p_c,PatientBean.class);
        if (patientBean != null) {
            //实时余额
            double all = patientBean.getBalance() - Double.parseDouble(req.getParameter("pay"));
            String sql_t = "update patients set balance=? where idcard=?";
            String[] p_t = {
                    String.valueOf(all),
                    req.getParameter("idcard")
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
}
