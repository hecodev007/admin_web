import Vue from "vue";
import Vuex from "vuex";
import cookie from "@/libs/common";
import user from './module/user'
import app from './module/app'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: {
      zh_CN: "中文",
      en_US: "English"
    },
    username: "",
    orgName: "",
    roleId: "",
    roleName: "",
    menuList: []
  },
  mutations: {
    setUserName (state, payload) {
      state.username = payload.username;
      state.orgName = payload.orgName;
      state.roleId = payload.roleId;
      state.roleName = payload.roleName
    },
    setRoleList (state, payload) {
      // console.log(payload)
      state.menuList = payload
    },
    setLocale (state, lang) {
      cookie("locale", lang, { path: "/", day: 3000 });
      location.reload();
    }
  },
  actions: {
    //
  },
  modules: {
    user,
    app
  }
});
