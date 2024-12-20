<style lang="less" scoped>
.box {
  display: flex;
  min-height: 300px;
  align-items: center;
  justify-content: center;
  border: 1px dashed #ccc;
  padding: 50px;
}
</style>

<template lang="pug">
Main.page-exchange
  Tabs(:animated="false" v-model="createForm.accountType" @on-click="change")
    TabPane(:label="item" v-for="(item,key) in type", :name="key")
      template(v-if="isInit")
        Table.user-table(:columns="columns", :data="listData", :loading="loadingTable" v-if="isBind")
        .box(@click="bind" v-else)
          Button(icon="md-add" type="primary" @click="bind") {{$lang("绑定资金子账户")}}（{{item}}）
        
  // 绑定资金子账户    
  Modal.page-exchange-win(v-model="creatWinStatus", :title="$lang('绑定资金子账户')" @on-ok="doNext")
    Form(:model='createForm', :label-width='120')
      FormItem(:label="$lang('类型')")
        Input(:value='type[createForm.accountType]', readonly)
      FormItem(:label="$lang('券商简称')")
        Input(v-model='createForm.brokerName', :placeholder="$lang('请输入',$lang('券商简称'))")
      FormItem(:label="$lang('登录账号')")
        Input(v-model='createForm.username', :placeholder="$lang('请输入',$lang('登录账号'))")
      FormItem(:label="$lang('验证码')")
        Input(v-model='createForm.validateCode', :placeholder="$lang('请输入',$lang('验证码'))")
          span(slot="append" v-if="time") {{time}}s
          a(slot="append" v-else @click="getCode") {{$lang("获取验证码")}}
</template>
<script>
export default {
  data() {
    return {
      loadingTable: true,
      listData: [],
      creatWinStatus: false,
      time: 0,
      isInit: false,
      isBind: false,
      searchForm: {
        pageSize: 100,
        fromId: 0,
        lastId: 0,
        next: true
      },
      type: {
        7: this.$lang("运营账户"),
        22: this.$lang("营收账户")
      },
      createForm: {
        username: "",
        accountType: "7",
        brokerName: "",
        validateCode: ""
      },
      columns: [
        {
          title: this.$lang("币种"),
          key: "tokenId"
        },
        {
          title: this.$lang("全称"),
          key: "tokenFullName"
        },
        {
          title: this.$lang("可用"),
          key: "available"
        },
        {
          title: this.$lang("冻结"),
          key: "locked"
        }
      ]
    };
  },
  created() {
    this.loadData();
  },
  watch: {
    time() {
      if (this.time) {
        setTimeout(() => {
          this.time--;
        }, 1000);
      }
    }
  },
  methods: {
    change() {
      this.isInit = false;
      this.loadData();
    },
    loadData() {
      this.loadingTable = true;
      this.$axios
        .post("/api/v1/platform_account/assets", this.createForm)
        .then(result => {
          if (result.code === 0) {
            this.isInit = true;
            this.loadingTable = false;
            this.listData = result.data.list;
            this.isBind = result.data.isBind;
          }
        });
    },
    create() {
      this.creatWinStatus = true;
      Object.assign(this.createForm, {
        brokerName: "",
        sign: "",
        brokerId: null
      });
    },
    bind() {
      this.creatWinStatus = true;
    },
    getCode() {
      this.$axios
        .post("/api/v1/platform_account/send_validate_code", this.createForm)
        .then(result => {
          if (result.code == 0) {
            this.time = 60;
          }
        });
    },
    doNext() {
      this.$axios
        .post("/api/v1/platform_account/bind", this.createForm)
        .then(result => {
          if (result.code === 0) {
            this.loadData();
          }
        });
    }
  }
};
</script>