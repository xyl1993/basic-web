const origin = document.location.origin;
let fileDomain = "";
let base_api_host = "";
let login_api_host = "";
let openLink = "";
let websocketUrl = "";
let appLink = "";
let QN_URL = "http://operation.jshflm.cn/";
let QN_URL_VIDEO = "http://video.jshflm.cn/";

if (process.env.NODE_ENV === "development") {
  fileDomain = "http://localhost:8002/hfoffice/upload";
  openLink = `${origin}/#/`;
  base_api_host = "/api";
  login_api_host = "/hopApi";
  appLink = "http://192.168.1.140:4003/#/login?";
  websocketUrl = "ws://localhost:8080/websocket";
} else if (process.env.NODE_ENV === "slave") {
  const host = "http://101.132.146.9";
  base_api_host = `${host}/trainSystemApi`;
  login_api_host = `${host}/hopApi`;
  fileDomain = `${host}/file`;
  openLink = `${host}/operationSystem/#/`;
  websocketUrl = `${host}/hopApi/websocket`;
  appLink = `${host}/appSystem/#/login?`;
} else {
  const host = "http://hop.js-hflm.com";
  base_api_host = `${host}/trainSystemApi`;
  login_api_host = `${host}/hopApi`;
  fileDomain = `${host}/file`;
  openLink = `${host}/operationSystem/#/`;
  websocketUrl = `${host}/hopApi/websocket`;
  appLink = `${host}/appSystem/#/login?`;
}

export const apiConfig = {
  fileDomain,
  base_api_host,
  openLink,
  appLink,
  websocketUrl,
  login_api_host,
  QN_URL,
  QN_URL_VIDEO,
  allowUrls: "login", //不需要添加token请求的接口
  noJsonTypeUrls:
    "/selDomitoryScoreList|/getSealRecord|/getDisciplinary|/getShopBiddingList|/getCostRemarkList" +
    "|/getDisciplinaryReport|/getEventList|/getApplyCarDetail|analysis" +
    "|/selMeetingReport", //不需要json传参的接口
};
