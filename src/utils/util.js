const uuid = require("node-uuid");
/**
 * 保留两位小数
 * @param {*} value
 */
export const moneyFormat = (item) => {
  let value = Math.round(parseFloat(item) * 100) / 100;
  let xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = value.toString() + ".00";
    return value;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + "0";
    }
    return value;
  }
};
/**
 * 生成8位唯一id
 */
export const generateShortUuid = () => {
  let r_uuid = uuid.v4().replace(new RegExp("-", "g"), "");
  // let shortBuffer = "";
  // let chars = ["a", "b", "c", "d", "e", "f",
  //   "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
  //   "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5",
  //   "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I",
  //   "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
  //   "W", "X", "Y", "Z"];
  // for (let i = 0; i < 8; i++) {
  //   let str = r_uuid.substring(i * 4, i * 4 + 4);
  //   let x = parseInt(str, 16);
  //   shortBuffer = shortBuffer + chars[x % 0x3E];
  // }
  // return shortBuffer

  return r_uuid + new Date().getTime();
};

import { validatenull } from "./validate";
/**
 * 设置灰度模式
 */
export const toggleGrayMode = (status) => {
  if (status) {
    document.body.className = document.body.className + " grayMode";
  } else {
    document.body.className = document.body.className.replace(" grayMode", "");
  }
};
/**
 * 设置主题
 */
export const setTheme = (name) => {
  document.body.className = name;
};

/**
 * 加密处理
 */
export const encryption = (params) => {
  let { data, type, param, key } = params;
  let result = JSON.parse(JSON.stringify(data));
  if (type == "Base64") {
    param.forEach((ele) => {
      result[ele] = btoa(result[ele]);
    });
  } else if (type == "Aes") {
    param.forEach((ele) => {
      result[ele] = window.CryptoJS.AES.encrypt(result[ele], key).toString();
    });
  }
  return result;
};

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen();
  } else {
    reqFullScreen();
  }
};
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback();
  }
  document.addEventListener("fullscreenchange", function() {
    listen();
  });
  document.addEventListener("mozfullscreenchange", function() {
    listen();
  });
  document.addEventListener("webkitfullscreenchange", function() {
    listen();
  });
  document.addEventListener("msfullscreenchange", function() {
    listen();
  });
};
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  var isFullscreen =
    document.fullscreenEnabled ||
    window.fullScreen ||
    document.mozFullscreenEnabled ||
    document.webkitIsFullScreen;
  return isFullscreen;
};

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
};
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen();
  }
};
/**
 * 递归寻找子类的父类
 */

export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length != 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id == id) {
          return menu[i];
        } else {
          if (menu[i].children[j].children.length != 0) {
            return findParent(menu[i].children[j].children, id);
          }
        }
      }
    }
  }
};
/**
 * 判断2个对象属性和值是否相等
 */

/**
 * 动态插入css
 */

export const loadStyle = (url) => {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  const head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
};
/**
 * 判断路由是否相等
 */
export const isObjectValueEqual = (a, b) => {
  let result = true;
  Object.keys(a).forEach((ele) => {
    const type = typeof a[ele];
    if (type === "string" && a[ele] !== b[ele]) result = false;
    else if (
      type === "object" &&
      JSON.stringify(a[ele]) !== JSON.stringify(b[ele])
    )
      result = false;
  });
  return result;
};
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
  let result = "";
  if (validatenull(dic)) return value;
  if (
    typeof value == "string" ||
    typeof value == "number" ||
    typeof value == "boolean"
  ) {
    let index = 0;
    index = findArray(dic, value);
    if (index != -1) {
      result = dic[index].label;
    } else {
      result = value;
    }
  } else if (value instanceof Array) {
    result = [];
    let index = 0;
    value.forEach((ele) => {
      index = findArray(dic, ele);
      if (index != -1) {
        result.push(dic[index].label);
      } else {
        result.push(value);
      }
    });
    result = result.toString();
  }
  return result;
};
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value == value) {
      return i;
    }
  }
  return -1;
};
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = "";
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len ? len : 4);
  if (date) random = random + Date.now();
  return random;
};
/**
 * 打开小窗口
 */
