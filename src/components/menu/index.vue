<template lang="pug">
.v-side-wrap
  .v-side(:class="{'v-sideClose':close}")
    .logo
      img(src="./logo.svg")
      p {{orgName}}
    .menu
      ul
        li.user
          a.master(:class="{'master-open':user}" @click="show")
            Avatar(style="color:#f56a00;background-color:#fff;") {{username.toLocaleUpperCase()[0]}}
            span.text {{username}}
            b
          div.sub-menu(:style="userStyle")
            div(ref="userStatus")
              a.salver(@click="logout")
                span {{$lang('退出登录')[0]}}
                | {{$lang('退出登录')}}
        li(v-for="(item,index) in list")
          a.master(:to="item.link", :class="{'master-open':item.open,'master-current':index==currentIndex}" @click.prevent='switchMenu(index)' v-if="item.children", :title="$lang(item.name)")
            Icon(:type="item.type")
            span.text {{$lang(item.name)}}
            b
          router-link.master(:to="item.link", :class="{'master-open':item.open,'master-current':index==currentIndex}" @click='switchMenu(index)' v-else , :title="$lang(item.name)")
            Icon(:type="item.type")
            span.text {{$lang(item.name)}}
            b
          div.sub-menu(:style="objStyle(item,index)")
            div(:ref="item.name" v-if="item.children")
              router-link.salver(:to="_item.link" v-for="_item in item.children", :key="_item.id", :title="$lang(_item.name)")
                span {{$lang(_item.name)[0]}}
                | {{$lang(_item.name)}}
</template>
<script>
import { localSave } from "@/libs/util";
import Cookies from "js-cookie";
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      height: 0,
      user: false,
      close: false
    };
  },
  methods: {
    show() {
      this.user = !this.user;
      this.height = this.$refs["userStatus"].offsetHeight;
    },
    objStyle(item, index) {
      if (item.open) {
        if (this.$refs[item.name]) {
          return {
            height: `${this.$refs[item.name][0].offsetHeight}px`
          };
        } else if (index == this.currentIndex) {
          return {
            height: "auto"
          };
        }
      } else {
        return {};
      }
    },
    switchMenu(index) {
      this.list.forEach((item, i) => {
        if(index !== i) {
          item.open = false
        }

      })
      this.list[index].open = !this.list[index].open;
    },
    logout() {
      this.$axios.post("/api/v1/user/logout").then(() => {
        location.reload()
        localSave("userInfo", ""); // 清空本地存储localStorage中的userInfo
        localSave("roleList", ""); // 清空localStorage中的roleList
        // Cookies.set('wallet-admin-jwt-auth-token', ''); // 清空本地登录信息
        // Cookies.set('wallet-admin-jwt-login-key', ''); // 请空本地登录信息
      });
    }
  },
  computed: {
    orgName() {
      return this.$store.state.orgName;
    },
    username() {
      return this.$store.state.username;
    },
    userStyle() {
      if (this.user) {
        return {
          height: `${this.height}px`
        };
      }
      return {};
    },
    currentIndex() {
      let _index = 0;
      this.list.forEach((el, index) => {
        if (el.children) {
          el.children.forEach(_el => {
            if (_el.link == this.$route.path) {
              _index = index;
              el.open = true;
            }
          });
        }
      });
      return _index;
    }
  }
};
</script>