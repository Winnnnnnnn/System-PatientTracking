package com.main.back;

import com.main.bean.AdminBean;
import com.main.bean.DoctorBean;
import com.main.bean.DrugBean;
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
 * @date 2019/02/26
 * @describe 管理员操作后台
 */
@WebServlet(name="admin",urlPatterns="/admin")
public class Admin extends HttpServlet {
    /**
     * 处理浏览器GET请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.sendRedirect("/page/admin/login.jsp");
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
            case ACTION_ADMIN_LOGIN:
                //管理员登录
                printWriter.print(doAdminLogin(req));
                break;
            case ACTION_ADMIN_GET_DOCTORS:
                //获取医务人员列表
                printWriter.print(doAdminGetDoctors());
                break;
            case ACTION_ADMIN_ADD_DOCTOR:
                //添加医务人员
                printWriter.print(doAdminAddDoctor(req));
                break;
            case ACTION_ADMIN_EDIT_DOCTOR:
                //编辑医务人员
                printWriter.print(doAdminEditDoctor(req));
                break;
            case ACTION_ADMIN_DEL_DOCTOR:
                //删除医务人员
                printWriter.print(doAdminDelDoctor(req));
                break;
            case ACTION_ADMIN_GET_STAFFS:
                //获取工作人员列表
                printWriter.print(doAdminGetStaffs());
                break;
            case ACTION_ADMIN_ADD_STAFF:
                //添加医务人员
                printWriter.print(doAdminAddStaff(req));
                break;
            case ACTION_ADMIN_EDIT_STAFF:
                //编辑医务人员
                printWriter.print(doAdminEditStaff(req));
                break;
            case ACTION_ADMIN_DEL_STAFF:
                //删除医务人员
                printWriter.print(doAdminDelStaff(req));
                break;
            case ACTION_ADMIN_GET_ADMIN:
                //获取管理员列表
                printWriter.print(doAdminGetAdmins());
                break;
            case ACTION_ADMIN_ADD_ADMIN:
                //添加管理员
                printWriter.print(doAdminAddAdmin(req));
                break;
            case ACTION_ADMIN_EDIT_ADMIN:
                //编辑管理员
                printWriter.print(doAdminEditAdmin(req));
                break;
            case ACTION_ADMIN_DEL_ADMIN:
                //删除管理员
                printWriter.print(doAdminDelAdmin(req));
                break;
            case ACTION_ADMIN_GET_DRUG:
                printWriter.print(doAdminGetDrug());
                break;
            case ACTION_ADMIN_ADD_DRUG:
                printWriter.print(doAdminAddDrug(req));
                break;
            case ACTION_ADMIN_EDIT_DRUG:
                printWriter.print(doAdminEditDrug(req));
                break;
            case ACTION_ADMIN_DEL_DRUG:
                printWriter.print(doAdminDelDrug(req));
                break;
            case ACTION_ADMIN_GET_PROJECT:
                printWriter.print(doAdminGetProject());
                break;
            case ACTION_ADMIN_ADD_PROJECT:
                printWriter.print(doAdminAddProject(req));
                break;
            case ACTION_ADMIN_EDIT_PROJECT:
                printWriter.print(doAdminEditProject(req));
                break;
            case ACTION_ADMIN_DEL_PROJECT:
                printWriter.print(doAdminDelProject(req));
                break;
        }
    }

    /**
     * 管理员登录动作
     * @param req
     * @return
     */
    private String doAdminLogin(HttpServletRequest req) {
        String sql = "select * from admin where name=? and pwd=?";
        String[] p = {req.getParameter("name"), Base64Util.encode(req.getParameter("pwd"))};
        AdminBean adminBean = SqlHelper.doObjQuery(sql,p,AdminBean.class);
        if (adminBean != null) {
            JSONObject jsonObject = JSONObject.fromObject(adminBean);
            return jsonObject.toString();
        } else {
            return "";
        }
    }

