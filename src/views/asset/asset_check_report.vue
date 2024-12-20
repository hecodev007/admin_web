<template lang="pug">
Main.page-exchange
    tables(ref="tables", :addable="addable", :deleteable="deleteable", searchable, :searchOffline="searchOffline", :loading="loadingTable", :search-place="top",v-model="tableData", :columns="columns",
      :searchOptions="searchOptions", @on-search="handleSearch" )
    Row
        Col(span="12")
            Button(style={margin: '10px 0'} type="primary" @click="exportExcel") 导出为Csv文件


</template>

<script>
    //import { getTableData } from '@/api/api'
    import Tables from '@/components/tables'
    export default {
        name: 'AssetReport',
        components: {
            Tables
        },
        data() {
            return {
                top: "top",
                loadingTable: true,
                addable:false,
                deleteable:false,
                searchOffline:true,
                total: 0,
                requestDataForm: {
                    token_id: "",
                },
                columns: [
                    {title: '币种ID', key: 'token_id'},
                    {title: '总资产', key: 'total_balance'},
                    {title: '链上总资产', key: 'chain_total_balance'},
                    {title: '结果', key: 'result', render:function(h,params){
                            return h(
                                "img",
                                {
                                    attrs: {
                                        src:
                                            params.row.result =='success' ? require('../../assets/check.svg'): require('../../assets/error.svg')
                                    }
                                },

                            params.row.result =='success'?'成功':'失败'
                            );
                        }},

                ],
                tableData: [],
                searchOptions:["token_id"],
            }
        },
        methods: {
            loadData() {
                this.loadingTable = true;
                this.$axios.get("/api/v1/asset_check_report", {params: this.requestDataForm}).then(result => {
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

            handleSearch(searchKey, searchValue) {
                //this.loadingTable = true;
                if( searchKey === 'token_id'){
                    this.requestDataForm.address = searchValue;
                }
                this.requestDataForm.current = 1;
                this.$axios.get("/api/v1/asset_check_report", {params: this.requestDataForm}).then(result => {
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
        },

        mounted() {
            this.loadData()
        }
    }
</script>

<style lang="less">

</style>
