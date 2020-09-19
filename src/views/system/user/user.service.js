import api from '@/utils/api';
import { sysUserAction } from '@/global/api.action';
import { hopApiType } from '@/global/base.config';


//获取系统用户列表
export const getSystemUserList = (data) => { return api.get(`${sysUserAction.getUserList}`,data,hopApiType).then(res => res.data); };

export const createUser = (data) => { return api.post(`${sysUserAction.createUser}`,data,hopApiType).then(res => res.data); };

export const updateUser = (data) => { return api.put(`${sysUserAction.updateUser}`,data,hopApiType).then(res => res.data); };

export const deleteUser = (data) => { return api.delete(`${sysUserAction.deleteUser}/${data}`,'',hopApiType).then(res => res.data); };

export const updatePassword = (data) => { return api.put(`${sysUserAction.updatePassword}`, data,hopApiType).then(res => res.data); };

export const insertSysUserAccount = (data) => { return api.post(`${sysUserAction.insertSysUserAccount}`, data,hopApiType).then(res => res.data); };

export const selRoleList = (data) =>{ return api.get('/office/sysRole/allList', data,hopApiType).then(res => res.data); };