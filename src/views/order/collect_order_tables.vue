<template lang="pug">
Main.page-exchange
    tables(ref="tables", editable, searchable, :addable="addable",:deleteable="deleteable",  :loading="loadingTable", :search-place="top",v-model="tableData", :columns="columns",
      :searchOptions="searchOptions", @on-search="handleSearch" @on-save-edit="handleSaveEdit"
      @on-delete="handleDelete"  @on-select-all="selectItemAll" @on-select="selectItem"  @on-select-cancel="cancelItem" @on-selection-change="selectChange"
      @on-add-row="handleAddRow" @on-delete-selected="handleDeleteSelected")
    Row
        Col(span="12")
            Button(style={margin: '10px 0'} type="primary" @click="exportExcel") 导出为Csv文件
        Col(span="8" style="text-align:right")
            Page(style={margin: '10px 0'}  :current.sync="requestDataForm.current", :total="total", :pageSize="requestDataForm.page_size" @on-change="loadData")

    // 新增
    Modal.page-exchange-win(v-model="creatWinStatus", , :title="$lang(nextType =='create' ? '新增':'修改')" @on-ok="doNext" :loading="loading")
        Form(:model='createForm', :label-width='100')
            FormItem(:label='$lang("ID")')
                Input(v-model='createForm.id', , placeholder, disabled)
            FormItem(:label='$lang("币种ID")')
                Input(v-model='createForm.token_id', , :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("归集发起者")')
                Input(v-model='createForm.broker', , :placeholder="$lang('请输入',$lang('归集发起者'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("归集唯一订单ID")')
                Input(v-model='createForm.broker_order_id', , :placeholder="$lang('请输入',$lang('归集唯一订单ID'))" , :disabled="nextType=='edit'")
            FormItem(:label='$lang("归集原因")')
                Input(v-model='createForm.reason', , :placeholder="$lang('请输入',$lang('归集原因'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("归集原因类型")')
                Input(v-model='createForm.reason_type', , :placeholder="$lang('请输入',$lang('归集原因类型'))", :disabled="nextType=='edit'")
    // 查看信息
    Modal.page-exchange-detail(v-model="detialWinSatus", :title="createForm.token_id")
        Row
          Col(span="6" style="text-align:left") {{$lang("ID")}}：
          Col(span="14") {{createForm.id}}
        Row
          Col(span="6" style="text-align:left") {{$lang("币种ID")}}：
          Col(span="14") {{createForm.token_id}}
        Row
          Col(span="6" style="text-align:left") {{$lang("归集发起者")}}：
          Col(span="14") {{createForm.broker}}
        Row
          Col(span="6" style="text-align:left") {{$lang("归集唯一订单ID")}}：
          Col(span="14") {{createForm.broker_order_id}}
        Row
          Col(span="6" style="text-align:left") {{$lang("归集原因")}}：
          Col(span="14") {{createForm.reason}}
        Row
          Col(span="6" style="text-align:left") {{$lang("归集原因类型")}}：
          Col(span="14") {{createForm.reason_type}}

        template(slot="footer")
          Button(type="primary" long @click="detialWinSatus=false") {{$lang("确定")}}
</template>

<script>
    import Tables from '@/components/tables'
    //import { getTableData } from '@/api/api'
    export default {
        name: 'CollectOrder',
        components: {
            Tables
        },
        data() {
            return {
                top: "top",
                loading: true,
                loadingTable: true,
                addable:false,
                deleteable:false,
                total: 0,
                requestDataForm: {
                    current: 1,
                    page_size: 20,
                    token_id: "",
                    type:3,
                    broker_order_id:"",
                    reason:"",
                },
                columns: [
                    {title: '币种ID', key: 'token_id', minWidth: 120},
                    {title: '归集发起者', key: 'broker', minWidth: 120},
                    {title: '归集唯一订单ID', key: 'broker_order_id', minWidth: 120},
                    {title: '归集原因', key: 'reason', minWidth: 120},
                    {title: '归集原因类型', key: 'reason_type', minWidth: 120},
                    {
                        title: '操作',minWidth: 80,
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
                                    }, '查看'),
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
                                    }, '编辑')
                                ])
                            }
                        ]
                    }
                ],
                tableData: [],
                searchOptions:["token_id","broker_order_id", "reason"],
                selectDataStore:[],
                creatWinStatus: false,
                detialWinSatus: false,
                // create创建 / edit修改
                nextType: "",
                createForm: {
                    id: "",
                    token_id: "",
                    broker:"",
                    broker_order_id:"",
                    reason:"",
                    reason_type:"",
                },
            }
        },
        methods: {
            loadData() {
                this.loadingTable = true;

                this.$axios.get("/api/v1/orders", {params: this.requestDataForm}).then(result => {
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
                var ids = new Array()
                for(var i = 0; i < this.selectDataStore.size(); i++){
                    ids.push(this.selectDataStore[i].id)
                }
                this.deleteSelected(ids);
            },
            handleSearch(searchKey, searchValue) {
                //this.loadingTable = true;
                if( searchKey === 'token_id'){
                    this.requestDataForm.token_id = searchValue;
                }
                if( searchKey === 'broker_order_id'){
                    this.requestDataForm.broker_order_id = searchValue;
                }
                if( searchKey === 'reason'){
                    this.requestDataForm.reason = searchValue;
                }

                this.requestDataForm.current = 1;
                this.$axios.get("/api/v1/orders", {params: this.requestDataForm}).then(result => {
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
            handleAddRow(){
                Object.keys(this.createForm).forEach(el => (this.createForm[el] = ""));
                this.creatWinStatus = true;
                this.nextType = "create";
            },
            handleDelete(paramr) {
                this.deleteSelected(paramr.ids);
            },
            deleteSelected(ids) {
                this.$axios.post("/api/v1/delete_orders", ids).then(result => {
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
                this.$axios.put("/api/v1/update_orders", this.editForm).then(result => {
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
