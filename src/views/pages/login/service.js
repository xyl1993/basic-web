import api from '@/utils/api.js';
import { sysUserAction } from '@/global/api.action';
import { hopApiType } from '@/global/base.config';

export const webLoigin = (data) => { return api.post(`${sysUserAction.login}`,data,hopApiType).then(res => res.data); };

export const getWebLink = (data) => { return api.get('/office/sysRole/getWebLink',data,hopApiType).then(res => res.data); };