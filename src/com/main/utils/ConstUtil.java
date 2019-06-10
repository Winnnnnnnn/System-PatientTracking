package com.main.utils;

/**
 * @author 潘佳丽
 * @date 2019/02/26
 * @describe 常量类封装
 */
public class ConstUtil {
    //管理员登录动作
    public static final String ACTION_ADMIN_LOGIN = "ACTION_ADMIN_LOGIN";
    //管理员获取医务人员列表
    public static final String ACTION_ADMIN_GET_DOCTORS = "ACTION_ADMIN_GET_DOCTORS";
    //管理员添加医务人员
    public static final String ACTION_ADMIN_ADD_DOCTOR = "ACTION_ADMIN_ADD_DOCTOR";
    //管理员编辑医务人员
    public static final String ACTION_ADMIN_EDIT_DOCTOR = "ACTION_ADMIN_EDIT_DOCTOR";
    //管理员删除医务人员
    public static final String ACTION_ADMIN_DEL_DOCTOR = "ACTION_ADMIN_DEL_DOCTOR";
    //管理员获取工作人员列表
    public static final String ACTION_ADMIN_GET_STAFFS = "ACTION_ADMIN_GET_STAFFS";
    //管理员添加工作人员
    public static final String ACTION_ADMIN_ADD_STAFF = "ACTION_ADMIN_ADD_STAFF";
    //管理员编辑工作人员
    public static final String ACTION_ADMIN_EDIT_STAFF = "ACTION_ADMIN_EDIT_STAFF";
    //管理员删除工作人员
    public static final String ACTION_ADMIN_DEL_STAFF = "ACTION_ADMIN_DEL_STAFF";
    //超级管理员获取管理员列表
    public static final String ACTION_ADMIN_GET_ADMIN = "ACTION_ADMIN_GET_ADMIN";
    //超级管理员添加管理员
    public static final String ACTION_ADMIN_ADD_ADMIN = "ACTION_ADMIN_ADD_ADMIN";
    //超级管理员编辑管理员
    public static final String ACTION_ADMIN_EDIT_ADMIN = "ACTION_ADMIN_EDIT_ADMIN";
    //超级管理员删除管理员
    public static final String ACTION_ADMIN_DEL_ADMIN = "ACTION_ADMIN_DEL_ADMIN";
    //获取全部药品
    public static final String ACTION_ADMIN_GET_DRUG = "ACTION_ADMIN_GET_DRUG";
    //添加药品
    public static final String ACTION_ADMIN_ADD_DRUG = "ACTION_ADMIN_ADD_DRUG";
    //编辑药品
    public static final String ACTION_ADMIN_EDIT_DRUG = "ACTION_ADMIN_EDIT_DRUG";
    //删除药品
    public static final String ACTION_ADMIN_DEL_DRUG = "ACTION_ADMIN_DEL_DRUG";
    //获取全部项目
    public static final String ACTION_ADMIN_GET_PROJECT = "ACTION_ADMIN_GET_PROJECT";
    //添加项目
    public static final String ACTION_ADMIN_ADD_PROJECT = "ACTION_ADMIN_ADD_PROJECT";
    //编辑项目
    public static final String ACTION_ADMIN_EDIT_PROJECT = "ACTION_ADMIN_EDIT_PROJECT";
    //删除项目
    public static final String ACTION_ADMIN_DEL_PROJECT = "ACTION_ADMIN_DEL_PROJECT";

    //工作人员登录
    public static final String ACTION_STAFF_LOGIN = "ACTION_STAFF_LOGIN";
    //工作人员获取患者列表
    public static final String ACTION_STAFF_GET_PATIENTS = "ACTION_STAFF_GET_PATIENTS";
    //工作人员添加患者
    public static final String ACTION_STAFF_ADD_PATIENT = "ACTION_STAFF_ADD_PATIENT";
    //工作人员编辑患者
    public static final String ACTION_STAFF_EDIT_PATIENT = "ACTION_STAFF_EDIT_PATIENT";
    //工作人员删除患者
    public static final String ACTION_STAFF_DEL_PATIENT = "ACTION_STAFF_DEL_PATIENT";
    //工作人员患者余额充值
    public static final String ACTION_STAFF_TOP_UP_PATIENT = "ACTION_STAFF_TOP_UP_PATIENT";
    //工作人员获取订单
    public static final String ACTION_STAFF_GET_CASE = "ACTION_STAFF_GET_CASE";
    //工作人员结算
    public static final String ACTION_STAFF_CLOSE = "ACTION_STAFF_CLOSE";

    //医务人员登录
    public static final String ACTION_DOCTOR_LOGIN = "ACTION_DOCTOR_LOGIN";
    //医务人员获取病历
    public static final String ACTION_DOCTOR_GET_CASE = "ACTION_DOCTOR_GET_CASE";
    //医务人员获取全部患者信息
    public static final String ACTION_DOCTOR_GET_PATIENTS = "ACTION_DOCTOR_GET_PATIENTS";
    //医务人员创建病历
    public static final String ACTION_DOCTOR_ADD_CASE = "ACTION_DOCTOR_ADD_CASE";
    //医务人员编辑病历
    public static final String ACTION_DOCTOR_EDIT_CASE = "ACTION_DOCTOR_EDIT_CASE";
    //医务人员删除病历
    public static final String ACTION_DOCTOR_DEL_CASE = "ACTION_DOCTOR_DEL_CASE";
    //获取历史病历
    public static final String ACTION_DOCTOR_GET_HIS_CASE = "ACTION_DOCTOR_GET_HIS_CASE";

    //患者登录
    public static final String ACTION_PATIENT_LOGIN = "ACTION_PATIENT_LOGIN";
    //获取病历
    public static final String ACTION_PATIENT_GET_HIS_CASE = "ACTION_PATIENT_GET_HIS_CASE";
    //结算操作
    public static final String ACTION_PATIENT_CLOSE = "ACTION_PATIENT_CLOSE";
    //获取钱包
    public static final String ACTION_PATIENT_GET_PAY = "ACTION_PATIENT_GET_PAY";
}
