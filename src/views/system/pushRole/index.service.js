import api from '@/utils/api';
const baseUri = '/pushRole';

//获取列表
export const getList = (data) => {
    return api.get(`${baseUri}/list`, data).then(res => res.data);
};

//获取已设置推送目标列表
export const getPushConfigList = (data) => {
    return api.get('/push/config/list', data).then(res => res.data);
};

//批量插入
export const insert = (data) => {
    return api.post(`${baseUri}/insert`, data).then(res => res.data);
};

//批量插入推送目标
export const insertPushConfig = (data) => {
    return api.post('/push/config/update', data).then(res => res.data);
};

//插入健康证推送目标配置
export const insertHealthPushConfig = (data) => {
    return api.post('/push/config/update/healthPush', data).then(res => res.data);
};


//批量插入浇头盘点异常推送目标
export const insertToppingPushConfig = (data) => {
    return api.post('/push/config/update/topping', data).then(res => res.data);
};
