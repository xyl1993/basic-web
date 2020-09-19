import api from '@/utils/api';
import { sysMenuAction } from '@/global/api.action';
import { hopApiType } from '@/global/base.config';

export const getList = (data) => { return api.get(`${sysMenuAction.list}`,data,hopApiType).then(res => res.data); };
