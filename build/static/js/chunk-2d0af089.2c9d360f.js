(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0af089"],{"0d32":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t._self._c;return e("Main",{staticClass:"page-exchange"},[e("Row",{staticClass:"search",attrs:{grtter:15}},[e("Col",{attrs:{span:"16"}},[e("Input",{attrs:{search:"",placeholder:t.$lang("请输入")+t.$lang("币种ID"),"enter-button":t.$lang("搜索")},on:{"on-search":t.loadData},model:{value:t.searchKeyword,callback:function(e){t.searchKeyword=e},expression:"searchKeyword"}})],1),e("Col",{attrs:{span:"4"}},[t._v(" ")]),e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"4"}},[e("Button",{attrs:{size:"large",type:"primary",ghost:"",icon:"md-add-circle"},on:{click:t.create}},[t._v(t._s(t.$lang("新增币种")))])],1)],1),e("Table",{staticClass:"user-table",attrs:{columns:t.columns,data:t.listData,loading:t.loadingTable}}),t.total>t.searchForm.page_size?e("div",{staticClass:"page-pages"},[e("Page",{attrs:{current:t.searchForm.current,total:t.total,pageSize:t.searchForm.page_size},on:{"update:current":function(e){return t.$set(t.searchForm,"current",e)},"on-change":t.loadData}})],1):t._e(),e("Modal",{staticClass:"page-exchange-win",attrs:{title:t.$lang("create"==t.nextType?"新增":"修改"),loading:t.loading},on:{"on-ok":t.doNext},model:{value:t.creatWinStatus,callback:function(e){t.creatWinStatus=e},expression:"creatWinStatus"}},[e("Form",{attrs:{model:t.createForm,"label-width":100}},[e("FormItem",{attrs:{label:t.$lang("ID")}},[e("Input",{attrs:{placeholder:"",disabled:""},model:{value:t.createForm.id,callback:function(e){t.$set(t.createForm,"id",e)},expression:"createForm.id"}})],1),e("FormItem",{attrs:{label:t.$lang("币种ID")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("币种ID")),disabled:"edit"==t.nextType},model:{value:t.createForm.token_id,callback:function(e){t.$set(t.createForm,"token_id",e)},expression:"createForm.token_id"}})],1),e("FormItem",{attrs:{label:t.$lang("合约地址")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("合约地址"))},model:{value:t.createForm.contract_address,callback:function(e){t.$set(t.createForm,"contract_address",e)},expression:"createForm.contract_address"}})],1),e("FormItem",{attrs:{label:t.$lang("精度位数")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("精度位数"))},model:{value:t.createForm.decimals,callback:function(e){t.$set(t.createForm,"decimals",e)},expression:"createForm.decimals"}})],1),e("FormItem",{attrs:{label:t.$lang("代币总量")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("代币总量"))},model:{value:t.createForm.total_supply,callback:function(e){t.$set(t.createForm,"total_supply",e)},expression:"createForm.total_supply"}})],1),e("FormItem",{attrs:{label:t.$lang("最小充值金额")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("最小充值金额"))},model:{value:t.createForm.min_deposit_amount,callback:function(e){t.$set(t.createForm,"min_deposit_amount",e)},expression:"createForm.min_deposit_amount"}})],1),e("FormItem",{attrs:{label:t.$lang("可交易确认数")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("可交易确认数"))},model:{value:t.createForm.can_transaction_confirms,callback:function(e){t.$set(t.createForm,"can_transaction_confirms",e)},expression:"createForm.can_transaction_confirms"}})],1),e("FormItem",{attrs:{label:t.$lang("可提现确认数")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("可提现确认数"))},model:{value:t.createForm.can_withdrawal_confirms,callback:function(e){t.$set(t.createForm,"can_withdrawal_confirms",e)},expression:"createForm.can_withdrawal_confirms"}})],1),e("FormItem",{attrs:{label:t.$lang("充值状态")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("充值状态"))},model:{value:t.createForm.enable_notify,callback:function(e){t.$set(t.createForm,"enable_notify",e)},expression:"createForm.enable_notify"}})],1),e("FormItem",{attrs:{label:t.$lang("提现状态")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("提现状态"))},model:{value:t.createForm.enable_withdrawal,callback:function(e){t.$set(t.createForm,"enable_withdrawal",e)},expression:"createForm.enable_withdrawal"}})],1),e("FormItem",{attrs:{label:t.$lang("币种状态")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("可提现确认数"))},model:{value:t.createForm.status,callback:function(e){t.$set(t.createForm,"status",e)},expression:"createForm.status"}})],1),e("FormItem",{attrs:{label:t.$lang("单位时间内最大提现订单数")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("单位时间内最大提现订单数"))},model:{value:t.createForm.max_near_withdrawal_cnt,callback:function(e){t.$set(t.createForm,"max_near_withdrawal_cnt",e)},expression:"createForm.max_near_withdrawal_cnt"}})],1),e("FormItem",{attrs:{label:t.$lang("单位时间内最大提现金额")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("单位时间内最大提现金额"))},model:{value:t.createForm.max_near_withdrawal_amount,callback:function(e){t.$set(t.createForm,"max_near_withdrawal_amount",e)},expression:"createForm.max_near_withdrawal_amount"}})],1),e("FormItem",{attrs:{label:t.$lang("是否预生成地址")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("是否预生成地址"))},model:{value:t.createForm.need_pre_generate_address,callback:function(e){t.$set(t.createForm,"need_pre_generate_address",e)},expression:"createForm.need_pre_generate_address"}})],1),e("FormItem",{attrs:{label:t.$lang("是否需要memo")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("是否需要memo"))},model:{value:t.createForm.need_memo,callback:function(e){t.$set(t.createForm,"need_memo",e)},expression:"createForm.need_memo"}})],1),e("FormItem",{attrs:{label:t.$lang("扩展字段")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("扩展字段"))},model:{value:t.createForm.extension,callback:function(e){t.$set(t.createForm,"extension",e)},expression:"createForm.extension"}})],1)],1)],1),e("Modal",{staticClass:"page-exchange-detail",attrs:{title:t.createForm.token_id},model:{value:t.detialWinSatus,callback:function(e){t.detialWinSatus=e},expression:"detialWinSatus"}},[e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("ID"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.id))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("币种ID"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.token_id))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("合约地址"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.contract_address))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("代币总量"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.total_supply))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("精度位数"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.decimals))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("最小充值金额"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.min_deposit_amount))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("可交易确认数"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.can_transaction_confirms))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("充值状态"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.enable_notify))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("提现状态"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.enable_withdrawal))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("币种状态"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.status))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("单位时间内最大提现订单数"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.max_near_withdrawal_cnt))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("单位时间内最大提现金额"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.max_near_withdrawal_amount))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("是否预生成地址"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.need_pre_generate_address))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("是否需要memo"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.need_memo))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("扩展字段"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.extension))])],1),e("template",{slot:"footer"},[e("Button",{attrs:{type:"primary",long:""},on:{click:function(e){t.detialWinSatus=!1}}},[t._v(t._s(t.$lang("确定")))])],1)],2),e("Modal",{attrs:{title:t.$lang("enable"==t.settingsType?"开启":"关闭")},on:{"on-ok":function(e){return t.settings(5)},"on-cancel":t.loadData},model:{value:t.settingsDepositStatus,callback:function(e){t.settingsDepositStatus=e},expression:"settingsDepositStatus"}},[e("Alert",[t._v(t._s(t.$lang("您确定执行此操作吗？")))]),e("Input",{attrs:{placeholder:t.$lang("请输入操作原因"),type:"textarea",rows:5},model:{value:t.settingsForm.remark,callback:function(e){t.$set(t.settingsForm,"remark",e)},expression:"settingsForm.remark"}})],1),e("Modal",{attrs:{title:t.$lang("enable"==t.settingsType?"开启":"关闭")},on:{"on-ok":function(e){return t.settings(6)},"on-cancel":t.loadData},model:{value:t.settingsWithdrawalStatus,callback:function(e){t.settingsWithdrawalStatus=e},expression:"settingsWithdrawalStatus"}},[e("Alert",[t._v(t._s(t.$lang("您确定执行此操作吗？")))]),e("Input",{attrs:{placeholder:t.$lang("请输入操作原因"),type:"textarea",rows:6},model:{value:t.settingsForm.remark,callback:function(e){t.$set(t.settingsForm,"remark",e)},expression:"settingsForm.remark"}})],1),e("Modal",{attrs:{title:t.$lang("enable"==t.settingsType?"下架":"上架")},on:{"on-ok":function(e){return t.settings(7)},"on-cancel":t.loadData},model:{value:t.settingsTokenStatus,callback:function(e){t.settingsTokenStatus=e},expression:"settingsTokenStatus"}},[e("Alert",[t._v(t._s(t.$lang("您确定执行此操作吗？")))]),e("Input",{attrs:{placeholder:t.$lang("请输入操作原因"),type:"textarea",rows:7},model:{value:t.settingsForm.remark,callback:function(e){t.$set(t.settingsForm,"remark",e)},expression:"settingsForm.remark"}})],1)],1)},n=[],s=(a("c5f6"),a("456d"),a("ac6a"),{data:function(){var t=this;return{loading:!0,loadingTable:!0,total:0,searchKeyword:"",searchForm:{current:1,page_size:20,token_id:""},listData:[],tokenTypeList:[{value:"1",label:"BTC"},{value:"2",label:"ETH"},{value:"3",label:"3"}],creatWinStatus:!1,detialWinSatus:!1,nextType:"",createForm:{id:"",token_id:"",contract_address:"",total_supply:"",min_deposit_amount:"",can_transaction_confirms:"",can_withdrawal_confirms:"",enable_notify:!1,enable_withdrawal:!1,status:0,decimals:0,"max_near_withådrawal_cnt":0,max_near_withdrawal_amount:0,need_pre_generate_address:!1,need_memo:!1,extension:"",remark:""},settingsType:"",settingsDepositStatus:!1,settingsWithdrawalStatus:!1,settingsTokenStatus:!1,settingsForm:{id:"",remark:""},columns:[{title:this.$lang("币种ID"),key:"token_id"},{title:this.$lang("最小充值金额"),key:"min_deposit_amount"},{title:this.$lang("可交易确认数"),key:"can_transaction_confirms"},{title:this.$lang("可提现确认数"),key:"can_withdrawal_confirms"},{title:this.$lang("合约地址"),key:"contract_address"},{title:this.$lang("精度位数"),key:"decimals"},{title:this.$lang("单位时间内最大提现订单数"),key:"max_near_withdrawal_cnt"},{title:this.$lang("单位时间内最大提现金额"),key:"max_near_withdrawal_amount"},{title:this.$lang("充值状态"),render:function(e,a){return e("iSwitch",{props:{value:a.row.enable_notify,"true-value":!0,"false-value":!1},on:{"on-change":function(e){t.settingsType=e?"enable":"disable",t.settingsDepositStatus=!0,a.row.remark=t.settingsForm.remark,t.settingsForm.remark="",Object.keys(t.createForm).forEach((function(e){return t.createForm[e]=""})),Object.assign(t.createForm,a.row)}}})}},{title:this.$lang("提现状态"),render:function(e,a){return e("iSwitch",{props:{value:a.row.enable_withdrawal,"true-value":!0,"false-value":!1},on:{"on-change":function(e){t.settingsType=e?"enable":"disable",t.settingsWithdrawalStatus=!0,a.row.remark=t.settingsForm.remark,t.settingsForm.remark="",Object.keys(t.createForm).forEach((function(e){return t.createForm[e]=""})),Object.assign(t.createForm,a.row)}}})}},{title:this.$lang("币种状态"),render:function(e,a){return e("iSwitch",{props:{value:a.row.status-1,"true-value":0,"false-value":1},on:{"on-change":function(e){t.settingsType=e?"enable":"disable",t.settingsTokenStatus=!0,a.row.remark=t.settingsForm.remark,t.settingsForm.remark="",Object.keys(t.createForm).forEach((function(e){return t.createForm[e]=""})),Object.assign(t.createForm,a.row)}}})}},{title:this.$lang("操作"),width:140,render:function(e,a){return e("div",[e("a",{on:{click:function(){t.detialWinSatus=!0,Object.assign(t.createForm,a.row)}}},t.$lang("详情")),e("span"," / "),e("a",{on:{click:function(){t.creatWinStatus=!0,t.nextType="edit",Object.keys(t.createForm).forEach((function(e){return t.createForm[e]=""})),Object.assign(t.createForm,a.row)}}},t.$lang("修改"))])}}]}},created:function(){this.loadData()},methods:{loadData:function(){var t=this;this.loadingTable=!0,this.searchForm.token_id=this.searchKeyword,this.$axios.get("/api/v1/tokens",{params:this.searchForm}).then((function(e){t.loadingTable=!1,1e4===e.code&&(t.listData=e.data?e.data:[],t.total=e.total)}))},create:function(){var t=this;Object.keys(this.createForm).forEach((function(e){return t.createForm[e]=""})),this.creatWinStatus=!0,this.nextType="create"},doNext:function(){var t=this;this.createForm.can_transaction_confirms=Number(this.createForm.can_transaction_confirms),this.createForm.can_withdrawal_confirms=Number(this.createForm.can_withdrawal_confirms),this.createForm.max_near_withdrawal_cnt=Number(this.createForm.max_near_withdrawal_cnt),this.createForm.decimals=Number(this.createForm.decimals),this.createForm.status=Number(this.createForm.status),"false"==this.createForm.enable_notify||"0"==this.createForm.enable_notify?this.createForm.enable_notify=!1:this.createForm.enable_notify=!0,"false"==this.createForm.enable_withdrawal||"0"==this.createForm.enable_withdrawal?this.createForm.enable_withdrawal=!1:this.createForm.enable_withdrawal=!0,"false"==this.createForm.need_pre_generate_address||"0"==this.createForm.need_pre_generate_address?this.createForm.need_pre_generate_address=!1:this.createForm.need_pre_generate_address=!0,"false"==this.createForm.need_memo||"0"==this.createForm.need_memo?this.createForm.need_memo=!1:this.createForm.need_memo=!0,this.createForm.total_supply=String(this.createForm.total_supply),this.createForm.min_deposit_amount=String(this.createForm.min_deposit_amount),"create"==this.nextType?this.$axios.post("/api/v1/create_token",this.createForm).then((function(e){t.loading=!1,setTimeout((function(){t.loading=!0}),200),1e4==e.code?(t.$Notice.success({title:t.$lang("新增成功"),duration:2}),t.creatWinStatus=!1):(t.$Notice.error({title:t.$lang("新增失败"),duration:2}),t.creatWinStatus=!1),t.loadData()})):(this.createForm.id=Number(this.createForm.id),this.$axios.put("/api/v1/update_token",this.createForm).then((function(e){t.loading=!1,setTimeout((function(){t.loading=!0}),200),1e4==e.code?(t.$Notice.success({title:t.$lang("修改成功"),duration:2}),t.creatWinStatus=!1):(t.$Notice.error({title:t.$lang("修改失败"),duration:2}),t.creatWinStatus=!1),t.loadData()})))},settings:function(t){var e=this;switch(this.createForm.id=Number(this.createForm.id),this.createForm.can_transaction_confirms=Number(this.createForm.can_transaction_confirms),this.createForm.can_withdrawal_confirms=Number(this.createForm.can_withdrawal_confirms),t){case 5:"enable"==this.settingsType?this.createForm.enable_notify=!0:this.createForm.enable_notify=!1,this.$axios.put("/api/v1/update_token",this.createForm).then((function(){return e.loadData()}));break;case 6:"enable"==this.settingsType?this.createForm.enable_withdrawal=!0:this.createForm.enable_withdrawal=!1,this.$axios.put("/api/v1/update_token",this.createForm).then((function(){return e.loadData()}));break;case 7:"enable"==this.settingsType?this.createForm.status=2:this.createForm.status=1,this.$axios.put("/api/v1/update_token",this.createForm).then((function(){return e.loadData()}));break;default:break}}}}),o=s,l=a("2877"),i=Object(l["a"])(o,r,n,!1,null,null,null);e["default"]=i.exports}}]);