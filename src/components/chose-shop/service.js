import api from '@/utils/api';

const baseUri = '/shopRelation';

//获取部门角色树
export const getDepartRoleList = (data={}) => {
  return api.get(`${baseUri}/dutyKindShop`, data).then(res => res.data);
};


export const selShopAreaTree =  (data={}) => {
  return api.get('/organization/selShopAreaTree', data).then(res => res.data);
};


//获取有权限的门店
export const dutyKindShopNew =  (data={}) => {
  return api.get('/shopRelation/dutyKindShopNew', data).then(res => res.data);
};

//获取权限门店
export const powerShop = (data = {}) => {
  return api.get('/shopRelation/powerShop', data).then(res => res.data);
};

export const dutyStatisticsShopNew = (data = {}) => {
  return api.get('/shopRelation/dutyStatisticsShopNew', data).then(res => res.data);
};
