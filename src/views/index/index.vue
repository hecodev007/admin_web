<template lang="pug">
.page-index
  MenuList(v-model='close', :list="menu_list")
  .page-index-right(:class="{'page-index-right-close':close}")
    router-view
</template>

<style lang="less">
@import "../../libs/mixin";
.page-index {
    min-width: 1200px;
    width: 100%;
    min-height: 100vh;
    position: relative;
    &-right {
        float: right;
        width: calc(100% - 260px);
        position: relative;
        padding: 24px;
    }
}
</style>

<script>
import { localSave, localRead } from '@/libs/util'

export default {
    data() {
        return {
            close: localStorage.menuStatus === "true" || false,
            userInfo: {},
            allRoles: [],
            // allWebRouters: [],
            // 动态生成menu_list
            menu_list: []
        };
    },
    created() {
        // 获取用户信息
        this.$axios.get("/api/v1/user/login_user_info").then(result => {
            if (result.code === 10000) {
                this.$store.commit("setUserName", result.data);
                localSave('userInfo', JSON.stringify(result.data))
                this.userInfo = result.data

                // 获取角色
                // // 获取当前用户路由
                let _userInfo = result.data
                let _userRolesList = _userInfo.menus.split(',')

                // 是否管理员
                if (_userInfo.isRoot == true) {
                    console.log('超级管理员')
                    this.renderMenuListHandle()
                } else {
                  console.log('一般用户')
                  this.renderMenuListHandle(_userRolesList)
                }
            }
        });

    },
    methods: {
        // 渲染全部菜单列表
        renderMenuListHandle(_roleMenu) {
          // console.log(_roleMenu)
          let _isRoot = true
          if(_roleMenu && _roleMenu.length > 0) {
            _isRoot = false
          }
          // 拿所有web_routers
          this.$axios.get("/api/v1/router/routers").then(result => {
              if (result.code === 10000) {
                  let _data = result.data

                let _tempData = []
                _data.forEach((item, index) => {
                    // 寻找一级路由，并根据sort排序
                    if (item.parent_id === 'root') {
                      if(_isRoot || ( !_isRoot && _roleMenu.indexOf(item.id) > -1)) {
                        let _tObj = {
                          open: false,
                          id: item.id,
                          name: item.title,
                          type: item.ico,
                          sort: item.sort,
                          showLevel: item.showLevel
                        }
                        if (item.showLevel == '2') {
                            _tObj.children = []
                        } else {
                          _tObj.link = '/' + item.url
                        }

                        _tempData.push(_tObj)
                      }
                    }
                })
                _tempData = this.setArray(_tempData)

                // console.log(_tempData)

                // 寻找二级路由
                _tempData.forEach((item, index) => {
                    if (item.showLevel == '2') {
                        let _tempSubData = []
                        let _ctData = {}

                        _data.forEach((cell, ind) => {
                            _ctData = {
                                name: cell.title,
                                sort: cell.sort,
                                parent_id: cell.parent_id,
                                id: cell.id,
                                url: cell.url,
                                link: '/' + cell.parent_id + '/' + cell.url
                            }

                            if(cell.parent_id === item.id && (_isRoot || _roleMenu.indexOf(_ctData.id) > -1)) {
                                _tempSubData.push(_ctData)
                            }

                        })
                        // console.log(_tempSubData)
                        _tempSubData = this.setArray(_tempSubData)
                        item.children = _tempSubData
                    }
                })
                // console.log(_tempData)

                // 渲染用户路由
                this.menu_list = _tempData
              } else {
                this.$Message.error('routers:' + result.msg);
              }
          })

        },
        // 数组排序
        setArray(c) {
            c.sort(this.compare('sort'));
            return c;
        },
        compare(property) {
            return function(a, b) {
                // 降序
                return b[property] - a[property];
            }
        },

    },
    watch: {
        close() {
            localStorage.menuStatus = this.close;
        }
    },
    computed: {
        user_info() {
            return this.$store.state.user_info;
        }
    }
};
</script>
