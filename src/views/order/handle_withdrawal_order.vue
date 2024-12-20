<template lang="pug">
  Main.page-exchange
    Form(:model='transTokenForm', :label-width='150' style="margin-top:50px")
      FormItem(:label='$lang("币种ID")' style="width:600px" )
        Input(v-model='transTokenForm.token_id', :placeholder="$lang('请输入',$lang('币种ID'))")
      FormItem(:label='$lang("broker订单ID")' style="width:600px" )
        Input(v-model='transTokenForm.broker_order_id', :placeholder="$lang('请输入',$lang('broker订单ID'))")
      FormItem(:label='$lang("From")' style="width:600px" )
        Input(v-model='transTokenForm.from_address', :placeholder="$lang('请输入',$lang('From'))")
      FormItem(:label='$lang("To")' style="width:600px" )
        Input(v-model='transTokenForm.to_address', :placeholder="$lang('请输入',$lang('To'))")
      FormItem(:label='$lang("金额")' style="width:600px" )
        Input(v-model='transTokenForm.amount', :placeholder="$lang('请输入',$lang('金额'))")

      Button(type="primary" long @click="transTokenFormConfirm = true"  style="width:600px " :loading="loading") 转账
      Modal(v-model="transTokenFormConfirm" title="确认提示" @on-ok="transToken" )
        <p>确定吗？</p>

    <div class="not_has_more">
    | {{$lang("订单信息")}}
    </div>
    tables(ref="tables", editable, searchable, :addable="addable", :deleteable="deleteable", :loading="loading", :search-place="top", v-model="orderData", :columns="orderDataColumns",
      :searchOptions="searchOptions", @on-search="searchWithdrawalOrderExtraInfo")
    Row

    <div class="not_has_more">
      | {{$lang("适用资产信息")}}
    </div>
    tables(ref="tables", :loading="loading", :search-place="top", v-model="selfAssetData", :columns="selfAssetDataColumns")
    Row

    <div class="not_has_more">
      | {{$lang("所有资产信息")}}
    </div>
    tables(ref="tables", :loading="loading", :search-place="top", v-model="pubAssetData", :columns="pubAssetDataColumns")
    Row

</template>
<script>
import Tables from '@/components/tables'
export default {
  name: "HandleWithdrawalOrder",
  components: {
    Tables
  },
  data() {
    return {
      top: "top",
      loadingTable: true,
      loading: false,
      addable: false,
      deleteable: false,
      transTokenFormConfirm: false,

      searchForm: {
        broker_order_id: "",
      },
      searchOptions: ["broker_order_id"],

      transTokenForm: {
        token_id: 0,
        broker_order_id: "",
        from_address: "",
        to_address: "",
        amount:"",
      },

      orderDataColumns: [
        {title: 'broker订单ID', key: 'broker_order_id'},
        {title: '币种ID', key: 'token_id'},
        {title: '消耗币种', key: 'cost_fee_token_id'},
        {title: 'From', key: 'from'},
        {title: 'To', key: 'to'},
        {title: '金额', key: 'amount'},
        {title: '手续费', key: 'cost_fee'},
        {title: '提现类型', key: 'type'},
        {title: 'Org_ID', key: 'org_id'},
        {title: '状态', key: 'status'},
        {title: '交易hash', key: 'tx_hash'},
      ],
      orderData: [],

      selfAssetDataColumns: [
        {title: '地址', key: 'address'},
        {title: '转账币种', key: 'token_id'},
        {title: '转账币种余额', key: 'token_balance'},
        {title: '转账币种Org', key: 'org_id'},
        {title: '转账币种Owner', key: 'owner'},
        {title: '转账币种状态', key: 'status'},
        {title: 'Fee币种', key: 'fee_token_id'},
        {title: 'Fee币种余额', key: 'fee_token_balance'},
        {title: 'Fee币种Org', key: 'fee_token_org_id'},
        {title: 'Fee币种Owner', key: 'fee_token_owner'},
        {title: 'Fee币种状态', key: 'fee_token_status'},
      ],
      selfAssetData: [],

      pubAssetDataColumns: [
        {title: '地址', key: 'address'},
        {title: '转账币种', key: 'token_id'},
        {title: '转账币种余额', key: 'token_balance'},
        {title: '转账币种Org', key: 'org_id'},
        {title: '转账币种Owner', key: 'owner'},
        {title: '转账币种状态', key: 'status'},
        {title: 'Fee币种', key: 'fee_token_id'},
        {title: 'Fee币种余额', key: 'fee_token_balance'},
        {title: 'Fee币种Org', key: 'fee_token_org_id'},
        {title: 'Fee币种Owner', key: 'fee_token_owner'},
        {title: 'Fee币种状态', key: 'fee_token_status'},
      ],
      pubAssetData: [],

    };
  },
  created() {
  },
  methods: {
    searchWithdrawalOrderExtraInfo(searchKey, searchValue) {
      this.loading = true;
      this.searchForm.broker_order_id = searchValue
      this.$axios.get("/api/v1/withdrawal_order_extra_info", {params: this.searchForm}).then(result => {
        this.loading = false;
        this.orderData = result.data["orderInfo"] ? result.data["orderInfo"] : [];
        this.selfAssetData = result.data["selfAssetList"] ? result.data["selfAssetList"] : [];
        this.pubAssetData = result.data["allAssetList"] ? result.data["allAssetList"] : [];

        this.transTokenForm.token_id = result.data["orderInfo"][0]["token_id"] ? result.data["orderInfo"][0]["token_id"] : '';
        this.transTokenForm.broker_order_id = searchValue;
        this.transTokenForm.amount = result.data["orderInfo"][0]["amount"] ? result.data["orderInfo"][0]["amount"] : '';
      });
    },
    transToken() {
      this.loading = true;
      this.transTokenForm.token_id = String(this.transTokenForm.token_id)
      this.transTokenForm.broker_order_id = String(this.transTokenForm.broker_order_id)
      this.transTokenForm.from_address = String(this.transTokenForm.from_address)
      this.transTokenForm.to_address = String(this.transTokenForm.to_address)
      this.transTokenForm.amount = String(this.transTokenForm.amount)
      this.$axios.post("/api/v1/trans_token", this.transTokenForm).then(result => {
        this.loading = false;
        if (result.code == 10000) {
          this.$Notice.success({
            title: "成功",
            duration: 2
          });
        }else{
          this.$Notice.error({
            title: "失败: "  + result.data.msg,
            duration: 4
          });
        }
      });
    },
  }
};
</script>

<style>
.not_has_more {
  margin: 40px 0;
  line-height: 50px;
  text-align: center;
  position: relative;
  height: 33px;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(140, 142, 165, 1);
  line-height: 33px;
&::after,
&::before {
   position: absolute;
   width: 54px;
   height: 0.5px;
   background: #dadada;
   content: '';
   top: 15px;
 }
&::after {
   left: 28%;
 }
&::before {
   right: 28%;
 }
}
</style>
