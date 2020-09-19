import api from '@/utils/api';
const baseUri = '/mina';

export const selTemplateList = (data) => {
  return api.get(`${baseUri}/buttonShowList`,data).then(res => res.data);
};

export const insert = (data) => {
  return api.post(`${baseUri}/insertButton`, data).then(res => res.data);
};

export const update = (data) => {
  return api.post(`${baseUri}/updateButton`, data).then(res => res.data);
};

//删除模板
export const deleteInfo = (data) =>{
  return api.post(`${baseUri}/deleteButton/${data}`).then(res => res.data);
};
