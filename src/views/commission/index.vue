<template lang="pug">
Main.page-exchange
  Row.search(:gutter="15")
    Col(span="6")
      Input(:placeholder='$lang("交易所简称")' v-model="searchForm.exchangeName")
    Col(span="6")
      DatePicker(type="datetimerange", :placeholder='$lang("时间范围")' style="width: 100%", v-model="date")
    Col(span="6") &nbsp;
    Col(span="6" style="text-align:right")
      Button(size="large" type="primary" @click="search" icon="md-search" long) {{$lang('搜索')}}
  Table.user-table(:columns="columns", :data="listData", :loading="loadingTable")
  .page-pages
    ButtonGroup(v-if="hasNext || hasPrev")
      Button(type="primary" v-if="hasPrev && markId" @click="prev")
        Icon(type="ios-arrow-back")
        | {{$lang("上一页")}}
      Button(type="primary" v-else disabled)
        Icon(type="ios-arrow-back")
        | {{$lang("上一页")}}
      
      Button(type="primary"  @click="next" v-if="hasNext")
        | {{$lang("下一页")}}
        Icon(type="ios-arrow-forward")
      Button(type="primary"  disabled v-else)
        | {{$lang("下一页")}}
        Icon(type="ios-arrow-forward")
</template>
<script>
export default {
  data() {
    return {
      loadingTable: true,
      searchForm: {
        fromTime: 0,
        endTime: 0,
        exchangeName: "",
        pageSize: 20,
        fromId: 0,
        lastId: 0,
        next: true
      },
      hasNext: false,
      hasPrev: false,
      markId: 0,
      listData: [],
      date: [],
      columns: [
        {
          title: this.$lang("类型"),
          key: "brokerId",
          render: (h) => {
            return h("span", this.$lang("交易所"));
          }
        },
        {
          title: this.$lang("交易所简称"),
          key: "exchangeName"
        },
        {
          title: this.$lang("结算时间"),
          key: "clearTime",
          render: (h, p) => {
            return h("span", new Date(p.row.clearTime).format());
          }
        },
        {
          title: this.$lang("SaaS分佣"),
          key: "exchangeSassFeeRate"
        },
        {
          title: this.$lang("交易总量"),
          key: "tradingAmount"
        },
        {
          title: this.$lang("佣金总额"),
          key: "totalFee"
        },
        {
          title: this.$lang("BH分佣"),
          key: "sysFee"
        },
        {
          title: this.$lang("交易所佣金"),
          key: "exchangeFee"
        },
        {
          title: this.$lang("SaaS佣金"),
          key: "exchangeSaasFee"
        }
      ]
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    prev() {
      this.searchForm.next = false;
      this.loadData();
    },
    next() {
      this.searchForm.next = true;
      this.loadData();
    },
    search() {
      this.searchForm.next = true;
      this.fromId = 0;
      this.loadData();
    },
    loadData() {
      this.loadingTable = true;
      if (this.date.length) {
        this.searchForm.fromTime = new Date(this.date[0]).getTime() || 0;
        this.searchForm.endTime = new Date(this.date[1]).getTime() || 0;
      }

      this.$axios
        .post("/api/v1/saas_commission/query_commissions", this.searchForm)
        .then(result => {
          this.loadingTable = false;
          if (result.code === 0 && result.data.length) {
            if (!this.markId) {
              this.markId = result.data[0].id;
            }
            this.searchForm.fromId = result.data[0].id;
            this.searchForm.lastId = result.data[result.data.length - 1].id;
            if (this.markId != result.data[0].id) {
              this.hasPrev = true;
            } else {
              this.hasPrev = false;
            }
            if (result.data.length >= this.searchForm.pageSize) {
              this.hasNext = true;
            }
            this.listData = result.data ? result.data : [];
          }else{
            this.hasNext = false;
          }
        });
    }
  }
};
</script>