import Vue from "vue";
import Vuex from "vuex";
import cookie from "@/libs/common";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: {
      zh_CN: "中文",
      en_US: "English"
    },
    username: "",
    orgName:""
  },
  mutations: {
    setUserName(state, payload) {
      state.username = payload.username;
      state.orgName = payload.orgName;
    },
    setLocale(state, lang){
      cookie("locale", lang, { path: "/", day: 3000 });
      location.reload();
    }
  }
});