export const openWindow = (url, title, w, h) => {
  // Fixes dual-screen position                            Most browsers       Firefox
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : screen.left;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : screen.top;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;

  const left = width / 2 - w / 2 + dualScreenLeft;
  const top = height / 2 - h / 2 + dualScreenTop;
  const newWindow = window.open(
    url,
    title,
    "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=" +
      w +
      ", height=" +
      h +
      ", top=" +
      top +
      ", left=" +
      left
  );

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus();
  }
};

/**
 * 全屏打开窗口
 */
export const openWindowFull = (url, title) => {
  // Fixes dual-screen position                            Most browsers       Firefox

  const w = window.screen.availWidth - 10;
  const h = window.screen.availHeight - 30;

  const left = 0;
  const top = 0;

  const newWindow = window.open(
    url,
    title,
    "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=" +
      w +
      ", height=" +
      h +
      ", top=" +
      top +
      ", left=" +
      left
  );

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus();
  }
};

/**
 * 获取浏览器引擎
 */
export const client = () => {
  //呈现引擎
  var engine = {
    ie: 0,
    gecko: 0,
    webkit: 0,
    khtml: 0,
    opera: 0,
    //完整版本号
    ver: null,
  };

  //浏览器
  var browser = {
    //主要浏览器
    ie: 0,
    firefox: 0,
    safari: 0,
    konq: 0,
    opera: 0,
    chrome: 0,

    //具体的版本号
    cer: null,
  };

  //平台、设备和操作系统
  var system = {
    win: false,
    mac: false,
    xll: false,

    //移动设备
    iphone: false,
    ipod: false,
    ipad: false,
    ios: false,
    android: false,
    nokiaN: false,
    winMobile: false,

    //游戏系统
    wii: false,
    ps: false,
  };

  //检测呈现引擎和浏览器
  var ua = navigator.userAgent;
  if (window.opera) {
    engine.ver = browser.ver = window.opera.version();
    engine.opera = browser.opera = parseFloat(engine.ver);
  } else if (/AppleWebKit\/(\S+)/.test(ua)) {
    engine.ver = RegExp["$1"];
    engine.webkit = parseFloat(engine.ver);

    //确定是Chrome还是Safair
    if (/Chrome\/(\S+)/.test(ua)) {
      browser.ver = RegExp["$1"];
      browser.chrome = parseFloat(browser.ver);
    } else if (/Version\/(\S+)/.test(ua)) {
      browser.ver = RegExp["$1"];
      browser.safari = parseFloat(browser.ver);
    } else {
      //近似的确定版本号
      var safariVersion = 1;
      if (engine.webkit < 100) {
        safariVersion = 1;
      } else if (engine.webkit < 312) {
        safariVersion = 1.2;
      } else if (engine.webkit < 412) {
        safariVersion = 1.3;
      } else {
        safariVersion = 2;
      }

      browser.safari = browser.ver = safariVersion;
    }
  } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
    engine.ver = browser.ver = RegExp["$1"];
    engine.khtml = browser.konq = parseFloat(engine.ver);
  } else if (/rv:([^\\)]+)\) Gecko\/\d{8}/.test(ua)) {
    engine.ver = RegExp["$1"];
    engine.gecko = parseFloat(engine.ver);

    //确定是不是Firefox
    if (/Firefox\/(\S+)/.test(ua)) {
      browser.ver = RegExp["$1"];
      browser.firefox = parseFloat(browser.ver);
    }
  } else if (/MSTE ([^;]+)/.test(ua)) {
    engine.ver = browser.ver = RegExp["$1"];
    engine.ie = browser.ie = parseFloat(engine.ver);
  }

  //检测浏览器
  browser.ie = engine.ie;
  browser.opera = engine.opera;

  //检测平台
  var p = navigator.platform;
  system.win = p.indexOf("Win") == 0;
  system.mac = p.indexOf("Mac") == 0;
  system.xll = p == "Xll" || p.indexOf("Linux") == 0;

  //检测Windows操作系统
  if (system.win) {
    if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
      if (RegExp["$1"] == "NT") {
        switch (RegExp["$2"]) {
          case "5.0":
            system.win = "2000";
            break;
          case "5.1":
            system.win = "XP";
            break;
          case "6.0":
            system.win = "Vista";
            break;
          case "6.1":
            system.win = "7";
            break;
          default:
            system.win = "NT";
            break;
        }
      } else if (RegExp["$1"] == "9px") {
        system.win = "ME";
      } else {
        system.win = RegExp["$1"];
      }
    }
  }

  //移动设备
  system.iphone = ua.indexOf("iPhone") > -1;
  system.ipod = ua.indexOf("iPod") > -1;
  system.ipad = ua.indexOf("iPad") > -1;
  system.nakiaN = ua.indexOf("NakiaN") > -1;

  //windows mobile
  if (system.win == "CE") {
    system.winMobile = system.win;
  } else if (system.win == "Ph") {
    if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
      system.win = "Phone";
      system.winMobile = parseFloat(RegExp["$1"]);
    }
  }

  //检测ios版本
  if (system.mac && ua.indexOf("Mobile") > -1) {
    if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
      system.ios = parseFloat(RegExp.$1.replace("_", "."));
    } else {
      system.ios = 2; //不能真正检测出来，所以只能猜测
    }
  }

  //检测Android版本
  if (/Android (\d+\.\d+)/.test(ua)) {
    system.android = parseFloat(RegExp.$1);
  }

  //游戏系统
  system.wii = ua.indexOf("Wii") > -1;
  system.ps = /playstation/i.test(ua);

  //返回这些对象
  return {
    engine: engine,
    browser: browser,
    system: system,
  };
};
/**
 * 字符串转日期对象
 * @param {*} datestr
 */
