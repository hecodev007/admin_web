<template lang="pug">
Main.page-exchange
    tables(ref="tables", editable, searchable, :loading="loadingTable", :search-place="top",v-model="tableData", :columns="columns",
      :searchOptions="searchOptions", @on-search="handleSearch" @on-save-edit="handleSaveEdit"
      @on-delete="handleDelete"  @on-select-all="selectItemAll" @on-select="selectItem"  @on-select-cancel="cancelItem" @on-selection-change="selectChange"
      @on-add-row="handleAddRow" @on-delete-selected="handleDeleteSelected")
    Row
        Col(span="12")
            Button(style={margin: '10px 0'} type="primary" @click="exportExcel") Export Csv
        Col(span="8" style="text-align:right")
            Page(style={margin: '10px 0'}  :current.sync="requestDataForm.current", :total="total", :pageSize="requestDataForm.page_size" @on-change="loadData")

    // 新增
    Modal.page-exchange-win(v-model="creatWinStatus", , :title="$lang(nextType =='create' ? '新增':'修改')" @on-ok="doNext" :loading="loading")
        Form(:model='createForm', :label-width='100')
            FormItem(:label='$lang("ID")')
                Input(v-model='createForm.id', , placeholder, disabled)
            FormItem(:label='$lang("资产ID")')
                Input(v-model='createForm.asset_id', , :placeholder="$lang('请输入',$lang('资产ID'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("订单ID")')
                Input(v-model='createForm.order_id', , :placeholder="$lang('请输入',$lang('订单ID'))" , :disabled="nextType=='edit'")
            FormItem(:label='$lang("流水类型")')
                Input(v-model='createForm.type', , :placeholder="$lang('请输入',$lang('流水类型'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("变动金额")')
                Input(v-model='createForm.changed', , :placeholder="$lang('请输入',$lang('变动金额'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("总余额")')
                Input(v-model='createForm.total', , :placeholder="$lang('请输入',$lang('总余额'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("批量提现所有订单")')
                Input(v-model='createForm.order_ids', , :placeholder="$lang('请输入',$lang('批量提现所有订单'))", :disabled="nextType=='edit'")
    // 查看信息
    Modal.page-exchange-detail(v-model="detialWinSatus", :title="createForm.token_id")
        Row
          Col(span="6" style="text-align:left") {{$lang("ID")}}：
          Col(span="14") {{createForm.id}}
        Row
          Col(span="6" style="text-align:left") {{$lang("资产ID")}}：
          Col(span="14") {{createForm.asset_id}}
        Row
          Col(span="6" style="text-align:left") {{$lang("订单ID")}}：
          Col(span="14") {{createForm.order_id}}
        Row
          Col(span="6" style="text-align:left") {{$lang("流水类型")}}：
          Col(span="14") {{createForm.type}}
        Row
          Col(span="6" style="text-align:left") {{$lang("变动金额")}}：
          Col(span="14") {{createForm.changed}}
        Row
          Col(span="6" style="text-align:left") {{$lang("总余额")}}：
          Col(span="14") {{createForm.total}}
        Row
          Col(span="6" style="text-align:left") {{$lang("批量提现所有订单")}}：
          Col(span="14") {{createForm.order_ids}}

        template(slot="footer")
          Button(type="primary" long @click="detialWinSatus=false") {{$lang("确定")}}
</template>

<script>
    import Tables from '@/components/tables'
    //import { getTableData } from '@/api/api'
    export default {
        name: 'AssetFlowTables',
        components: {
            Tables
        },
        data() {
            return {
                top: "top",
                loading: true,
                loadingTable: true,
                total: 0,
                requestDataForm: {
                    current: 1,
                    page_size: 20,
                    asset_id: "",
                    order_id: "",
                },
                columns: [
                    {title: '',width: 60,align: 'center',type: 'selection'},
                    {title: this.$lang('资产ID'), key: 'asset_id'},
                    {title: this.$lang('订单ID'), key: 'order_id'},
                    {title: this.$lang('流水类型'), key: 'wallet_type'},
                    {title: this.$lang('变动金额'), key: 'changed', sortable: true},
                    {title: this.$lang('总余额'), key: 'total', sortable: true},
                    {title: this.$lang('批量提现所有订单'), key: 'order_ids'},
                    {
                        title: this.$lang('操作'),
                        key: 'handle',
                        align: 'left',
                        button: [
                            (h, params, vm) => {
                                return h('div'/*, {
                                    props: {
                                        confirm: true,
                                        title: '你确定要删除吗?'
                                    },
                                    on: {
                                        'on-ok': () => {
                                        var ids = new Array()
                                        ids.push(this.insideTableData[params.index].id)

                                            Object.assign(params, { ids: ids})
                                            vm.$emit('on-delete', params)
                                            vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                                        }
                                    }
                                }*/, [
                                    h('Button', {
                                        props: {
                                            type: "primary"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.detialWinSatus = true;
                                                Object.assign(this.createForm, params.row);
                                            }
                                        }
                                    }, this.$lang('查看')),
                                    h('Button', {
                                        props: {
                                            type: "primary"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.creatWinStatus = true;
                                                this.nextType = "edit";
                                                Object.assign(this.createForm, params.row);
                                            }
                                        }
                                    }, this.$lang('编辑'))
                                ])
                            }
                        ]
                    }
                ],
                tableData: [],
                searchOptions:["asset_id","order_id"],
                selectDataStore:[],
                creatWinStatus: false,
                detialWinSatus: false,
                // create创建 / edit修改
                nextType: "",
                createForm: {
                    id: "",
                    asset_id: "",
                    order_id: "",
                    type: 0,
                    changed: "",
                    total: "",
                    order_ids: "",
                },
                editForm: {
                    id: "",
                    status: "",
                },
                deleteForm:{
                ids:[]
                }
            }
        },
        methods: {
            loadData() {
                this.loadingTable = true;
                this.$axios.get("/api/v1/asset_flow", {params: this.requestDataForm}).then(result => {
                    this.loadingTable = false;
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 200);
                    if (result.code === 10000) {
                        this.tableData = result.data ? result.data : [];
                        this.total = result.total;
                        this.tableData.forEach(function (c) {
                            if(c['type'] == 1){
                                c['wallet_type'] = "充值流水";
                            }
                            else if(c['type'] == 2){
                                c['wallet_type'] = "提现流水";
                            }
                            else if(c['type'] == 3){
                                c['wallet_type'] = "归集流水";
                            }
                            else if(c['type'] == 4){
                                c['wallet_type'] = "商户互转";
                            }
                        })
                    }
                });
            },
            selectItem(selection, row) {
                this.selectDataStore.push(row)
            },
            cancelItem(selection, row) {
                this.selectDataStore.forEach((item, index) => {
                    if (item.id === row.id) {      //ID，所以拿来做判断条件
                        this.selectDataStore.splice(index, 1)
                    }
                })
            },
            selectItemAll(selection) {
                this.selectDataStore = []
                this.selectDataStore = this.selectDataStore.concat(selection)
            },
            selectChange(selection) {
                if (!selection.length) {
                    let arr1 = this.selectDataStore
                    let arr2 = this.data
                    for (let i = 0; i < arr1.length; i++) {
                        for (let j = 0; j < arr2.length; j++) {
                            if (arr1[i].id === arr2[j].id) {
                                this.selectDataStore.splice(i, 1)
                            }
                        }
                    }
                }
            },
            handleDeleteSelected(){
                this.deleteForm.ids = []
                this.selectDataStore.forEach((item, index) => {
                    this.deleteForm.ids.push(item.id)
                })
                this.deleteSelected(this.deleteForm);
                this.selectDataStore = []
            },
            handleSearch(searchKey, searchValue) {
                //this.loadingTable = true;
                if( searchKey === 'asset_id'){
                    this.requestDataForm.asset_id = searchValue;
                }
                if( searchKey === 'order_id'){
                    this.requestDataForm.order_id = searchValue;
                }
                this.requestDataForm.current = 1;
                this.$axios.get("/api/v1/asset_flow", {params: this.requestDataForm}).then(result => {
                    this.loadingTable = false;
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 200);
                    if (result.code === 10000) {
                        this.tableData = result.data ? result.data : [];
                        this.total = result.total;
                        this.tableData.forEach(function (c) {
                            if(c['type'] == 1){
                                c['wallet_type'] = "充值流水";
                            }
                            else if(c['type'] == 2){
                                c['wallet_type'] = "提现流水";
                            }
                            else if(c['type'] == 3){
                                c['wallet_type'] = "归集流水";
                            }
                            else if(c['type'] == 4){
                                c['wallet_type'] = "商户互转";
                            }
                        })
                    }
                });
            },
            handleAddRow(){
                Object.keys(this.createForm).forEach(el => (this.createForm[el] = ""));
                this.creatWinStatus = true;
                this.nextType = "create";
            },
            handleDelete(paramr) {
                this.deleteSelected(paramr.ids);
            },
            deleteSelected(ids) {
                this.$axios.post("/api/v1/delete_asset_flow", ids).then(result => {
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 200);

                    if (result.code == 10000) {
                        this.$Notice.success({
                            title: this.$lang("删除成功"),
                            duration: 2
                        });
                        this.creatWinStatus = false;
                    }else{
                        this.$Notice.error({
                            title: this.$lang("删除失败"),
                            duration: 2
                        });
                        this.creatWinStatus = false;
                    }
                    this.loadData();
                });
            },
            exportExcel() {
                this.$refs.tables.exportCsv({
                    filename: `table-${(new Date()).valueOf()}.csv`
                })
            },
            create() {
                Object.keys(this.createForm).forEach(el => (this.createForm[el] = ""));
                this.creatWinStatus = true;
                this.nextType = "create";
            },
            saveEdit(id, value) {
                this.editForm.id = Number(id);
                this.editForm.status = Number(value);
                this.$axios.put("/api/v1/update_asset_flow", this.editForm).then(result => {
                        this.loading = false;
                        setTimeout(() => {
                            this.loading = true;
                        }, 200);

                        if (result.code == 10000) {
                            this.$Notice.success({
                                title: this.$lang("修改成功"),
                                duration: 2
                            });
                            this.creatWinStatus = false;
                        }else{
                            this.$Notice.error({
                                title: this.$lang("修改失败"),
                                duration: 2
                            });
                            this.creatWinStatus = false;
                        }
                        this.loadData();
                });
            },
            handleSaveEdit(params){
                this.saveEdit(params.id, params.value);

            },
            doNext() {
                if (this.nextType == "create"){
                    this.createForm.asset_id = Number(this.createForm.asset_id);
                    this.createForm.order_id = Number(this.createForm.order_id);
                    this.createForm.type = Number(this.createForm.type);
                    this.$axios.post("/api/v1/create_asset_flow", this.createForm).then(result => {
                        this.loading = false;
                        setTimeout(() => {
                            this.loading = true;
                        }, 200);

                        if (result.code == 10000) {
                            this.$Notice.success({
                                title: this.$lang("新增成功"),
                                duration: 2
                            });
                            this.creatWinStatus = false;
                        }else{
                            this.$Notice.error({
                                title: this.$lang("新增失败"),
                                duration: 2
                            });
                            this.creatWinStatus = false;
                        }
                        this.loadData();
                    });
                }else{
                    this.saveEdit(this.createForm.id , this.createForm.status)

                }
            }
        },
        mounted() {
            this.loadData()
        }
    }
</script>

<style>

</style>
