<template lang="pug">
.page-login
  Dropdown.locale(trigger="click")
    a(href="javascript:void(0)") {{lang[$i18n.locale]}}
      Icon(type="ios-arrow-down")
    DropdownMenu(slot="list")
      DropdownItem(@click.native="setLocale('zh_CN')") 中文
      DropdownItem(@click.native="setLocale('en_US')") English
  .loginBox
    .logo
      img(src="../../assets/wlogo.png")
      .text {{$lang('欢迎登录')}}
      p {{$lang('SaaS管理平台')}}
    Form(ref="formValidate", :model="formItem", :rules="ruleValidate")
      FormItem(:label="$lang('账号')" prop="username")
        Input(@on-enter="submit" v-model="formItem.username" prefix="md-person" , :placeholder="$lang('请输入',$lang('账号'))")
      FormItem(:label="$lang('密码')" prop="password")
        Input(@on-enter="submit" v-model="formItem.password" type="password" prefix="md-lock", :placeholder="$lang('请输入',$lang('密码'))")
      FormItem
        Button(type="primary" @click="submit" long ghost icon="md-send", :loading="loading") {{$lang('登录')}}
    a(href="/password/find")  {{$lang('忘记密码')}} ？
</template>
<script>
import md5 from "md5";
// function
import { refreshRoute } from "@/router"; // 路由初始化，清空动态路由
import { localRead, localSave } from "@/libs/util";

export default {
  data() {
    return {
      loading: false,
      formItem: {
        username: "",
        password: ""
      },
      ruleValidate: {
        username: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error(this.$lang('请输入',this.$lang('账号'))));
              } /*else if (!/^[^@]{1,}@[^\.]{1,}\.[^\.0-9]{1,}$/.test(value)) {
                callback(new Error(this.$lang("账号不正确")));
              }*/
              callback();
            },
            trigger: "blur"
          }
        ],

        password: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error(this.$lang('请输入',this.$lang('密码'))));
              }
              callback();
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    lang() {
      return this.$store.state.lang;
    }
  },
  created() {
    localSave("dynamicRouter-template", []);
    refreshRoute();
  },
  methods: {
    setLocale(lang) {
      this.$store.commit("setLocale", lang);
    },
    submit() {
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          this.loading = true;
          const username = this.formItem.username;
          const password = this.formItem.password;
          this.$axios.post("/api/v1/user/login", { username, password }).then(result => {
            this.loading = false;
            if (result.code === 10000) {
              // 正常跳转
              let redirectUrl = sessionStorage.redirectUrlDemo;
              if (redirectUrl) {
                sessionStorage.removeItem("redirectUrl");
              } else {
                redirectUrl = "/";
              }
              location.href = redirectUrl;
              this.$store.commit("setUserName", result.data);
              localSave('userInfo', JSON.stringify(result.data))
            }
          });
        }
      });
    }
  }
};
</script>
