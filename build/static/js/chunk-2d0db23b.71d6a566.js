(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0db23b"],{"6f1f":function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t._self._c;return e("Main",{staticClass:"page-exchange"},[e("Row",{staticClass:"search",attrs:{grtter:15}},[e("Col",{attrs:{span:"16"}},[e("Input",{attrs:{search:"",placeholder:t.$lang("请输入")+t.$lang("币种ID"),"enter-button":t.$lang("搜索")},on:{"on-search":t.loadData},model:{value:t.searchKeyword,callback:function(e){t.searchKeyword=e},expression:"searchKeyword"}})],1),e("Col",{attrs:{span:"4"}},[t._v(" ")]),e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"4"}},[e("Button",{attrs:{size:"large",type:"primary",ghost:"",icon:"md-add-circle"},on:{click:t.create}},[t._v(t._s(t.$lang("新增币种")))])],1)],1),e("Table",{staticClass:"user-table",attrs:{columns:t.columns,data:t.listData,loading:t.loadingTable}}),t.total>t.searchForm.page_size?e("div",{staticClass:"page-pages"},[e("Page",{attrs:{current:t.searchForm.current,total:t.total,pageSize:t.searchForm.page_size},on:{"update:current":function(e){return t.$set(t.searchForm,"current",e)},"on-change":t.loadData}})],1):t._e(),e("Modal",{staticClass:"page-exchange-win",attrs:{title:t.$lang("create"==t.nextType?"新增":"修改"),loading:t.loading},on:{"on-ok":t.doNext},model:{value:t.creatWinStatus,callback:function(e){t.creatWinStatus=e},expression:"creatWinStatus"}},[e("Form",{attrs:{model:t.createForm,"label-width":100}},[e("FormItem",{attrs:{label:t.$lang("ID")}},[e("Input",{attrs:{placeholder:"",disabled:""},model:{value:t.createForm.id,callback:function(e){t.$set(t.createForm,"id",e)},expression:"createForm.id"}})],1),e("FormItem",{attrs:{label:t.$lang("币种ID")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("币种ID")),disabled:"edit"==t.nextType},model:{value:t.createForm.token_id,callback:function(e){t.$set(t.createForm,"token_id",e)},expression:"createForm.token_id"}})],1),e("FormItem",{attrs:{label:t.$lang("逻辑类型")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("逻辑类型"))},model:{value:t.createForm.logic_type,callback:function(e){t.$set(t.createForm,"logic_type",e)},expression:"createForm.logic_type"}})],1),e("FormItem",{attrs:{label:t.$lang("类型")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("类型"))},model:{value:t.createForm.type,callback:function(e){t.$set(t.createForm,"type",e)},expression:"createForm.type"}})],1),e("FormItem",{attrs:{label:t.$lang("基础手续费阈值")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("基础手续费阈值"))},model:{value:t.createForm.give_fee_threshold,callback:function(e){t.$set(t.createForm,"give_fee_threshold",e)},expression:"createForm.give_fee_threshold"}})],1),e("FormItem",{attrs:{label:t.$lang("基础手续费")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("基础手续费"))},model:{value:t.createForm.give_fee_value,callback:function(e){t.$set(t.createForm,"give_fee_value",e)},expression:"createForm.give_fee_value"}})],1),e("FormItem",{attrs:{label:t.$lang("归集阈值")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("归集阈值"))},model:{value:t.createForm.collect_threshold,callback:function(e){t.$set(t.createForm,"collect_threshold",e)},expression:"createForm.collect_threshold"}})],1),e("FormItem",{attrs:{label:t.$lang("归集保留")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("归集保留"))},model:{value:t.createForm.collect_remain,callback:function(e){t.$set(t.createForm,"collect_remain",e)},expression:"createForm.collect_remain"}})],1),e("FormItem",{attrs:{label:t.$lang("自动归集时间间隔")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("自动归集时间间隔"))},model:{value:t.createForm.collect_interval,callback:function(e){t.$set(t.createForm,"collect_interval",e)},expression:"createForm.collect_interval"}})],1),e("FormItem",{attrs:{label:t.$lang("归集类型")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("归集类型"))},model:{value:t.createForm.collect_type,callback:function(e){t.$set(t.createForm,"collect_type",e)},expression:"createForm.collect_type"}})],1)],1)],1),e("Modal",{staticClass:"page-exchange-detail",attrs:{title:t.createForm.token_id},model:{value:t.detialWinSatus,callback:function(e){t.detialWinSatus=e},expression:"detialWinSatus"}},[e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("ID"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.id))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("币种ID"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.token_id))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("逻辑类型"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.logic_type))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("类型"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.type))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("基础手续费阈值"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.give_fee_threshold))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("基础手续费"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.give_fee_value))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("归集阈值"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.collect_threshold))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("归集保留"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.collect_remain))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("自动归集时间间隔"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.collect_interval))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("归集类型"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.collect_type))])],1),e("template",{slot:"footer"},[e("Button",{attrs:{type:"primary",long:""},on:{click:function(e){t.detialWinSatus=!1}}},[t._v(t._s(t.$lang("确定")))])],1)],2)],1)},r=[],o=(a("c5f6"),a("456d"),a("ac6a"),{data:function(){var t=this;return{loading:!0,loadingTable:!0,total:0,searchKeyword:"",searchForm:{current:1,page_size:20,token_id:""},listData:[],tokenTypeList:[{value:"1",label:"BTC"},{value:"2",label:"ETH"},{value:"3",label:"3"}],creatWinStatus:!1,detialWinSatus:!1,nextType:"",createForm:{id:"",token_id:"",type:"",logic_type:"",give_fee_threshold:"",give_fee_value:"",collect_threshold:"",collect_remain:"",redeem_address:"",collect_interval:0,CollectType:0},columns:[{title:this.$lang("币种ID"),key:"token_id"},{title:this.$lang("逻辑类型"),key:"logic_type"},{title:this.$lang("类型"),key:"type"},{title:this.$lang("基础手续费阈值"),key:"give_fee_threshold"},{title:this.$lang("基础手续费"),key:"give_fee_value"},{title:this.$lang("归集阈值"),key:"collect_threshold"},{title:this.$lang("归集保留"),key:"collect_remain"},{title:this.$lang("自动归集时间间隔"),key:"collect_interval"},{title:this.$lang("归集类型"),key:"collect_type"},{title:this.$lang("操作"),width:140,render:function(e,a){return e("div",[e("a",{on:{click:function(){t.detialWinSatus=!0,Object.assign(t.createForm,a.row)}}},t.$lang("详情")),e("span"," / "),e("a",{on:{click:function(){t.creatWinStatus=!0,t.nextType="edit",Object.assign(t.createForm,a.row)}}},t.$lang("修改"))])}}]}},created:function(){this.loadData()},methods:{loadData:function(){var t=this;this.loadingTable=!0,this.searchForm.token_id=this.searchKeyword,this.$axios.get("/api/v1/token_details",{params:this.searchForm}).then((function(e){t.loadingTable=!1,1e4===e.code&&(t.listData=e.data?e.data:[],t.total=e.total)}))},create:function(){var t=this;Object.keys(this.createForm).forEach((function(e){return t.createForm[e]=""})),this.creatWinStatus=!0,this.nextType="create"},doNext:function(){var t=this;this.createForm.logic_type=Number(this.createForm.logic_type),this.createForm.type=Number(this.createForm.type),this.createForm.collect_interval=Number(this.createForm.collect_interval),this.createForm.collect_type=Number(this.createForm.collect_type),"create"==this.nextType?this.$axios.post("/api/v1/create_token_details",this.createForm).then((function(e){t.loading=!1,setTimeout((function(){t.loading=!0}),200),1e4==e.code?(t.$Notice.success({title:t.$lang("新增成功"),duration:2}),t.creatWinStatus=!1):(t.$Notice.error({title:t.$lang("新增失败"),duration:2}),t.creatWinStatus=!1),t.loadData()})):(this.createForm.id=Number(this.createForm.id),this.$axios.put("/api/v1/update_token_details",this.createForm).then((function(e){t.loading=!1,setTimeout((function(){t.loading=!0}),200),1e4==e.code?(t.$Notice.success({title:t.$lang("修改成功"),duration:2}),t.creatWinStatus=!1):(t.$Notice.error({title:t.$lang("修改失败"),duration:2}),t.creatWinStatus=!1),t.loadData()})))}}}),n=o,s=a("2877"),c=Object(s["a"])(n,l,r,!1,null,null,null);e["default"]=c.exports}}]);