(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c90fe"],{5816:function(t,o,e){"use strict";e.r(o);var i=function(){var t=this,o=t._self._c;return o("div",[o("Card",{attrs:{"dis-hover":""}},[o("p",{staticStyle:{"padding-bottom":"20px","padding-top":"5px"},attrs:{slot:"title"},slot:"title"},[t._v("\n               　　监听wallet-admin日志\n     　　　　　　")]),o("Button",{attrs:{type:"primary"},on:{click:t.openlogs}},[t._v("开启日志")]),t._v("  \n                  "),o("Button",{attrs:{type:"error"},on:{click:t.stoplogs}},[t._v("关闭日志")]),o("br"),o("br"),o("div",{staticStyle:{height:"750px","overflow-y":"scroll",background:"#333",color:"#aaa",padding:"10px"},attrs:{id:"filelog-container"}},[o("div",{attrs:{id:"aa"}},[t._v(t._s(t.pullFileLogger))])])],1)],1)},n=[],l={data:function(){return{pullFileLogger:"",openlog:!1}},created:function(){},mounted:function(){clearInterval(this.timer),this.setTimer()},distroyed:function(){clearInterval(this.timer)},methods:{setTimer:function(){var t=this;this.timer=setInterval((function(){1==t.openlog&&t.getlogs()}),1e4)},openlogs:function(){this.openlog=!0,this.getlogs()},getlogs:function(){var t=this;this.$axios.get("/api/v1/getlogs").then((function(o){1e4==o.code?(t.$Notice.success({title:t.$lang("成功"),duration:2}),t.pullFileLogger+=o.data):t.$Notice.error({title:t.$lang("失败"),duration:2})}))},stoplogs:function(){var t=this;this.openlog=!1,this.$axios.get("/api/v1/stoplogs").then((function(o){t.loading=!1,1e4==o.code?(t.$Notice.success({title:t.$lang("成功"),duration:2}),t.pullFileLogger+=o.data):t.$Notice.error({title:t.$lang("失败"),duration:2})}))}}},r=l,s=e("2877"),a=Object(s["a"])(r,i,n,!1,null,null,null);o["default"]=a.exports}}]);