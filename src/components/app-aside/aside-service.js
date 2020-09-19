import api from '@/utils/api';
import { sysUserAction } from '@/global/api.action';
import { hopApiType } from '@/global/base.config';


export const getMenu = (data) => { return api.get(`${sysUserAction.getMenu}`,data,hopApiType).then(res => res.data); };