<template lang="pug">
Main.page-exchange
    tables(ref="tables",searchable, :addable="addable", :deleteable="deleteable",:customInputable="customInputable", customInputTip="输入统计天数(默认10天)", :loading="loadingTable", :search-place="top",v-model="tableData", :columns="columns", :customTokenIds="customTokenIds", :chainIds="chainIds",
      :searchOptions="searchOptions", @on-search="handleSearch" , @on-CustomInput="handleCustomInput" @on-chain="handleChain") )
    Row
        Col(span="12")
            Button(style={margin: '10px 0'} type="primary" @click="exportExcel") 导出为Csv文件
    Row
            example(style={height: '310px'}, :tableData="tableData")


</template>

<script>
    //import { getTableData } from '@/api/api'
    import Tables from '@/components/tables'
    import Example from './flow_chart.vue'
    export default {
        name: 'OrderFlowReport',
        components: {
            Tables,
            Example
        },
        data() {
            return {
                top: "top",
                loadingTable: true,
                addable:false,
                deleteable:false,
                customInputable : true,
                total: 0,
                requestDataForm: {
                    token_id: "",
                    days: 10
                },
                columns: [
                    {title: '币种ID', key: 'token_id'},
                    {title: '日期', key: 'date'},
                    {title: '提币次数', key: 'withdraw_count'},
                    {title: '提币金额', key: 'withdraw_amount'},
                    {title: '提币手续费', key: 'withdraw_cost_fee'},
                    {title: '归集次数', key: 'collect_count'},
                    {title: '归集金额', key: 'collect_amount'},
                    {title: '归集手续费', key: 'collect_cost_fee'},
                    {title: '冲币次数', key: 'deposit_count'},
                    {title: '冲币金额', key: 'deposit_amount'},

                ],
                tableData: [],
                chainIds: [],
                searchOptions:[],
                reportDays:10,
                customTokenIds: [],
            }
        },
        methods: {
            loadData() {
                this.$axios.get("/api/v1/get_chains").then(result => {
                    if (result.code === 10000) {
                    this.chainIds = result.data;
                    }
                });
                this.loadingTable = true;
                this.requestDataForm.token_id = "BTC";
                this.$axios.get("/api/v1/order_flows", {params: this.requestDataForm}).then(result => {
                    this.loadingTable = false;
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 200);
                    if (result.code === 10000) {
                        this.tableData = result.data ? result.data : [];
                        this.total = result.total;
                    }
                });
            },

            handleCustomInput(inputValue) {
                this.reportDays = inputValue;
            },
            handleSearch(searchKey, searchValue) {
                this.loadingTable = true;

                if( searchKey === 'token_id'){
                    this.requestDataForm.token_id = searchValue;
                }

                this.requestDataForm.days = this.reportDays;

                this.$axios.get("/api/v1/order_flows", {params: this.requestDataForm}).then(result => {
                    this.loadingTable = false;
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 200);
                    if (result.code === 10000) {
                        this.tableData = result.data ? result.data : [];
                        this.total = result.total;
                    }
                });
            },
            exportExcel() {
                this.$refs.tables.exportCsv({
                    filename: `table-${(new Date()).valueOf()}.csv`
                })
            },

            handleChain(chainId) {
                this.$axios.get("/api/v1/get_token_ids", {params: { id: chainId }}).then(result => {
                    this.customTokenIds = result.data;
                });
            }
        },

        mounted() {
            this.loadData()
        }
    }
</script>

<style lang="less">

</style>
