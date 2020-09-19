import api from '@/utils/api';
import { systemAction } from '@/global/api.action';
//获取所有部门
export const selAllDept = (data) => { return api.get('/organization/selAllDept',data).then(res => res.data); };
//获取所有职员
export const selAllStaff = (data) => { return api.get('/organization/selAllStaff',data).then(res => res.data); };