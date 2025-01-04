<template lang="pug">
Main.page-exchange
    Row
        DatePicker(v-model="requestDataForm.create_time", type="date", placeholder="开始时间", style={margin: '10px 0'})
        Button(style={margin: '10px 0'} type="primary" @click="loadData") 搜索
    tables(ref="tables", :addable="addable", :deleteable="deleteable", :loading="loadingTable", :search-place="top",v-model="tableData", :columns="columns",
      :searchOptions="searchOptions", @on-search="handleSearch" )
    Row
        Col(span="12")
            Button(style={margin: '10px 0'} type="primary" @click="exportExcel") Export Csv


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
                top:"top",
                loadingTable: true,
                addable:false,
                deleteable:false,
                total: 0,
                requestDataForm: {
                    // token_id: "",
                    create_time: "",
                },
                columns: [
                    {title: this.$lang('币种ID'), key: 'token_id'},
                    {title: this.$lang('地址类型'), key: 'wallet_owner'},
                    {title: this.$lang('地址数量'), key: 'address_count'},
                    {title: this.$lang('总金额'), key: 'total'},

                ],
                tableData: [],
                searchOptions:["token_id, owner"],
            }
        },
        methods: {
            loadData() {
                this.loadingTable = true;
                this.$axios.get("/api/v1/asset_report", {params: this.requestDataForm}).then(result => {
                    this.loadingTable = false;
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 200);
                    if (result.code === 10000) {
                        this.tableData = result.data ? result.data.sort((a, b) => {
                            if (a.owner < b.owner) {
                                return 1;
                            }
                            if (a.owner > b.owner) {
                                return -1;
                            }
                            if (a.token_id < b.token_id) {
                                return -1;
                            }
                            if (a.token_id > b.token_id) {
                                return 1;
                            }
                            return 0;
                        }) : [];
                        this.total = result.total;
                        this.tableData.forEach(function (c) {
                            if(c['owner'] == 1){
                                c['wallet_owner'] = "个人";
                            }
                            else if(c['owner'] == 2){
                                c['wallet_owner'] = "热钱包";
                            }
                            else if(c['owner'] == 3){
                                c['wallet_owner'] = "冷钱包";
                            }
                        })
                    }
                });
            },

            handleSearch(searchKey, searchValue) {
                //this.loadingTable = true;
                if( searchKey === 'owner'){
                    this.requestDataForm.token_type = searchValue;
                }
                if( searchKey === 'token_id'){
                    this.requestDataForm.address = searchValue;
                }
                this.requestDataForm.current = 1;
                this.$axios.get("/api/v1/asset_report", {params: this.requestDataForm}).then(result => {
                    this.loadingTable = false;
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 200);
                    if (result.code === 10000) {
                        this.tableData = result.data ? result.data.sort((a, b) => {
                            if (a.owner < b.owner) {
                                return 1;
                            }
                            if (a.owner > b.owner) {
                                return -1;
                            }
                            if (a.token_id < b.token_id) {
                                return -1;
                            }
                            if (a.token_id > b.token_id) {
                                return 1;
                            }
                            return 0;
                        }) : [];
                        this.total = result.total;
                        this.tableData.forEach(function (c) {
                            if(c['owner'] == 1){
                                c['wallet_owner'] = "个人";
                            }
                            else if(c['owner'] == 2){
                                c['wallet_owner'] = "热钱包";
                            }
                            else if(c['owner'] == 3){
                                c['wallet_owner'] = "冷钱包";
                            }
                        })
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
