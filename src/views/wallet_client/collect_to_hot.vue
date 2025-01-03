<template lang="pug">
  Main.page-exchange

    Form(:model='collectForm', :label-width='150')
      FormItem(:label='$lang("链ID")' style="width:400px" )
        //- Input(v-model='collectForm.token_id', :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
        Select( v-model="collectForm.chainId", class="search-col", :placeholder="$lang('请输入',$lang('链ID'))", :disabled="nextType=='edit'")
          Option( v-for="item in chainIds" :value="item.token_id" :key="`search-col-${item.token_id}`") {{ item.token_id }}
      FormItem(:label='$lang("币种ID")' style="width:600px" v-if="collectForm.chainId" )
        //- Input(v-model='collectForm.token_id', :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
        Select( v-model="collectForm.token_id", class="search-col", :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
          Option( v-for="item in tokenIds" :value="item.token_id" :key="`search-col-${item.token_id}`") {{ item.token_id }}
      FormItem(:label='$lang("从哪里归集")' style="width:600px"  v-if="collectForm.token_id"  )
        Input(v-model='collectForm.from_address',  :placeholder="$lang('请输入',$lang('从哪里归集'))")
      FormItem(:label='$lang("归集到哪里")' style="width:600px" )
        //- Input(v-model='collectForm.to_address',  :placeholder="$lang('请输入',$lang('归集到哪里'))")
        Select( v-model="collectForm.to_address", class="search-col", :placeholder="$lang('请输入',$lang('归集到哪里'))")
          Option( v-for="item in toAddress" :value="item.address" :key="`search-col-${item.address}`") {{ item.address }}
      FormItem(:label='$lang("最小归集值")' style="width:600px" )
        Input(v-model='collectForm.min_collect',  :placeholder="$lang('请输入',$lang('最小归集值'))")
      FormItem(:label='$lang("最大归集值")' style="width:600px" )
        Input(v-model='collectForm.max_collect',  :placeholder="$lang('请输入',$lang('最大归集值'))")

      Button(type="primary" long @click="modalRequst = true"  style="width:600px " :loading="loading") 用户地址归集到运营地址
      Modal(v-model="modalRequst" title="确认提示" @on-ok="sendRequest" )
        <p>确定要归集用户资产吗？</p>

    Form(:model='collect2Form', :label-width='150' style="margin-top:50px")
      FormItem(:label='$lang("链ID")' style="width:400px" )
        //- Input(v-model='collectForm.token_id', :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
        Select( v-model="collect2Form.chainId", class="search-col", :placeholder="$lang('请输入',$lang('链ID'))", :disabled="nextType=='edit'")
          Option( v-for="item in chainIds" :value="item.token_id" :key="`search-col-${item.token_id}`") {{ item.token_id }}
      FormItem(:label='$lang("币种ID")' style="width:600px" )
        //- Input(v-model='collect2Form.token_id', :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
        Select( v-model="collect2Form.token_id", class="search-col", :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
          Option( v-for="item in tokenIds2" :value="item.token_id" :key="`search-col-${item.token_id}`") {{ item.token_id }}
      FormItem(:label='$lang("从哪里归集")' style="width:600px" )
        Input(v-model='collect2Form.from_address',  :placeholder="$lang('请输入',$lang('从哪里归集'))")
      FormItem(:label='$lang("归集到哪里")' style="width:600px" )
        //- Input(v-model='collect2Form.to_address',  :placeholder="$lang('请输入',$lang('归集到哪里'))")
        Select( v-model="collect2Form.to_address", class="search-col", :placeholder="$lang('请输入',$lang('归集到哪里'))")
          Option( v-for="item in toAddress2" :value="item.address" :key="`search-col-${item.address}`") {{ item.address }}
      FormItem(:label='$lang("归集金额")' style="width:600px" )
        Input(v-model='collect2Form.amount',  :placeholder="$lang('请输入',$lang('归集金额'))")

      Button(type="primary" long @click="modalRequst2 = true"  style="width:600px " :loading="loading") 运营地址归集到运营地址
      Modal(v-model="modalRequst2" title="确认提示" @on-ok="sendRequest2" )
        <p>确定要归集运营资产吗？</p>

</template>
<script>
export default {
  name: "CollectToHot",
  data() {
    return {
      nextType: '',
      loading: false,
      modalRequst: false,
      modalRequst2: false,

      // 创建/修改/查看共用
      collectForm: {
        token_id: "",
        from_address: "",
        to_address: "",
        min_collect: "",
        max_collect: "",
        chainId: ""
      },
      collect2Form: {
        token_id: "",
        from_address: "",
        to_address: "",
        amount:"",
        chainId: ""
      },
      chainIds: [],
      tokenIds: [],
      tokenIds2: [],
      toAddress: [],
      toAddress2: [],
      searchForm: {
        current: 1,
        page_size: 100
      },
    };
  },
  created() {
    this.loadData();
  },
  watch: {
    "collectForm.chainId": function (val) {
      this.$axios.get("/api/v1/get_token_ids", {params: {
          ...this.searchForm,
          token_id: val,
        }}).then(result => {
        if (result.code === 10000) {
          this.tokenIds = result.data;
        }
      });
    },
    "collectForm.token_id": function (val) {
      this.$axios.get("/api/v1/hot_address", {params: {
          ...this.searchForm,
          token_id: val,
        }}).then(result => {
        if (result.code === 10000) {
          this.toAddress = result.data;
        }
      });
    },
    "collect2Form.chainId": function (val) {
      this.$axios.get("/api/v1/get_token_ids", {params: {
          ...this.searchForm,
          token_id: val,
        }}).then(result => {
        if (result.code === 10000) {
          this.tokenIds2 = result.data;
        }
      });
    },
    "collect2Form.token_id": function (val) {
      this.$axios.get("/api/v1/hot_address", {params: {
          ...this.searchForm,
          token_id: val,
        }}).then(result => {
        if (result.code === 10000) {
          this.toAddress2 = result.data;
        }
      });
    },
  },
  methods: {
    loadData() {
      this.$axios.get("/api/v1/get_chains").then(result => {
        if (result.code === 10000) {
          this.chainIds = result.data;
        }
      });
    },
    sendRequest() {
      this.loading = true;
      this.collectForm.min_collect = String(this.collectForm.min_collect)
      this.collectForm.max_collect = String(this.collectForm.max_collect)
      this.$axios.post("/api/v1/collect_to_hot", this.collectForm).then(result => {
        this.loading = false;
        /*setTimeout(() => {
            this.loading = true;
        }, 200);*/


        if (result.code == 10000) {
          this.$Notice.success({
            title: "归集成功",
            duration: 2
          });
        }else{
          this.$Notice.error({
            title: "归集失败: "  + result.data.msg,
            duration: 4
          });
        }
      });
    },
    sendRequest2() {
      this.loading = true;
      this.collect2Form.amount = String(this.collect2Form.amount)
      this.$axios.post("/api/v1/collect_hot_to_hot", this.collect2Form).then(result => {
        this.loading = false;
        /*setTimeout(() => {
            this.loading = true;
        }, 200);*/


        if (result.code == 10000) {
          this.$Notice.success({
            title: "归集成功",
            duration: 2
          });
        }else{
          this.$Notice.error({
            title: "归集失败: "  + result.data.msg,
            duration: 4
          });
        }
      });
    },
  }
};
</script>
