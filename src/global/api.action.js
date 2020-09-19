
export const sysUserAction = {  //系统用户相关接口
  login:'/office/sysUser/login',  //系统登录
  getList: '/office/sysUser/getUserByCompanyId', //获取单位下的用户列表
  getMenu: '/office/sysUser/getMenu', //获取用户权限下的菜单
  updatePassword: '/office/sysUser/updatePassword',  //修改密码
  listUserByRoleId: '/office/sysUser/listUserByRoleId',
};


export const sysMenuAction = { //系统菜单相关接口
  create: '/office/sysMenu/create', //创建菜单
  list: '/office/sysMenu/list',  //菜单列表
  delete: '/office/sysMenu/delete', //删除菜单
  update: '/office/sysMenu/update', //更新菜单
};

export const systemAction = {
  selAllDept:'/office/organization/selAllDept',    //获取所有部门信息
  selAllStaff:'/office/organization/selAllStaff',    //获取所有人员信息
  selStaffByDepartIdNoStaffId: '/office/organization/selStaffByDepartIdNoStaffId',
  selStoreStaff: '/office/organization/app/selStoreStaff'
};


/**
 * 模版接口
 */
export const templateAction = {
  insertTemplate: '/template/insertTemplate',
  updateTemplate: '/template/updateTemplate',
  deleteTemplate: '/template/deleteTemplate',
  selTemplateDetail: '/template/selTemplateDetail',
  selWebTemplateList: '/template/selWebTemplateList',
  selTypeCount:  '/template/selTypeCount'
};

/**
 * 考试相关
 */
export const examinationAction = {
  createTask: '/examination/createTask',
  selTaskList: '/examination/selTaskList',
  selTaskStaffRecordDetail: '/examination/selTaskStaffRecordDetail',
  selTaskRecordDetail: '/examination/selTaskRecordDetail',
  selTaskStaffReportDetail: '/examination/selTaskStaffReportDetail',
  endReadRecord: '/examination/endReadRecord',
  deleteExaminationTask: '/examination/deleteExaminationTask',
};

export const questionsAction={
  selQuestionsList: '/questions/selList',
};