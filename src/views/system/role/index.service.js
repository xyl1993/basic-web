import api from '@/utils/api';
import { hopApiType } from '@/global/base.config';

//获取所有角色
export const allList = (data) => { return api.get('/office/sysRole/allList', data,hopApiType).then(res => res.data); };
//新增角色
export const createRole = (data) => { return api.post('/office/sysRole/create', data,hopApiType).then(res => res.data); };
//删除角色
export const deleteRole = (data) => { return api.delete(`/office/sysRole/delete/${data}`,'',hopApiType).then(res => res.data); };
//更新角色
export const updateRole = (data) => { return api.put('/office/sysRole/update', data,hopApiType).then(res => res.data); };
//更新菜单权限
export const updateRoleMenu = (data) => { return api.put('/office/sysRole/updateRoleMenu', data,hopApiType).then(res => res.data); };
//根据角色获取对应的用户
export const listUserByRoleId = (data) => { return api.get('/office/sysUser/listUserByRoleId',data,hopApiType).then(res => res.data); };
//给用户分配角色
export const createUserRole = (data) => { return api.post('/office/sysRole/createUserRole',data,hopApiType).then(res => res.data); };
//删除用户的角色
export const deleteUserRole = (data) => { return api.delete('/office/sysRole/deleteUserRole', data,hopApiType).then(res => res.data); };
//获取角色详情
export const getRole = (data) => { return api.get('/office/sysRole/getRole',data,hopApiType).then(res => res.data); };
//获取所有系统
export const getPlatFormList = (data) => { return api.get('/office/platform/list',data,hopApiType).then(res => res.data); };
//获取app菜单
export const getAppMenuList = (data) => { return api.get('/office/appMenu/list',data,hopApiType).then(res => res.data); };

export const selWebPromiseRoleId = (roleId,data) => { return api.get(`/office/sysMenu/selWebPromiseRoleId/roleId/${roleId}`,data,hopApiType).then(res => res.data); };