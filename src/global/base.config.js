export const dateFormat = 'YYYY-MM-DD'; //日期格式化
export const timeFormat = 'YYYY-MM-DD HH:mm:ss'; //24小时日期格式化

export const subordinate = 'trainSystem';
import { treeConvertList } from '@/utils/util';

//api接口
export const hopApiType = 'hopApi';
export const operationApiType = 'operationApi';


export const tinymceConfig = {
  language_url: 'http://img.jshflm.cn/tinymce_zh_CN.js'
};
/**
 * 模版类型
 */
export const templateTypeGroup = [
  '语音输入',
  '勾选',
  '文本',
  '链接',
  '拍照',
  '语音带出',
  '图文识别'
];

export const errPushRoleGroup = ['小区总', '维保中心', '战略信息中心'];

//缩略图
export const coverImgQuality = '?imageView2/0/w/400';
//大图尺寸
export const boxImgQuality = '?imageView2/0/w/800';

//初始化table高度
export const initTableHeight = _this => {
  setTimeout(() => {
    const divHeight = document.getElementById('elTable').offsetHeight;
    const searchDetailBoxEle = document.getElementById('searchDetailBox');
    const pagSplierElm = document.getElementById('pageInfo');
    const searchDetailBox = searchDetailBoxEle
      ? searchDetailBoxEle.offsetHeight
      : 0;
    // const pagSplier = pagSplierElm?pagSplierElm.offsetHeight:0;
    // console.log(pagSplier);
    _this.tableHeight = divHeight - searchDetailBox - 31;
  }, 200);
};

export const roleConstantsValue = {
  SUPER_ADMIN: 'A1',
  SMALL_AREA_LEADER: 'OP1',
  WBZX: 'OP2',
  ZLXXZX: 'OP3'
};

export const minaLinkArray = ['试吃', '滤油|换油','门店工时'];

/**
 * 巡查广告位状态值
 */
export const patrolBillboardType = {
  PATROLD_SAVE_TYPE: 0,
  PATROLD_INIT_TYPE: 1,
  PATROL_EXAMINE_TYPE: 2,
  PATROL_REGION_TYPE: 3,
  PATROL_CHIEF_ERR_TYPE: 4,
  PATROL_CHIEF_TYPE: 5,
  PATROL_EXAMINE_CLOSE_TYPE: 6
};

/*******角色相关*******/
export const roleConstantsArray = [
  {
    name: '超级管理员',
    value: roleConstantsValue.SUPER_ADMIN
  },
  {
    name: '小区总',
    value: roleConstantsValue.SMALL_AREA_LEADER
  },
  {
    name: '维保中心',
    value: roleConstantsValue.WBZX
  },
  {
    name: '战略信息中心',
    value: roleConstantsValue.ZLXXZX
  }
];

export const departRoleConstants = [
  {
    label: '安全部',
    value: 'security'
  },
  {
    label: '品牌策划中心-总监',
    value: 'brandChief'
  },
  {
    label: '品牌市场推广部',
    value: 'brand'
  },
  {
    label: '维保中心',
    value: 'maintenance'
  },
  {
    label: '战略信息中心',
    value: 'strategy'
  },
  {
    label: '督培部',
    value: 'supervisor'
  },
  {
    label: '政委',
    value: 'commissar'
  },
  {
    label: '业委',
    value: 'industryCommittee'
  },
  {
    label: '营运巡查室',
    value: 'operationInspection'
  },
  {
    label: '物流中心',
    value: 'logistics'
  }
];

/**
 * 前端营运关键角色
 */
export const shoperPostCodeList = [{
  postName:'小区总',
  postCode:'2019001'
},{
  postName:'大区总',
  postCode:'2019015'
},{
  postName:'政委',
  postCode:'commissar'
},{
  postName:'业委',
  postCode:'industryCommittee'
},{
  postName:'店长',
  postCode:'2019002'
},{
  postName:'代理店长',
  postCode:'2019003'
},{
  postName:'资深店长',
  postCode:'2019019'
},{
  postName:'店助',
  postCode:'2019009'
},{
  postName:'主管',
  postCode:'2019010'
}];


/**
 * 初始化按钮权限
 * @param {*} _this
 */
export const initBtnPower = (_this, currentPath) => {
  const root = null || {
    id: 0,
    parentId: null,
    children: [..._this.$store.state.menuStore.menuList]
  };
  let webLine = treeConvertList(root);
  for (let item of webLine) {
    const { path, powerBtnGroup } = item;
    if (currentPath === path) {
      _this.$store.commit('editPowerBtn', powerBtnGroup);
      return;
    }
  }
};