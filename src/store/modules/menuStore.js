import { getMenu } from '@/components/app-aside/aside-service';
import { statusValid } from '@/utils/status-valid';
import { subordinate } from '@/global/base.config';

//基础状态
const state = {
  powerBtnGroup: '',
  menuList:[]
};
// 定义所需的 mutations
const mutations = {
  editPowerBtn(state, payload) {
    state.powerBtnGroup = payload?payload:'';
  },
  setMenuList(state, payload) {
    state.menuList = payload;
  }
};

const actions = {
  getMenu({ commit }) {
    return new Promise(resolve=>{
      getMenu({subordinate}).then(res => {
        const { data, status } = res;
        if (statusValid(this, status, data)) {
          commit('setMenuList',data.data);
          resolve(data.data);
        }
      });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