export const getDate = (datestr) => {
  let temp = datestr.split("-");
  let date = new Date(temp[0], temp[1] - 1, temp[2]);
  return date;
};
/**
 * 根据秒数时分秒倒计时
 * @param {*} _this
 * @param {*} seconds
 */
export const countTime = (_this, seconds) => {
  let minutesTime = 0; //分
  let hoursTime = 0; //时
  let result = "";
  if (seconds > 60) {
    minutesTime = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);
    if (minutesTime > 60) {
      hoursTime = parseInt(minutesTime / 60);
      minutesTime = parseInt(minutesTime % 60);
    }
    result = "" + parseInt(seconds) + "秒";
    if (minutesTime > 0) {
      result = "" + parseInt(minutesTime) + "分" + result;
    }
    if (hoursTime > 0) {
      result = "" + parseInt(hoursTime) + "小时" + result;
    }
  } else {
    result = "" + parseInt(seconds) + "秒";
  }
  return result;
};

/**
 * //比较函数升序
 * @param {*} x
 * @param {*} y
 */
export const compareUp = function(x, y) {
  if (x < y) {
    return -1;
  } else if (x > y) {
    return 1;
  } else {
    return 0;
  }
};
/**
 * 降序
 * @param {*} x
 * @param {*} y
 */
export const compareDown = function(x, y) {
  if (x < y) {
    return 1;
  } else if (x > y) {
    return -1;
  } else {
    return 0;
  }
};

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/*
 *   功能:实现VBScript的DateAdd功能.
 *   参数:interval,字符串表达式，表示要添加的时间间隔.
 *   参数:number,数值表达式，表示要添加的时间间隔的个数.
 *   参数:date,时间对象.
 *   返回:新的时间对象.
 *   var   now   =   new   Date();
 *   var   newDate   =   DateAdd( "d ",5,now);
 *---------------   DateAdd(interval,number,date)   -----------------
 */
export function dateAdd(interval, number, date) {
  switch (interval) {
    case "y ": {
      date.setFullYear(date.getFullYear() + number);
      return date;
    }
    case "q ": {
      date.setMonth(date.getMonth() + number * 3);
      return date;
    }
    case "m ": {
      date.setMonth(date.getMonth() + number);
      return date;
    }
    case "w ": {
      date.setDate(date.getDate() + number * 7);
      return date;
    }
    case "d ": {
      date.setDate(date.getDate() + number);
      return date;
    }
    case "h ": {
      date.setHours(date.getHours() + number);
      return date;
    }
    case "s ": {
      date.setSeconds(date.getSeconds() + number);
      return date;
    }
    default: {
      date.setDate(date.getDate() + number);
      return date;
    }
  }
}

