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
    Form(ref="formValidate", :model="formItem", :rules="ruleValidate" v-if="step === 0")
      FormItem(:label="$lang('账号')" prop="username")
        Input(@on-enter="submit" v-model="formItem.username" prefix="md-person" , :placeholder="$lang('请输入',$lang('账号'))")
      FormItem(:label="$lang('密码')" prop="password")
        Input(@on-enter="submit" v-model="formItem.password" type="password" prefix="md-lock", :placeholder="$lang('请输入',$lang('密码'))")
      FormItem
        Button(type="primary" @click="login" long ghost icon="md-send", :loading="loading") {{$lang('登录')}}
    Form(ref="formGoogleCodeValidate", :model="formGoogleCode", :rules="ruleValidate" v-if="step === 1")
      FormItem(:label="$lang('Google验证码')" prop="formGoogleCode")
        Input(@on-enter="submit" v-model="formGoogleCode.code" prefix="md-person" , :placeholder="$lang('请输入',$lang('Google验证码'))")
      FormItem
        img(:src="qrCode" width="200" height="200")
      FormItem
        Button(type="primary" @click="bind" long ghost icon="md-send", :loading="loading") {{$lang('登录')}}
    Form(ref="formGoogleCodeValidate", :model="formGoogleCode", :rules="ruleValidate" v-if="step === 2")
      FormItem(:label="$lang('Google验证码')" prop="formGoogleCode")
        Input(@on-enter="submit" v-model="formGoogleCode.code" prefix="md-person" , :placeholder="$lang('请输入',$lang('Google验证码'))")
      FormItem
        Button(type="primary" @click="verify" long ghost icon="md-send", :loading="loading") {{$lang('登录')}}
    div(v-if="step === 0")
      a(href="/password/find")  {{$lang('忘记密码')}} ？
</template>
<script>
// function
import { refreshRoute } from "@/router"; // 路由初始化，清空动态路由
import { localSave } from "@/libs/util";

export default {
  data() {
    return {
      step: 0,
      loading: false,
      qrCode: "",
      secret: '',
      formItem: {
        username: "",
        password: ""
      },
      formGoogleCode: {
        code: ""
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
    login() {
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          this.loading = true;
          const username = this.formItem.username;
          const password = this.formItem.password;
          this.$axios.post("/api/v1/user/login", { username, password }).then(result => {
            this.loading = false;
            if (result.code === 10000) {
              if(result.data.googleBind){
                this.step = 1;
                this.getImg(username)
              } else {
                this.step = 2;
              }
            }
          });
        }
      });
    },
    verify(){
      this.$refs["formGoogleCodeValidate"].validate(valid => {
        if (valid) {
          this.loading = true;
          const code = this.formGoogleCode.code;
          const username = this.formItem.username;
          this.$axios.post("/api/v1/user/google_verify", { username, code, secret: this.secret }).then(res => {
            this.loading = false;
            if (res.code === 10000) {
              this.jump(res)
            } else if (res.code === 10001) {
              this.$Message.error(this.$lang("Google验证码错误"));
            }
          });
        }
      });
    },
    bind(){
      this.$refs["formGoogleCodeValidate"].validate(valid => {
        if (valid) {
          this.loading = true;
          const code = this.formGoogleCode.code;
          const username = this.formItem.username;
          this.$axios.post("/api/v1/user/google_code_bind", { username, code, secret: this.secret }).then(res => {
            if (res.code === 10000) {
              this.jump(res)
            } else if (res.code === 10001) {
              this.$Message.error(this.$lang("Google验证码错误"));
            }
          });
        }
      });
    },
    getImg(user_name){
      this.$axios.get("/api/v1/user/get_google_code", {params: { user_name }}).then(res => {
        if (res.code === 10000) {
          this.qrCode = res.data.secret_url;
          this.secret = res.data.secret;
        }
      });
    },
    jump(result){
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
  }
};
</script>