    /**
     * 获取医务人员列表
     * @return
     */
    private String doAdminGetDoctors() {
        String sql = "select * from doctors order by id desc";
        List<DoctorBean> doctorBeanList = SqlHelper.doListQuery(sql,null,DoctorBean.class);
        if (null != doctorBeanList) {
            JSONArray jsonArray = JSONArray.fromObject(doctorBeanList);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加医务人员
     * @param req
     * @return
     */
    private Boolean doAdminAddDoctor(HttpServletRequest req) {
        //校验
        String sql_c = "select * from doctors where phone=?";
        String[] p_c = {req.getParameter("phone")};
        DoctorBean doctorBean = SqlHelper.doObjQuery(sql_c,p_c,DoctorBean.class);
        if (null != doctorBean) {
            return false;
        } else {
            String sql = "insert into doctors(name,phone,pwd) values(?,?,?)";
            String[] p = {req.getParameter("name"),req.getParameter("phone"),Base64Util.encode(req.getParameter("pwd"))};
            int result = SqlHelper.doUpdate(sql,p);
            if (result>0) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * 编辑医务人员
     * @param req
     * @return
     */
    private Boolean doAdminEditDoctor(HttpServletRequest req) {
        String sql = "update doctors set name=?,phone=?,pwd=? where id=?";
        String[] p = {req.getParameter("name"),req.getParameter("phone"),Base64Util.encode(req.getParameter("pwd")),req.getParameter("id")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除医务人员
     * @param req
     * @return
     */
    private Boolean doAdminDelDoctor(HttpServletRequest req) {
        String sql = "delete from doctors where id=?";
        String[] p = {req.getParameter("id")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取工作人员列表
     * @return
     */
    private String doAdminGetStaffs() {
        String sql = "select * from staffs order by id desc";
        List<StaffBean> staffBeanList = SqlHelper.doListQuery(sql,null,StaffBean.class);
        if (null != staffBeanList) {
            JSONArray jsonArray = JSONArray.fromObject(staffBeanList);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加工作人员
     * @param req
     * @return
     */
    private Boolean doAdminAddStaff(HttpServletRequest req) {
        //校验
        String sql_c = "select * from staffs where phone=?";
        String[] p_c = {req.getParameter("phone")};
        StaffBean staffBean = SqlHelper.doObjQuery(sql_c,p_c,StaffBean.class);
        if (null != staffBean) {
            return false;
        } else {
            String sql = "insert into staffs(name,phone,pwd) values(?,?,?)";
            String[] p = {req.getParameter("name"),req.getParameter("phone"),Base64Util.encode(req.getParameter("pwd"))};
            int result = SqlHelper.doUpdate(sql,p);
            if (result>0) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * 编辑工作人员
     * @param req
     * @return
     */
    private Boolean doAdminEditStaff(HttpServletRequest req) {
        String sql = "update staffs set name=?,phone=?,pwd=? where id=?";
        String[] p = {req.getParameter("name"),req.getParameter("phone"),Base64Util.encode(req.getParameter("pwd")),req.getParameter("id")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除工作人员
     * @param req
     * @return
     */
    private Boolean doAdminDelStaff(HttpServletRequest req) {
        String sql = "delete from staffs where id=?";
        String[] p = {req.getParameter("id")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取管理员列表
     * @return
     */
    private String doAdminGetAdmins() {
        String sql = "select * from admin order by id desc";
        List<AdminBean> adminBeanList = SqlHelper.doListQuery(sql,null,AdminBean.class);
        if (null != adminBeanList) {
            JSONArray jsonArray = JSONArray.fromObject(adminBeanList);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加管理员
     * @param req
     * @return
     */
    private Boolean doAdminAddAdmin(HttpServletRequest req) {
        //校验
        String sql_c = "select * from admin where name=?";
        String[] p_c = {req.getParameter("name")};
        AdminBean adminBean = SqlHelper.doObjQuery(sql_c,p_c,AdminBean.class);
        if (null != adminBean) {
            return false;
        } else {
            String sql = "insert into admin(name,pwd,power) values(?,?,?)";
            String[] p = {req.getParameter("name"),Base64Util.encode(req.getParameter("pwd")),req.getParameter("power")};
            int result = SqlHelper.doUpdate(sql,p);
            if (result>0) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * 编辑管理员
     * @param req
     * @return
     */
    private Boolean doAdminEditAdmin(HttpServletRequest req) {
        String sql = "update admin set name=?,pwd=?,power=? where id=?";
        String[] p = {req.getParameter("name"),Base64Util.encode(req.getParameter("pwd")),req.getParameter("power"),req.getParameter("id")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除管理员
     * @param req
     * @return
     */
    private Boolean doAdminDelAdmin(HttpServletRequest req) {
        String sql = "delete from admin where id=?";
        String[] p = {req.getParameter("id")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取药品
     * @return
     */
    private String doAdminGetDrug() {
        String sql = "select * from drugs order by id desc";
        List<DrugBean> drugBeans = SqlHelper.doListQuery(sql,null,DrugBean.class);
        if (null != drugBeans) {
            JSONArray jsonArray = JSONArray.fromObject(drugBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加药品
     * @param req
     * @return
     */
    private Boolean doAdminAddDrug(HttpServletRequest req) {
        String sql = "insert into drugs(title,price) values(?,?)";
        String[] p = {req.getParameter("title"),req.getParameter("price")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 编辑药品
     * @param req
     * @return
     */
    private Boolean doAdminEditDrug(HttpServletRequest req) {
        String sql = "update drugs set title=?,price=? where id=?";
        String[] p = {req.getParameter("title"),req.getParameter("price"),req.getParameter("id")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除药品
     * @param req
     * @return
     */
    private Boolean doAdminDelDrug(HttpServletRequest req) {
        String sql = "delete from drugs where id=?";
        String[] p = {req.getParameter("id")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取项目
     * @return
     */
    private String doAdminGetProject() {
        String sql = "select * from projects order by id desc";
        List<DrugBean> drugBeans = SqlHelper.doListQuery(sql,null,DrugBean.class);
        if (null != drugBeans) {
            JSONArray jsonArray = JSONArray.fromObject(drugBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加药品
     * @param req
     * @return
     */
    private Boolean doAdminAddProject(HttpServletRequest req) {
        String sql = "insert into projects(title,price) values(?,?)";
        String[] p = {req.getParameter("title"),req.getParameter("price")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 编辑药品
     * @param req
     * @return
     */
    private Boolean doAdminEditProject(HttpServletRequest req) {
        String sql = "update projects set title=?,price=? where id=?";
        String[] p = {req.getParameter("title"),req.getParameter("price"),req.getParameter("id")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除药品
     * @param req
     * @return
     */
    private Boolean doAdminDelProject(HttpServletRequest req) {
        String sql = "delete from projects where id=?";
        String[] p = {req.getParameter("id")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }
}
