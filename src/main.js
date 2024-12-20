import App from "./app.vue";
import components from "./components";
import router from "./router/routers.js";
// import router from "./router";
import Vue from "vue";
import VueI18n from "vue-i18n";
import iView from "iview";
import store from "./store/index.js";
import cookie from "./libs/common";
import en from "iview/dist/locale/en-US";
import zh from "iview/dist/locale/zh-CN";
import "./libs/common.less";
import 'iview/dist/styles/iview.css';
import 'view-design/dist/styles/iview.css';
import axios from "axios";

// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production')
// require("@/mock");

Vue.use(VueI18n);
Vue.use(iView, {
  transfer: true,
  size: "large"
});

Vue.locale = () => { };

let i18n;
i18n = new VueI18n({
  silentTranslationWarn: true,
  locale: cookie("locale") === "zh_CN" ? "zh_CN" : "en_US", // 语言标识

  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    zh_CN: Object.assign(require("./locale/zh"), zh), // 中文语言包
    en_US: Object.assign(require("./locale/en"), en) // 英文语言包
  }
});

Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});

document.setTitle = function (title) {
  document.title = title;
};

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.code === 10002) {
    if (!/\/login/.test(location.href)) {
      sessionStorage.setItem("redirectUrl", location.href);
    }
    location.href = "/login";
  } else if (response.data.code === 10001) {
    vm.$Message.error(response.data.msg);
  }
  return response.data;
});

axios.defaults.transformRequest = [
  function (data) {
    return JSON.stringify(data);
  }
];
axios.defaults.responseType = "json";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers.put["Content-Type"] = "application/json;charset=UTF-8";

Object.defineProperty(Vue.prototype, "$lang", {
  value (name, text) {
    return this.$t(`default['${name}']`, {
      text
    });
  }
});

Vue.prototype.$axios = axios;

let vm = new Vue({
  el: "#app",
  router,
  i18n,
  store,
  render: h => h(App)
});

// 放在axios下面
