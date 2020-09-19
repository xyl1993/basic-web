import api from '@/utils/api';

const baseUri = '/base';

//获取字段列表
export const selTemplateList = (data) => {
  return api.get(`${baseUri}/list`, data).then(res => res.data);
};
//批量删除
export const deleteBatch = (data) => {
  return api.delete(`${baseUri}/delete/${data}`).then(res => res.data);
};

//获取字段列表
export const update = (data) => {
  return api.post(`${baseUri}/update`, data).then(res => res.data);
};

export const insert = (data) => {
  return api.post(`${baseUri}/insert`, data).then(res => res.data);
};

