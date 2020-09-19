import { getUpToken, getUpTokenVideo } from './common-service';
import * as qiniu from 'qiniu-js';
import { statusValid } from '@/utils/status-valid';
const moment = require('moment');
const uuid = require('node-uuid');

/**
 * qiniu.region.z0: 代表华东区域
  qiniu.region.z1: 代表华北区域
  qiniu.region.z2: 代表华南区域
 */
const config = {
  useCdnDomain: false,
  region: qiniu.region.z0
};
const putExtra = {
  fname: '',
  params: {},
  mimeType: null
};

/**
 * 判断文件类型
 * @param {*} name
 */
function getFileType(name) {
  if (!name) return false;
  var imgType = ['gif', 'jpeg', 'jpg', 'bmp', 'png'];
  var videoType = [
    'avi',
    'wmv',
    'mkv',
    'mp4',
    'mov',
    'rm',
    '3gp',
    'flv',
    'mpg',
    'rmvb'
  ];
  if (RegExp('.(' + imgType.join('|') + ')$', 'i').test(name.toLowerCase())) {
    return 'image';
  } else if (
    RegExp('.(' + videoType.join('|') + ')$', 'i').test(name.toLowerCase())
  ) {
    return 'video';
  } else {
    return false;
  }
}
/**
 * 生成8位不一样的uid
 */
function generateShortUuid() {
  let r_uuid = uuid.v4().replace(new RegExp('-', 'g'), '');
  let shortBuffer = '';
  let chars = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ];
  for (let i = 0; i < 8; i++) {
    let str = r_uuid.substring(i * 4, i * 4 + 4);
    let x = parseInt(str, 16);
    shortBuffer = shortBuffer + chars[x % 0x3e];
  }
  return shortBuffer;
}

const uploadCallback = (_this, file, compress, res, resolve) => {
  let { data, status } = res;
  if (statusValid(_this, status, data)) {
    var observer = {
      next(res) {},
      error(err) {
        resolve({ code: 0, data: err });
      },
      complete(res) {
        const { key } = res;
        resolve({ code: 200, data: key });
      }
    };
    const prexArray = file.name.split('.');
    const prex = prexArray[prexArray.length - 1];
    const fileName = prexArray[0];
    let key =
      moment(new Date()).format('YYYY-MM-DD') +
      '_' +
      generateShortUuid() +
      '.' +
      prex;

    //上传前压缩
    let options = {
      quality: 1,
      noCompressIfLarger: true,
      maxWidth: 1600
    };
    const { name } = file;
    const fileType = getFileType(name);
    if (compress && fileType == 'image') {
      qiniu.compressImage(file, options).then(res => {
        let observable = qiniu.upload(
          res.dist,
          key,
          data.data,
          putExtra,
          config
        );
        observable.subscribe(observer);
      });
    } else {
      let observable = qiniu.upload(file, key, data.data, putExtra, config);
      observable.subscribe(observer);
    }
  }
};

//上传到七牛云
//返回promise对象
/**
 *
 * @param {this} _this
 * @param {} file
 * @param {是否开启压缩} compress
 */
export const upLoadQiNiu = (_this, file, compress) => {
  return new Promise(resolve => {
    if (file) {
      getUpToken().then(res => {
        uploadCallback(_this, file, compress, res, resolve);
      });
    }
  });
};

//上传到七牛云
//返回promise对象
/**
 *
 * @param {this} _this
 * @param {} file
 * @param {是否开启压缩} compress
 */
export const upLoadQiNiuVideo = (_this, file, compress) => {
  return new Promise(resolve => {
    if (file) {
      getUpTokenVideo().then(res => {
        uploadCallback(_this, file, compress, res, resolve);
      });
    }
  });
};
