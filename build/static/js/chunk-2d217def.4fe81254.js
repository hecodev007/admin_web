(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d217def"],{c925:function(t,e,a){"use strict";a.r(e);a("7f7f");var n=function(){var t=this,e=t._self._c;return e("Main",{staticClass:"page-exchange"},[e("Row",{staticClass:"search",attrs:{grtter:15}},[e("Col",{attrs:{span:"16"}},[e("Input",{attrs:{search:"",placeholder:t.$lang("请输入")+t.$lang("券商简称"),"enter-button":t.$lang("搜索")},on:{"on-search":t.loadData},model:{value:t.searchKeyword,callback:function(e){t.searchKeyword=e},expression:"searchKeyword"}})],1),e("Col",{attrs:{span:"4"}},[t._v(" ")]),e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"4"}},[e("Button",{attrs:{size:"large",type:"primary",ghost:"",icon:"md-add-circle"},on:{click:t.create}},[t._v(t._s(t.$lang("创建券商")))])],1)],1),e("Table",{staticClass:"user-table",attrs:{columns:t.columns,data:t.listData,loading:t.loadingTable}}),t.total>t.searchForm.pageSize?e("div",{staticClass:"page-pages"},[e("Page",{attrs:{current:t.searchForm.current,total:t.total,pageSize:t.searchForm.pageSize},on:{"update:current":function(e){return t.$set(t.searchForm,"current",e)},"on-change":t.loadData}})],1):t._e(),e("Modal",{staticClass:"page-exchange-win",attrs:{title:t.$lang("create"==t.nextType?"新建":"修改"),loading:t.loading},on:{"on-ok":t.doCreate,"on-visible-change":t.clear},model:{value:t.creatWinStatus,callback:function(e){t.creatWinStatus=e},expression:"creatWinStatus"}},[e("Form",{attrs:{model:t.createForm,"label-width":100}},[e("FormItem",{attrs:{label:t.$lang("券商简称")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("券商简称")),disabled:"edit"==t.nextType},model:{value:t.createForm.name,callback:function(e){t.$set(t.createForm,"name",e)},expression:"createForm.name"}})],1),e("FormItem",{attrs:{label:t.$lang("公司名称")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("公司名称"))},model:{value:t.createForm.company,callback:function(e){t.$set(t.createForm,"company",e)},expression:"createForm.company"}})],1),e("FormItem",{attrs:{label:t.$lang("邮箱账号")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("邮箱账号")),disabled:"edit"==t.nextType},model:{value:t.createForm.email,callback:function(e){t.$set(t.createForm,"email",e)},expression:"createForm.email"}})],1),e("FormItem",{attrs:{label:t.$lang("联系人")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("联系人"))},model:{value:t.createForm.contact,callback:function(e){t.$set(t.createForm,"contact",e)},expression:"createForm.contact"}})],1),e("FormItem",{attrs:{label:t.$lang("联系电话")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("联系电话"))},model:{value:t.createForm.phone,callback:function(e){t.$set(t.createForm,"phone",e)},expression:"createForm.phone"}})],1),e("FormItem",{attrs:{label:t.$lang("其他信息")}},[e("Input",{attrs:{placeholder:t.$lang("请输入",t.$lang("其他信息"))},model:{value:t.createForm.basicInfo,callback:function(e){t.$set(t.createForm,"basicInfo",e)},expression:"createForm.basicInfo"}})],1)],1)],1),e("Modal",{staticClass:"page-exchange-detail",attrs:{title:t.createForm.name},on:{"on-visible-change":t.clear},model:{value:t.detialWinSatus,callback:function(e){t.detialWinSatus=e},expression:"detialWinSatus"}},[e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("券商简称"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.name))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("公司名称"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.company))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("邮箱账号"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.email))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("联系人"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.contact))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("联系电话"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.phone))])],1),e("Row",[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v(t._s(t.$lang("其他信息"))+"：")]),e("Col",{attrs:{span:"14"}},[t._v(t._s(t.createForm.basicInfo))])],1),e("template",{slot:"footer"},[e("Button",{attrs:{type:"primary",long:"",size:"large"},on:{click:function(e){t.detialWinSatus=!1}}},[t._v(t._s(t.$lang("确定")))])],1)],2),e("Modal",{attrs:{title:t.$lang("enable"==t.settingsType?"启用":"禁用")},on:{"on-ok":t.settings,"on-cancel":t.loadData},model:{value:t.settingsWinStatus,callback:function(e){t.settingsWinStatus=e},expression:"settingsWinStatus"}},[e("Alert",[t._v(t._s(t.$lang("您确定执行此操作吗？")))]),e("Input",{attrs:{placeholder:t.$lang("请输入操作原因"),type:"textarea",rows:4},model:{value:t.createForm.input,callback:function(e){t.$set(t.createForm,"input",e)},expression:"createForm.input"}})],1)],1)},r=[],s=(a("456d"),a("ac6a"),{data:function(){var t=this;return{loading:!0,loadingTable:!0,total:0,searchKeyword:"",searchForm:{current:1,brokerName:"",brokerId:"",pageSize:20},listData:[],creatWinStatus:!1,detialWinSatus:!1,nextType:"",createForm:{name:"",saasFeeRate:"",company:"",email:"",contact:"",phone:"",basicInfo:""},settingsType:"",settingsWinStatus:!1,settingsForm:{id:"",basicInfo:""},columns:[{title:this.$lang("券商ID"),key:"brokerId"},{title:this.$lang("券商简称"),key:"name"},{title:this.$lang("DNS配置"),key:"dnsSetting",render:function(e,a){return 2==a.row.dnsSetting?e("span",t.$lang("已完成")):e("a",{on:{click:function(){t.$axios.post("/api/v1/broker/send_set_password_email ",{id:a.row.id}).then((function(e){0==e.code&&t.$Notice.success({title:t.$lang("已发送")})}))}}},t.$lang("发邮件"))}},{title:this.$lang("保证金"),render:function(e,a){return e("span",t.$lang(a.row.payEarnest?"已缴纳":"未缴纳"))}},{title:this.$lang("启用状态"),render:function(e,a){return e("iSwitch",{props:{value:a.row.enabled},on:{"on-change":function(e){t.settingsType=e?"enable":"disable",t.settingsWinStatus=!0,t.settingsForm.id=a.row.id,t.settingsForm.remark=""}}})}},{title:this.$lang("操作"),width:140,render:function(e,a){return e("div",[e("a",{on:{click:function(){t.detialWinSatus=!0,Object.assign(t.createForm,a.row)}}},t.$lang("详情")),e("span"," / "),e("a",{on:{click:function(){t.creatWinStatus=!0,t.nextType="edit",Object.assign(t.createForm,a.row)}}},t.$lang("修改"))])}}]}},created:function(){this.loadData()},methods:{loadData:function(){var t=this;this.loadingTable=!0,this.searchForm.brokerName=/\D/.test(this.searchKeyword)?this.searchKeyword:"",this.searchForm.brokerId=/\D/.test(this.searchKeyword)?"":1*this.searchKeyword,this.$axios.post("/api/v1/broker/query_broker",this.searchForm).then((function(e){t.loadingTable=!1,0===e.code&&(t.listData=e.data.list?e.data.list:[],t.total=e.data.total)}))},create:function(){this.creatWinStatus=!0,this.nextType="create"},doCreate:function(){var t=this;this.createForm.email;this.$axios.post("create"==this.nextType?"/api/v1/broker":"/api/v1/broker/edit",this.createForm).then((function(e){t.loading=!1,setTimeout((function(){t.loading=!0}),200),0===e.code&&"create"==t.nextType&&t.$Notice.success({title:t.$lang("创建成功"),duration:0}),0==e.code&&(t.creatWinStatus=!1),t.loadData()}))},clear:function(t){var e=this;t||setTimeout((function(){return Object.keys(e.createForm).forEach((function(t){return e.createForm[t]=""}))}),200)},settings:function(){var t=this;this.$axios.post("enable"==this.settingsType?"/api/v1/broker/enable":"/api/v1/broker/disable",this.settingsForm).then((function(){return t.loadData()}))}}}),o=s,l=a("2877"),i=Object(l["a"])(o,n,r,!1,null,null,null);e["default"]=i.exports}}]);