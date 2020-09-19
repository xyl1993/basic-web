import api from '@/utils/api';
import { hopApiType } from '@/global/base.config';


export const menuBtnList = (data) => { return api.get('/office/sysMenu/menuBtnList',data,hopApiType).then(res => res.data); };
export const saveMenuBtn = (data) => { return api.post('/office/sysMenu/saveMenuBtn',data,hopApiType).then(res => res.data); };
export const delMenuBtn = (data) => { return api.delete(`/office/sysMenu/delMenuBtn/${data}`,{},hopApiType).then(res => res.data); };
