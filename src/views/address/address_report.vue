<template lang="pug">
Main.page-exchange
    tables(ref="tables", :addable="addable", :deleteable="deleteable", :loading="loadingTable", :search-place="top",v-model="tableData", :columns="columns",
      :searchOptions="searchOptions", @on-search="handleSearch" )
    Row
        Col(span="12")
            Button(style={margin: '10px 0'} type="primary" @click="exportExcel") Export Csv

</template>

<script>
    import Tables from '@/components/tables'
    //import { getTableData } from '@/api/api'
    export default {
        name: 'AddressReport',
        components: {
            Tables
        },
        data() {
            return {
                top: "top",
                loadingTable: true,
                addable:false,
                deleteable:false,
                total: 0,
                requestDataForm: {
                    token_id: "",
                },
                columns: [
                    {title: this.$lang('币种类型'), key: 'type'},
                    {title: this.$lang('币种ID'), key: 'token_ids'},
                    {title: this.$lang('可用量'), key: 'un_used_count'},
                    {title: this.$lang('已使用'), key: 'used_count'},
                    {title: this.$lang('废弃量'), key: 'discard_count'},
                    {title: this.$lang('总量'), key: 'total_count'},

                ],
                tableData: [],
                searchOptions:["type"],
            }
        },
        methods: {
            loadData() {
                this.loadingTable = true;
                this.$axios.get("/api/v1/address_count_chart", {params: this.requestDataForm}).then(result => {
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
                if( searchKey === 'token'){
                    this.requestDataForm.token_type = searchValue;
                }
                if( searchKey === 'token_id'){
                    this.requestDataForm.address = searchValue;
                }
                this.requestDataForm.current = 1;
                this.$axios.get("/api/v1/address_count_chart", {params: this.requestDataForm}).then(result => {
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

<style>

</style>
