<template lang="pug">
  Main.page-exchange
    Row.search(:grtter="15")
      Col(span="16")
          Select(v-model="searchKeyword", :placeholder="$lang('请选择')+$lang('币种ID')", :clearable="true")
              Option(v-for="item in tokenIds" :key="item" :value="item") {{item}}
      Col(span="4")
          Button(type="primary" @click="loadData") {{$lang("搜索")}}
      Col(span="4" style="text-align:right")
        Button(size="large" type="primary" ghost @click="create" icon="md-add-circle") {{$lang("新增币种")}}
    Table.user-table(:columns="columns", :data="listData", :loading="loadingTable")
    .page-pages(v-if="total>searchForm.page_size")
      Page(:current.sync="searchForm.current", :total="total", :pageSize="searchForm.page_size" @on-change="loadData")

    // 新增币种
    Modal.page-exchange-win(v-model="creatWinStatus", , :title="$lang(nextType =='create' ? '新增':'修改')" @on-ok="doNext" :loading="loading")
      Form(:model='createForm', :label-width='100')
        FormItem(:label='$lang("ID")')
          Input(v-model='createForm.id', , placeholder, disabled)
        FormItem(:label='$lang("币种ID")')
          Input(v-model='createForm.token_id', , :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
        //- FormItem(:label='$lang("币种类型")')
        //-     <Select v-model="tokenTypeList" style="width:200px">
        //-       <Option v-for="item in tokenTypeList" :value="item.value" :key="item.value">{{ item.value }}</Option>
        //-     </Select>
        FormItem(:label='$lang("合约地址")')
          Input(v-model='createForm.contract_address', , :placeholder="$lang('请输入',$lang('合约地址'))")
        FormItem(:label='$lang("精度位数")')
          Input(v-model='createForm.decimals', , :placeholder="$lang('请输入',$lang('精度位数'))")
        FormItem(:label='$lang("代币总量")')
          Input(v-model='createForm.total_supply', , :placeholder="$lang('请输入',$lang('代币总量'))")
        FormItem(:label='$lang("最小充值金额")')
          Input(v-model='createForm.min_deposit_amount', , :placeholder="$lang('请输入',$lang('最小充值金额'))")
        FormItem(:label='$lang("可交易确认数")')
          Input(v-model='createForm.can_transaction_confirms', , :placeholder="$lang('请输入',$lang('可交易确认数'))")
        FormItem(:label='$lang("可提现确认数")')
          Input(v-model='createForm.can_withdrawal_confirms', , :placeholder="$lang('请输入',$lang('可提现确认数'))")
        FormItem(:label='$lang("充值状态")')
          iSwitch(v-model="createForm.enable_notify")
        FormItem(:label='$lang("提现状态")')
          iSwitch(v-model="createForm.enable_withdrawal")
        FormItem(:label='$lang("币种状态")')
          iSwitch(v-model="createForm.status")
        FormItem(:label='$lang("单位时间内最大提现订单数")')
          Input(v-model='createForm.max_near_withdrawal_cnt', , :placeholder="$lang('请输入',$lang('单位时间内最大提现订单数'))")
        FormItem(:label='$lang("单位时间内最大提现金额")')
          Input(v-model='createForm.max_near_withdrawal_amount', , :placeholder="$lang('请输入',$lang('单位时间内最大提现金额'))")
        FormItem(:label='$lang("是否预生成地址")')
          Input(v-model='createForm.need_pre_generate_address', , :placeholder="$lang('请输入',$lang('是否预生成地址'))")
        FormItem(:label='$lang("是否需要memo")')
          Input(v-model='createForm.need_memo', , :placeholder="$lang('请输入',$lang('是否需要memo'))")
        FormItem(:label='$lang("扩展字段")')
          Input(v-model='createForm.extension', , :placeholder="$lang('请输入',$lang('扩展字段'))")

    // 查看币种信息
    Modal.page-exchange-detail(v-model="detialWinSatus", :title="createForm.token_id")
      Row
        Col(span="10" style="text-align:right") {{$lang("ID")}}：
        Col(span="14") {{createForm.id}}
      Row
        Col(span="10" style="text-align:right") {{$lang("币种ID")}}：
        Col(span="14") {{createForm.token_id}}
      Row
        Col(span="10" style="text-align:right") {{$lang("合约地址")}}：
        Col(span="14") {{createForm.contract_address}}
      Row
        Col(span="10" style="text-align:right") {{$lang("代币总量")}}：
        Col(span="14") {{createForm.total_supply}}
      Row
        Col(span="10" style="text-align:right") {{$lang("精度位数")}}：
        Col(span="14") {{createForm.decimals}}
      Row
        Col(span="10" style="text-align:right") {{$lang("最小充值金额")}}：
        Col(span="14") {{createForm.min_deposit_amount}}
      Row
        Col(span="10" style="text-align:right") {{$lang("可交易确认数")}}：
        Col(span="14") {{createForm.can_transaction_confirms}}
      Row
        Col(span="10" style="text-align:right") {{$lang("充值状态")}}：
        Col(span="14") {{createForm.enable_notify}}
      Row
        Col(span="10" style="text-align:right") {{$lang("提现状态")}}：
        Col(span="14") {{createForm.enable_withdrawal}}
      Row
        Col(span="10" style="text-align:right") {{$lang("币种状态")}}：
        Col(span="14") {{createForm.status}}
      Row
        Col(span="10" style="text-align:right") {{$lang("单位时间内最大提现订单数")}}：
        Col(span="14") {{createForm.max_near_withdrawal_cnt}}
      Row
        Col(span="10" style="text-align:right") {{$lang("单位时间内最大提现金额")}}：
        Col(span="14") {{createForm.max_near_withdrawal_amount}}
      Row
        Col(span="10" style="text-align:right") {{$lang("是否预生成地址")}}：
        Col(span="14") {{createForm.need_pre_generate_address}}
      Row
        Col(span="10" style="text-align:right") {{$lang("是否需要memo")}}：
        Col(span="14") {{createForm.need_memo}}
      Row
        Col(span="10" style="text-align:right") {{$lang("扩展字段")}}：
        Col(span="14") {{createForm.extension}}


      template(slot="footer")
        Button(type="primary" long @click="detialWinSatus=false") {{$lang("确定")}}

    // 状态开关
    Modal(v-model="settingsDepositStatus", :title="$lang(settingsType=='enable' ? '开启' : '关闭')" @on-ok="settings(5)" @on-cancel="loadData")
      Alert {{$lang("您确定执行此操作吗？")}}
      Input(v-model='settingsForm.remark', :placeholder="$lang('请输入操作原因')", type="textarea", :rows="5")
    Modal(v-model="settingsWithdrawalStatus", :title="$lang(settingsType=='enable' ? '开启' : '关闭')" @on-ok="settings(6)" @on-cancel="loadData")
      Alert {{$lang("您确定执行此操作吗？")}}
      Input(v-model='settingsForm.remark', :placeholder="$lang('请输入操作原因')", type="textarea", :rows="6")
    Modal(v-model="settingsTokenStatus", :title="$lang(settingsType=='enable' ? '下架' : '上架')" @on-ok="settings(7)" @on-cancel="loadData")
      Alert {{$lang("您确定执行此操作吗？")}}
      Input(v-model='settingsForm.remark', :placeholder="$lang('请输入操作原因')", type="textarea", :rows="7")

</template>
<script>
export default {
  data() {
    return {
      loading: true,
      loadingTable: true,
      total: 0,
      // 搜索关键字，包含非数字的字符串，处理为交易所简称
      searchKeyword: "",
      searchForm: {
        current: 1,
        page_size: 20,
        token_id: ""
      },
      listData: [],
      tokenTypeList: [
        {
          value: '1',
          label: 'BTC'
        },
        {
          value: '2',
          label: 'ETH'
        },
        {
          value: '3',
          label: '3'
        },
      ],

      creatWinStatus: false,
      detialWinSatus: false,
      // create创建 / edit修改
      nextType: "",
      // 创建/修改/查看共用
      createForm: {
        id: "",
        token_id: "",
        contract_address: "",

        total_supply: "",
        min_deposit_amount: "",
        can_transaction_confirms: "",
        can_withdrawal_confirms: "",
        enable_notify: false,
        enable_withdrawal: false,
        status: 0,
        decimals: 0,
        max_near_withådrawal_cnt: 0,
        max_near_withdrawal_amount: 0,
        need_pre_generate_address: false,
        need_memo: false,
        extension: "",
        remark: ""
      },
      // enable开启 / disable关闭
      settingsType: "",
      settingsDepositStatus: false,
      settingsWithdrawalStatus: false,
      settingsTokenStatus: false,
      settingsForm: {
        id: "",
        remark: ""
      },
      columns: [
        {
          title: this.$lang("币种ID"),
          key: "token_id"
        },
        {
          title: this.$lang("最小充值金额"),
          key: "min_deposit_amount"
        },
        {
          title: this.$lang("可交易确认数"),
          key: "can_transaction_confirms"
        },
        {
          title: this.$lang("可提现确认数"),
          key: "can_withdrawal_confirms"
        },
        {
          title: this.$lang("合约地址"),
          key: "contract_address"
        },
        {
          title: this.$lang("精度位数"),
          key: "decimals"
        },
        {
          title: this.$lang("单位时间内最大提现订单数"),
          key: "max_near_withdrawal_cnt"
        },
        {
          title: this.$lang("单位时间内最大提现金额"),
          key: "max_near_withdrawal_amount"
        },

        {
          title: this.$lang("充值状态"),
          render: (h, params) => {
            return h("iSwitch", {
              props: {
                value: params.row.enable_notify,
                "true-value": true,
                "false-value": false
              },
              on: {
                "on-change": status => {
                  if (status) {
                    this.settingsType = "enable";
                  } else {
                    this.settingsType = "disable";
                  }
                  this.settingsDepositStatus = true;
                  params.row.remark = this.settingsForm.remark;
                  this.settingsForm.remark = "";
                  Object.keys(this.createForm).forEach(el => (this.createForm[el] = ""));
                  Object.assign(this.createForm, params.row);
                }
              }
            });
          }
        },
        {
          title: this.$lang("提现状态"),
          render: (h, params) => {
            return h("iSwitch", {
              props: {
                value: params.row.enable_withdrawal,
                "true-value": true,
                "false-value": false
              },
              on: {
                "on-change": status => {
                  if (status) {
                    this.settingsType = "enable";
                  } else {
                    this.settingsType = "disable";
                  }
                  this.settingsWithdrawalStatus = true;
                  params.row.remark = this.settingsForm.remark;
                  this.settingsForm.remark = "";
                  Object.keys(this.createForm).forEach(el => (this.createForm[el] = ""));
                  Object.assign(this.createForm, params.row);
                }
              }
            });
          }
        },
        {
          title: this.$lang("币种状态"),
          render: (h, params) => {
            return h("iSwitch", {
              props: {
                value: params.row.status - 1,
                "true-value": 0,
                "false-value": 1
              },
              on: {
                "on-change": status => {
                  if (status) {
                    this.settingsType = "enable";
                  } else {
                    this.settingsType = "disable";
                  }
                  this.settingsTokenStatus = true;
                  params.row.remark = this.settingsForm.remark;
                  this.settingsForm.remark = "";
                  Object.keys(this.createForm).forEach(el => (this.createForm[el] = ""));
                  Object.assign(this.createForm, params.row);
                }
              }
            });
          }
        },
        {
          title: this.$lang("操作"),
          width: 140,
          render: (h, params) => {
            return h("div", [
              h(
                  "a",
                  {
                    on: {
                      click: () => {
                        this.detialWinSatus = true;
                        Object.assign(this.createForm, params.row);
                      }
                    }
                  },
                  this.$lang("详情")
              ),
              h("span", " / "),
              h(
                  "a",
                  {
                    on: {
                      click: () => {
                        this.creatWinStatus = true;
                        this.nextType = "edit";
                        Object.keys(this.createForm).forEach(el => (this.createForm[el] = ""));
                        Object.assign(this.createForm, params.row);
                      }
                    }
                  },
                  this.$lang("修改")
              )
            ]);
          }
        }
      ],
      tokenIds: []
    };
  },
  created() {
    this.loadData();

  },
  methods: {
    loadData() {
      this.loadingTable = true;
      this.searchForm.token_id = this.searchKeyword;
      this.$axios.get("/api/v1/tokens", {params: this.searchForm}).then(result => {
        this.loadingTable = false;
        if (result.code === 10000) {
          this.listData = result.data ? result.data : [];
          this.total = result.total;
          let tokenIds = {}
          this.listData.forEach(el => {
            tokenIds[el.token_id] = el.token_id
          });
          if (this.tokenIds.length === 0){
            this.tokenIds = Object.keys(tokenIds).sort((a, b) => a.localeCompare(b))
          }
        }
      });
      // this.$axios.get("/api/v1/token_types", null).then(result => {
      //   this.loadingTable = false;
      //   if (result.code === 10000) {
      //     this.listData = result.data ? result.data : [];
      //     this.total = result.total;
      //   }
      // });
    },
    create() {
      Object.keys(this.createForm).forEach(el => (this.createForm[el] = ""));
      this.creatWinStatus = true;
      this.nextType = "create";
    },
    doNext() {
      this.createForm.can_transaction_confirms = Number(this.createForm.can_transaction_confirms);
      this.createForm.can_withdrawal_confirms = Number(this.createForm.can_withdrawal_confirms);
      this.createForm.max_near_withdrawal_cnt = Number(this.createForm.max_near_withdrawal_cnt);
      this.createForm.decimals = Number(this.createForm.decimals);
      this.createForm.status = Number(this.createForm.status);
      if (this.createForm.enable_notify == "false" || this.createForm.enable_notify == "0")
        this.createForm.enable_notify = false;
      else
        this.createForm.enable_notify = true;
      if (this.createForm.enable_withdrawal == "false" || this.createForm.enable_withdrawal == "0")
        this.createForm.enable_withdrawal = false;
      else
        this.createForm.enable_withdrawal = true;
      if (this.createForm.need_pre_generate_address == "false" || this.createForm.need_pre_generate_address == "0")
        this.createForm.need_pre_generate_address = false;
      else
        this.createForm.need_pre_generate_address = true;
      if (this.createForm.need_memo == "false" || this.createForm.need_memo == "0")
        this.createForm.need_memo = false;
      else
        this.createForm.need_memo = true;
      this.createForm.total_supply = String(this.createForm.total_supply)
      this.createForm.min_deposit_amount = String(this.createForm.min_deposit_amount)
      if (this.nextType == "create") {
        this.$axios.post("/api/v1/create_token", this.createForm).then(result => {
          this.loading = false;
          setTimeout(() => {
            this.loading = true;
          }, 200);

          if (result.code == 10000) {
            this.$Notice.success({
              title: this.$lang("新增成功"),
              duration: 2
            });
            this.creatWinStatus = false;
          } else {
            this.$Notice.error({
              title: this.$lang("新增失败"),
              duration: 2
            });
            this.creatWinStatus = false;
          }
          this.loadData();
        });
      } else {
        this.createForm.id = Number(this.createForm.id);
        this.$axios.put("/api/v1/update_token", this.createForm).then(result => {
          this.loading = false;
          setTimeout(() => {
            this.loading = true;
          }, 200);

          if (result.code == 10000) {
            this.$Notice.success({
              title: this.$lang("修改成功"),
              duration: 2
            });
            this.creatWinStatus = false;
          } else {
            this.$Notice.error({
              title: this.$lang("修改失败"),
              duration: 2
            });
            this.creatWinStatus = false;
          }
          this.loadData();
        });
      }
    },
    settings(row) {
      // Object.keys(this.createForm).forEach(el => (this.createForm[el] = ""));
      // Object.assign(this.createForm, row);
      this.createForm.id = Number(this.createForm.id);
      this.createForm.can_transaction_confirms = Number(this.createForm.can_transaction_confirms);
      this.createForm.can_withdrawal_confirms = Number(this.createForm.can_withdrawal_confirms);

      switch (row) {
        case 5:
          if (this.settingsType == 'enable') {
            this.createForm.enable_notify = true
          } else {
            this.createForm.enable_notify = false
          }
          this.$axios.put("/api/v1/update_token", this.createForm).then(() => this.loadData());
          break;
        case 6:
          if (this.settingsType == 'enable') {
            this.createForm.enable_withdrawal = true
          } else {
            this.createForm.enable_withdrawal = false
          }
          this.$axios.put("/api/v1/update_token", this.createForm).then(() => this.loadData());
          break;
        case 7:
          if (this.settingsType == 'enable') {
            this.createForm.status = 2
          } else {
            this.createForm.status = 1
          }
          this.$axios.put("/api/v1/update_token", this.createForm).then(() => this.loadData());
          break;
        default:
          break;
      }
    }
  }
};
</script>
