<template lang="pug">
  Main.page-exchange

    Form(:model='createForm', :label-width='150')
      FormItem(:label='$lang("币种类型")' style="width:400px" )
        Select( v-model="tokenType", class="search-col")
          Option( v-for="item in tokenTypeList" :value="item.key" :key="item.key") {{ item.value }}
      FormItem(:label='$lang("币种ID")' style="width:400px" )
        Input(v-model='createForm.token_id', :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
      FormItem(:label='$lang("合约地址")' style="width:400px" )
        Input(v-model='createForm.contract_address',  :placeholder="$lang('请输入',$lang('合约地址'))")
      FormItem(:label='$lang("精度位数")' style="width:400px" )
        Input(v-model='createForm.decimals',  :placeholder="$lang('请输入',$lang('精度位数'))")
      FormItem(:label='$lang("代币总量")' style="width:400px" )
        Input(v-model='createForm.total_supply',  :placeholder="$lang('请输入',$lang('代币总量'))")
      FormItem(:label='$lang("gas限制")' style="width:400px"  v-if= 'tokenType != 7 && tokenType != 4')
        Input(v-model='createForm.gas_limit',  :placeholder="$lang('请输入',$lang('gas限制'))")

      FormItem(:label='$lang("可交易确认数")' style="width:400px" )
        Input(v-model='createForm.can_transaction_confirms', , :placeholder="$lang('请输入',$lang('可交易确认数'))")
      FormItem(:label='$lang("可提现确认数")' style="width:400px" )
        Input(v-model='createForm.can_withdrawal_confirms', , :placeholder="$lang('请输入',$lang('可提现确认数'))")
      FormItem(:label='$lang("消耗币种")' style="width:400px" )
        Input(v-model='createForm.fee_token_id',  :placeholder="$lang('请输入',$lang('消耗币种'))")
      FormItem(:label='$lang("扩展字段")' style="width:400px"  v-if= 'tokenType ==0')
        Input(v-model='createForm.extension', , :placeholder="$lang('请输入',$lang('扩展字段'))")
      FormItem(:label='$lang("归集触发值")' style="width:400px" )
        Input(v-model='createForm.collect_threshold')
      FormItem(:label='"api_key"' style="width:400px" v-if= 'tokenType ==0')
        Input(v-model='createForm.api_key')
      FormItem(:label='"ed25519_publickey"' style="width:400px" v-if= 'tokenType == 0')
        Input(v-model='createForm.ed25519_publickey')
      FormItem(:label='$lang("主链")' style="width:400px" v-if= 'tokenType == 0')
        Input(v-model='createForm.chain')
      FormItem(:label='$lang("主链类型")' style="width:400px" v-if= 'tokenType == 0')
        Input(v-model='createForm.chain_type')
      FormItem(:label='$lang("地址正则")' style="width:400px" )
        Input(v-model='createForm.address_regexp')
      FormItem(:label='$lang("memo正则")' style="width:400px" v-if= 'tokenType == 0')
        Input(v-model='createForm.memo_regexp')
      FormItem(:label='"NeedMemo"' style="width:400px" )
        Input(v-model='createForm.need_memo')
      FormItem(:label='$lang("归集地址")' style="width:400px" )
        Input(v-model='createForm.collect_address')
      //FormItem(:label='"GiveFeeValue"' style="width:400px" )
      //  Input(v-model='createForm.give_fee_value')
      //FormItem(:label='"min"' style="width:400px" )
      //  Input(v-model='createForm.min')
      //FormItem(:label='"max"' style="width:400px" )
      //  Input(v-model='createForm.max')
      //FormItem(:label='"suggest"' style="width:400px" )
      //  Input(v-model='createForm.suggest')
      //FormItem(:label='"MaxAutoCollect"' style="width:400px" )
      //  Input(v-model='createForm.auto_collect')

      Button(type="primary" long @click="modalDelete = true"  style="width:400px " :loading="loading") {{$lang("上币")}}
      Modal(v-model="modalDelete" title="NOTICE" @on-ok="pushToken" )
        <p>{{$lang("确定吗")}}?</p>


</template>
<script>
export default {
  data() {
    return {
      nextType: '',
      tokenType: 1,
      loading: false,
      modalDelete: false,
      tokenTypeList: [
        {
          key: 1,
          value: 'ERC20'
        },
        {
          key: 2,
          value: 'BEP20'
        },
        {
          key: 3,
          value: '' +
              'Polygon'
        },
        {
          key: 4,
          value: 'TRC20'
        },
        {
          key: 5,
          value: 'Arbitrum'
        },
        {
          key: 6,
          value: 'Optimism'
        },
        {
          key: 7,
          value: 'SOL'
        }
      ],

      // 创建/修改/查看共用
      createForm: {
        type: 1,
        token_id: "",
        contract_address: "",
        total_supply: "",
        //min_deposit_amount: "",
        decimals: 0,
        gas_limit: "",
        extension: "",
        fee_token_id: "",
        can_transaction_confirms: 1,
        can_withdrawal_confirms: 1,

        api_key: "",
        ed25519_publickey: "",
        chain: "",
        chain_type: 0,
        address_regexp: "",
        memo_regexp: "",
        collect_address: "",
        need_memo: 0,
        collect_threshold: "",
        give_fee_value: "",
        min: "",
        max: "",
        suggest: "",
        auto_collect: 0,

      },

    };
  },
  created() {
  },
  methods: {
    pushToken() {
      this.loading = true;
      this.createForm.type = Number(this.tokenType);
      this.createForm.decimals = Number(this.createForm.decimals);
      this.createForm.gas_limit = String(this.createForm.gas_limit)
      this.createForm.total_supply = String(this.createForm.total_supply)
      this.createForm.can_transaction_confirms = Number(this.createForm.can_transaction_confirms);
      this.createForm.can_withdrawal_confirms = Number(this.createForm.can_withdrawal_confirms);
      this.createForm.chain_type = Number(this.createForm.chain_type);
      this.createForm.need_memo = Boolean(this.createForm.need_memo);
      this.createForm.collect_threshold = String(this.createForm.collect_threshold)
      this.createForm.address_regexp = String(this.createForm.address_regexp).trim()
      this.createForm.ed25519_publickey = String(this.createForm.ed25519_publickey).trim()
      this.createForm.api_key = String(this.createForm.api_key).trim()
      this.createForm.contract_address = String(this.createForm.contract_address).trim()
      this.createForm.memo_regexp = String(this.createForm.memo_regexp).trim()
      this.$axios.post("/api/v1/push_new_token", this.createForm).then(result => {
        this.loading = false;
        /*setTimeout(() => {
            this.loading = true;
        }, 200);*/

        if (result.code == 10000) {

          this.createForm.token_id = "";
          this.createForm.contract_address = "";
          this.createForm.decimals = 0;
          this.createForm.gas_limit = "";
          this.createForm.total_supply = "";
          this.createForm.extension = "";
          this.createForm.fee_token_id = "";

          this.createForm.api_key = "";
          this.createForm.ed25519_publickey = "";
          this.createForm.chain = "";
          this.createForm.chain_type = 0;
          this.createForm.address_regexp = "";
          this.createForm.memo_regexp = "";
          this.createForm.collect_address = "";
          this.createForm.need_memo = 0;
          this.createForm.collect_threshold = "";

          this.$Notice.success({
            title: this.$lang("新增成功"),
            duration: 2
          });
        } else {
          this.$Notice.error({
            title: this.$lang("新增失败"),
            duration: 2
          });
        }
      });
    },
  }
};
</script>