/**
 * 树形数据转线型数据
 * @param {*} root
 */
export function treeConvertList(root) {
  const list = [];
  if (root) {
    const Root = JSON.parse(JSON.stringify(root));
    const queue = [];
    queue.push(Root);
    while (queue.length) {
      const node = queue.shift();
      if (node.children && node.children.length) {
        node.parent = true;
        queue.push(...node.children);
      }
      delete node.children;
      if (node.parentId !== null && node.parentId !== undefined) {
        list.push(node);
      }
    }
  }
  return list;
}

/**
 * 树形数据转线型数据
 * @param {*} root
 */
export function treeConvertListCopy(root) {
  const list = [];
  if (root) {
    const Root = JSON.parse(JSON.stringify(root));
    const queue = [];
    queue.push(Root);
    while (queue.length) {
      const node = queue.shift();
      if (node.children && node.children.length) {
        node.parent = true;
        queue.push(...node.children);
      }
      delete node.children;
      if (node.farId !== null && node.farId !== undefined) {
        list.push(node);
      }
    }
  }
  return list;
}

export function listToTree(list) {
  let map = {};
  list.forEach((item) => {
    if (!map[item.id]) {
      map[item.id] = item;
    }
  });

  list.forEach((item) => {
    if (item.parentId !== 0 || item.parentId !== 59995) {
      map[item.parentId].children
        ? map[item.parentId].children.push(item)
        : (map[item.parentId].children = [item]);
    }
  });

  return list.filter((item) => {
    if (item.parentId === 0 || item.parentId === 59995) {
      return item;
    }
  });
}

/**
 * 替换富文本标签内容
 * @param {*} content
 */
export function contentFilterFun(content) {
  if (content) {
    content = content
      .replace(/<.+?>/g, "")
      .replace(/ /gi, "")
      .replace(/\s/gi, "");
    var arrEntities = {
      lt: "<",
      gt: ">",
      nbsp: " ",
      amp: "&",
      quot: '"',
      ldquo: '"',
      rdquo: '"',
      mdash: "-",
    };
    content = content.replace(
      /&(lt|gt|nbsp|amp|quot|ldquo|rdquo|mdash);/gi,
      function(all, t) {
        return arrEntities[t];
      }
    );
    return content;
  } else {
    return "";
  }
}

/**
 * 将字符串转化为select下拉框认识的数组对象
 * @param {*} str
 */
export function workTreeArray(str) {
  if (str) {
    let arrayStr = str ? str.split(",") : "";
    let array = [];
    for (let i of arrayStr) {
      array.push(Number(i));
    }
    return array;
  } else {
    return [];
  }
}

/**
 * 数字转字符串
 * @param {*} num
 */
export function convertToChinaNum(num) {
  var arr1 = new Array(
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九"
  );
  var arr2 = new Array(
    "",
    "十",
    "百",
    "千",
    "万",
    "十",
    "百",
    "千",
    "亿",
    "十",
    "百",
    "千",
    "万",
    "十",
    "百",
    "千",
    "亿"
  ); //可继续追加更高位转换值
  if (!num || isNaN(num)) {
    return "零";
  }
  var english = num.toString().split("");
  var result = "";
  for (var i = 0; i < english.length; i++) {
    var des_i = english.length - 1 - i; //倒序排列设值
    result = arr2[i] + result;
    var arr1_index = english[des_i];
    result = arr1[arr1_index] + result;
  } //将【零千、零百】换成【零】 【十零】换成【十】
  result = result.replace(/零(千|百|十)/g, "零").replace(/十零/g, "十"); //合并中间多个零为一个零
  result = result.replace(/零+/g, "零"); //将【零亿】换成【亿】【零万】换成【万】
  result = result.replace(/零亿/g, "亿").replace(/零万/g, "万"); //将【亿万】换成【亿】
  result = result.replace(/亿万/g, "亿"); //移除末尾的零
  result = result.replace(/零+$/, ""); //将【零一十】换成【零十】 //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十 //将【一十】换成【十】
  result = result.replace(/^一十/g, "十");
  return result;
}
