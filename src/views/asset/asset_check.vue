<template lang="pug">
Main.page-exchange

    Progress(:percent="progressPercent" :stroke-width="2")
        div(v-if="progressPercent == 100")
            Icon(type="ios-checkmark-circle") 成功
    Row
        Col(span="12")
            Button(style={margin: '10px 0'} type="primary" @click="checkAssetClick") {{buttonMsg}}
    Row
        tables(ref="tables", searchable, :addable="addable",:searchOffline="searchOffline" :deleteable="deleteable", :loading="loadingTable", :search-place="top",v-model="tableData", :columns="columns",
            :searchOptions="searchOptions", @on-search="handleSearch" )
    Row
        Col(span="12")
            Button(style={margin: '10px 0'} type="primary" @click="exportExcel") 导出为Csv文件
        Col(span="8" style="text-align:right")
            Page(style={margin: '10px 0'}  :current.sync="requestDataForm.current", :total="total", :pageSize="requestDataForm.page_size" @on-change="checkAssetClick")




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
                buttonMsg:"开始检查",
                loadingTable: false,
                addable:false,
                deleteable:false,
                searchOffline:false,
                totalAsset: 0,
                progressPercent: 0,
                requestDataForm: {
                    token_id: "",
                    current: 1,
                    page_size: 20,
                },
                columns: [
                    {title: '资产ID', key: 'asset_id'},
                    {title: '币种ID', key: 'token_id'},
                    {title: '地址', key: 'address'},
                    {title: '资产', key: 'balance'},
                    {title: '链上资产', key: 'balance_chain'},
                    {title: '最新时间', key: 'blance_at'},
                    {title: '状态', key: 'check_result'},

                ],
                tableData: [],
                searchOptions:["token_id"],
                timer: null
            }
        },
        methods: {
            loadData() {
                //this.loadingTable = true;
                this.$axios.get("/api/v1/assets", {params: this.requestDataForm}).then(result => {
                    //this.loadingTable = false;
                    //this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 200);
                    if (result.code === 10000) {
                        //this.tableData = result.data ? result.data : [];
                        this.totalAsset = result.total;
                    }
                });
            },
            checkAssetClick(){
                this.loadingTable = true;
                this.requestDataForm.token_id ='EKC';
                this.$axios.get("/api/v1/asset_check", {params: this.requestDataForm}).then(result => {
                    this.loadingTable = false;
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 200);
                    if (result.code === 10000) {
                        this.tableData = [];
                        if(result.data.check_asset_complete == false && result.data.check_sync_complete == false){
                            this.buttonMsg = "正在同步资产"
                            this.progressPercent = result.data.sync_asset_count / result.data.total_asset_count * 100
                        }
                        if(result.data.check_asset_complete == false && result.data.check_sync_complete == true){
                            this.buttonMsg = "正在检查线上资产"
                            this.progressPercent = result.data.check_asset_count / result.data.total_check_count * 100
                            this.tableData = result.data.failed_data ? result.data.failed_data : [];
                            this.total = result.data.failed_count;
                        }
                        if( result.data.check_asset_complete == true && result.data.check_sync_complete == true ) {
                            this.buttonMsg = "检查完成"
                            this.progressPercent = result.data.check_asset_count / result.data.total_check_count * 100
                            clearInterval(this.timer)
                            this.tableData = result.data.failed_data ? result.data.failed_data : [];
                            this.total = result.data.failed_count;
                        }
                        this.tableData.forEach(function (c) {
                            if(c['verified'] == 0){
                                c['check_result'] = "成功";
                            }
                            else if(c['verified'] == -1){
                                c['check_result'] = "校对失败";
                            }
                            else if(c['verified'] == -100){
                                c['check_result'] = "同步完成";
                            }
                            else if(c['verified'] == -99){
                                c['check_result'] = "没找到链上资产";
                            }
                            else if(c['verified'] == -98){
                                c['check_result'] = "没找到ChainNode";
                            }
                            else if(c['verified'] == -97){
                                c['check_result'] = "链上拥堵稍后重试";
                            }
                            else if(c['verified'] == 1){
                                c['check_result'] = "只需校对总资产";
                            }
                        })
                    }
                });
            },
            setTimer: function () {

                this.timer = setInterval( () => {
                        this.checkAssetClick()
                }, 10000)

            },

            handleSearch(searchKey, searchValue) {
                if( searchKey === 'token_id'){
                    this.requestDataForm.token_id = searchValue;
                }

                this.requestDataForm.current = 1;
                this.$axios.get("/api/v1/asset_check", {params: this.requestDataForm}).then(result => {
                    this.loadingTable = false;
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 200);
                    if (result.code === 10000) {
                        this.tableData = [];
                        if(result.data.check_asset_complete == false && result.data.check_sync_complete == false){
                            this.buttonMsg = "正在同步资产"
                            this.progressPercent = result.data.sync_asset_count / result.data.total_asset_count * 100
                        }
                        if(result.data.check_asset_complete == false && result.data.check_sync_complete == true){
                            this.buttonMsg = "正在检查线上资产"
                            this.progressPercent = result.data.check_asset_count / result.data.total_check_count * 100
                            this.tableData = result.data.failed_data ? result.data.failed_data : [];
                            this.total = result.data.failed_count;
                        }
                        if( result.data.check_asset_complete == true && result.data.check_sync_complete == true ) {
                            this.buttonMsg = "检查完成"
                            this.progressPercent = result.data.check_asset_count / result.data.total_check_count * 100
                            clearInterval(this.timer)
                            this.tableData = result.data.failed_data ? result.data.failed_data : [];
                            this.total = result.data.failed_count;
                        }
                        this.tableData.forEach(function (c) {
                            if(c['verified'] == 0){
                                c['check_result'] = "成功";
                            }
                            else if(c['verified'] == -1){
                                c['check_result'] = "校对失败";
                            }
                            else if(c['verified'] == -100){
                                c['check_result'] = "同步完成";
                            }
                            else if(c['verified'] == -99){
                                c['check_result'] = "没找到链上资产";
                            }
                            else if(c['verified'] == -98){
                                c['check_result'] = "没找到ChainNode";
                            }
                            else if(c['verified'] == -97){
                                c['check_result'] = "链上拥堵稍后重试";
                            }
                            else if(c['verified'] == 1){
                                c['check_result'] = "只需校对总资产";
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
            //this.loadData()

            clearInterval(this.timer)
            this.setTimer()
        },

        distroyed: function () {

            clearInterval(this.timer)

        }
    }
</script>

<style lang="less">

</style>
