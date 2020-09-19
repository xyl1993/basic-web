import api from '@/utils/api';
import { systemAction } from '@/global/api.action';
import { hopApiType } from '@/global/base.config';

//获取系统用户列表
export const selStaffByDepartIdNoStaffId = (data) => { return api.get(`${systemAction.selStaffByDepartIdNoStaffId}`,data,hopApiType).then(res => res.data); };


//登录人员管辖门店
export const shopList = (data) => {
  return api.get(`/billboard/shopList`, data).then(res => res.data);
};