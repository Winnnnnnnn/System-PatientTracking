/*
Navicat MySQL Data Transfer

Source Server         : 本地连接
Source Server Version : 50620
Source Host           : localhost:3306
Source Database       : medical

Target Server Type    : MYSQL
Target Server Version : 50620
File Encoding         : 65001

Date: 2019-06-11 00:01:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员编号',
  `name` varchar(255) NOT NULL COMMENT '管理员账号',
  `pwd` varchar(255) NOT NULL COMMENT '管理员密码',
  `power` int(11) NOT NULL DEFAULT '0' COMMENT '管理员权限',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', 'YWRtaW4=', '0');

-- ----------------------------
-- Table structure for cases
-- ----------------------------
DROP TABLE IF EXISTS `cases`;
CREATE TABLE `cases` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '病历编号',
  `patient` int(11) NOT NULL COMMENT '患者编号',
  `doctor` int(11) NOT NULL COMMENT '医生编号',
  `zhusu` text COMMENT '主诉',
  `projects` text COMMENT '检查项目',
  `detail` text COMMENT '项目诊断',
  `drugs` text COMMENT '药品',
  `starttime` varchar(255) NOT NULL COMMENT '病历日期',
  `endtime` varchar(255) DEFAULT NULL,
  `pay` varchar(255) DEFAULT '0' COMMENT '项目价格',
  `state` int(11) NOT NULL DEFAULT '0' COMMENT '项目状态：未支付，已支付',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cases
-- ----------------------------

-- ----------------------------
-- Table structure for doctors
-- ----------------------------
DROP TABLE IF EXISTS `doctors`;
CREATE TABLE `doctors` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '医务人员编号',
  `name` varchar(255) NOT NULL COMMENT '医务人员姓名',
  `phone` varchar(255) NOT NULL COMMENT '医务人员手机号',
  `pwd` varchar(255) NOT NULL COMMENT '医务人员密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of doctors
-- ----------------------------

-- ----------------------------
-- Table structure for drugs
-- ----------------------------
DROP TABLE IF EXISTS `drugs`;
CREATE TABLE `drugs` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '药品id',
  `title` varchar(255) NOT NULL COMMENT '药品价格',
  `price` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of drugs
-- ----------------------------

-- ----------------------------
-- Table structure for patients
-- ----------------------------
DROP TABLE IF EXISTS `patients`;
CREATE TABLE `patients` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '患者编号',
  `name` varchar(255) NOT NULL COMMENT '患者姓名',
  `idcard` varchar(255) NOT NULL COMMENT '身份证号',
  `sex` varchar(255) NOT NULL COMMENT '患者性别',
  `date` varchar(255) NOT NULL COMMENT '患者出生日期',
  `age` int(11) NOT NULL COMMENT '患者年龄',
  `phone` varchar(255) NOT NULL COMMENT '手机号',
  `other` text COMMENT '其他消息',
  `balance` double NOT NULL DEFAULT '0' COMMENT '钱包余额',
  `pwd` varchar(255) NOT NULL COMMENT '患者密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of patients
-- ----------------------------

-- ----------------------------
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '项目Id',
  `title` varchar(255) NOT NULL COMMENT '项目标题',
  `price` varchar(255) NOT NULL COMMENT '项目价格',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of projects
-- ----------------------------

-- ----------------------------
-- Table structure for staffs
-- ----------------------------
DROP TABLE IF EXISTS `staffs`;
CREATE TABLE `staffs` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '工作人员编号',
  `name` varchar(255) NOT NULL COMMENT '工作人员名称',
  `phone` varchar(255) NOT NULL COMMENT '工作人员手机号',
  `pwd` varchar(255) NOT NULL COMMENT '工作人员密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of staffs
-- ----------------------------
