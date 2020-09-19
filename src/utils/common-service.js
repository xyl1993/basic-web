import api from '@/utils/api';

//批量上传文件
export const batchUpload = (data) => { return api.fileUpload('/common/batchUpload',data).then(res => res.data); };
//单个上传文件
export const upload = (data) => { return api.fileUpload('/common/upload',data).then(res => res.data); };
//批量上传文件
export const batchUploadReturnName = (data) => { return api.fileUpload('/common/batchUploadReturnName',data).then(res => res.data); };

//获取七牛云上传凭证
export const getUpToken = () => { return api.get('/common/getUpToken').then(res => res.data);};

//获取七牛云视频教学上传凭证
export const getUpTokenVideo = () =>{ return api.get('/common/getUpToken/video').then(res=>res.data);};

//获取门店分类
export const selShopType = (data={}) => { return api.get('/organization/selShopType',data).then(res => res.data); };
//获取门店岗位
export const getShopPost = (data={}) => { return api.get('/common/getShopPost',data).then(res => res.data); };
//获取推送目标集合
export const getAllPushPost = (data={}) => { return api.get('/push/config/all/postCode',data).then(res => res.data); };
