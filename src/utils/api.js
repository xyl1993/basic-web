import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import { apiConfig } from '../global/api.config';
import { getToken } from '../utils/auth';

import { hopApiType } from '@/global/base.config';


const timeout = 30000;
const allowUrls = new RegExp(apiConfig.allowUrls); //'g'
const noJsonTypeUrls = new RegExp(apiConfig.noJsonTypeUrls); //'g'
function createAuthorizationHeader(url) {
  if (!allowUrls.test(url)) {
    let token = getToken();
    if (noJsonTypeUrls.test(url)) {
      return {
        "token": token
      }
    } else {
      return {
        "token": token,
        "Content-Type": "application/json;charset=UTF-8"
      }
    }
  }
  if (noJsonTypeUrls.test(url)) {
    return {}
  } else {
    return {
      "Content-Type": "application/json;charset=UTF-8"
    }
  }
}

//请求时的拦截器
axios.interceptors.request.use(config => {
  NProgress.start()
  return config
}, error => {
  return Promise.reject(error)
})

//求完成后的拦截器
axios.interceptors.response.use(response => response,
  error => {
    return Promise.resolve(error.response)
  }
)
function fileUploadHeader() {
  let token = getToken();
  return {
    "token": token,
    "Content-Type": "multipart/form-data"
  }
}
function checkStatus(response) {
  NProgress.done()
  return {
    data: {
      status: response.status,
      data: response.data,
    }
  }
}

function getActionApi(type){
  const { base_api_host,login_api_host } = apiConfig;
  if(hopApiType === type){
    return login_api_host;
  }else{
    return base_api_host;
  }
}

export default {
  post(url, data,action) {
    return axios({
      method: 'post',
      url: getActionApi(action) + url,
      data: JSON.stringify(data),
      timeout: timeout,
      headers: createAuthorizationHeader(url)
    }).then(checkStatus).catch(function (error) {
      return error
    });
  },
  get(url, data,action) {
    return axios({
      method: 'get',
      url: getActionApi(action) + url,
      params: data,
      timeout: timeout,
      headers: createAuthorizationHeader(url)
    }).then(checkStatus).catch(function (error) {
      console.log(error);
      return error
    });
  },
  delete(url, data,action) {
    return axios({
      method: 'delete',
      url: getActionApi(action) + url,
      params: data,
      timeout: timeout,
      headers: createAuthorizationHeader(url)
    }).then(checkStatus).catch(function (error) {
      console.log(error);
      return error
    });
  },
  put(url, data,action) {
    return axios({
      method: 'put',
      url: getActionApi(action) + url,
      data: JSON.stringify(data),
      timeout: timeout,
      headers: createAuthorizationHeader(url)
    }).then(checkStatus).catch(function (error) {
      console.log(error);
      return error
    });
  },
  formPost(url, data,action) {
    return axios({
      method: 'post',
      url: getActionApi(action) + url,
      data: qs.stringify(data),
      timeout: timeout,
      headers: createAuthorizationHeader(url)
    }).then(checkStatus)
  },
  fileUpload(url,data,action){
    return axios({
      method: 'post',
      url: getActionApi(action) + url,
      data: data,
      timeout: timeout,
      headers: fileUploadHeader(url)
    }).then(checkStatus)
  }

}