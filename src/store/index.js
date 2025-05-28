import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user_id: localStorage.getItem('user_id') || '',
    islogin: localStorage.getItem('islogin') === 'true', // 从 localStorage 读取
    role: localStorage.getItem('role') || '',
  },
  getters: {
    getUserId: state => state.user_id,
    getIsLogin: state => state.islogin,
    getRole: state => state.role
  },
  mutations: {
    setUserId: (state, id) => {
      state.user_id = id;
      localStorage.setItem('user_id', id); // 存储到 localStorage
    },
    setIsLogin: (state, islogin) => {
      state.islogin = islogin;
      localStorage.setItem('islogin', islogin); // 存储到 localStorage
    },
    setRole: (state, role) => {
      state.role = role;
      localStorage.setItem('role', role); // 存储到 localStorage
    },
  },
  actions: {
    setUserId: ({ commit }, id) => {
      commit('setUserId', id);
    },
    setIsLogin: ({ commit }, islogin) => {
      commit('setIsLogin', islogin);
    },
    setRole: ({ commit }, role) => {
      commit('setRole', role);
    }
  }
});