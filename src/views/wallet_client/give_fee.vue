<template lang="pug">
  Main.page-exchange

    Form(:model='collectForm', :label-width='100')
      FormItem(:label='$lang("链ID")' style="width:400px" )
        //- Input(v-model='collectForm.token_id', :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
        Select( v-model="collectForm.chainId", class="search-col", :placeholder="$lang('请输入',$lang('链ID'))", :disabled="nextType=='edit'")
          Option( v-for="item in chainIds" :value="item.token_id" :key="`search-col-${item.token_id}`") {{ item.token_id }}
      FormItem(:label='$lang("币种ID")' style="width:400px" v-if="collectForm.chainId" )
        //- Input(v-model='collectForm.token_id', :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
        Select( v-model="collectForm.token_id", class="search-col", :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
          Option( v-for="item in tokenIds" :value="item.token_id" :key="`search-col-${item.token_id}`") {{ item.token_id }}
      FormItem(:label='$lang("从哪给")' style="width:400px"  v-if="collectForm.token_id")
        //- Input(v-model='collectForm.from_address',  :placeholder="$lang('请输入',$lang('从哪给'))")
        Select( v-model="collectForm.from_address", class="search-col", :placeholder="$lang('请输入',$lang('从哪给'))")
          Option( v-for="item in fromAddress" :value="item.address" :key="`search-col-${item.address}`") {{ item.address }}
      FormItem(:label='$lang("给谁")' style="width:400px" )
        Input(v-model='collectForm.to_address',  :placeholder="$lang('请输入',$lang('给谁'))")
      FormItem(:label='$lang("给多少")' style="width:400px" )
        Input(v-model='collectForm.amount',  :placeholder="$lang('请输入',$lang('给多少'))")

      Button(type="primary" long @click="modalDelete = true"  style="width:400px " :loading="loading") {{$lang("给矿工费")}}
      Modal(v-model="modalDelete" title="确认提示" @on-ok="sendRequest" )
        <p>确定要给手续费吗？</p>

</template>
<script>
export default {
  name: "GiveFee",
  data() {
    return {
      nextType: '',
      loading: false,
      modalDelete: false,

      // 创建/修改/查看共用
      collectForm: {
        token_id: "",
        from_address: "",
        to_address: "",
        amount: "",
        chainId: ""
      },
      tokenIds: [],
      fromAddress: [],
      chainIds: [],
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
          this.fromAddress = result.data;
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
      this.collectForm.amount = String(this.collectForm.amount)
      this.$axios.post("/api/v1/give_fee", this.collectForm).then(result => {
        this.loading = false;
        /*setTimeout(() => {
            this.loading = true;
        }, 200);*/


        if (result.code == 10000) {
          this.$Notice.success({
            title: "给矿工费成功",
            duration: 2
          });
        }else{
          this.$Notice.error({
            title: "给矿工费失败：" + result.data.msg,
            duration: 4
          });
        }
      });
    },
  }
};
</script>
