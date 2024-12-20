<template lang="pug">
Main.page-exchange
    tables(ref="tables", editable, searchable, :addable="addable", :deleteable="deleteable", :loading="loadingTable", :search-place="top",v-model="tableData", :columns="columns",
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
            FormItem(:label='$lang("From")')
                Input(v-model='createForm.from', , :placeholder="$lang('请输入',$lang('From'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("To")')
                Input(v-model='createForm.to', , :placeholder="$lang('请输入',$lang('To'))" , :disabled="nextType=='edit'")
            FormItem(:label='$lang("交易hash")')
                Input(v-model='createForm.tx_hash', , :placeholder="$lang('请输入',$lang('交易hash'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("broker订单ID")')
                Input(v-model='createForm.broker_order_id', , :placeholder="$lang('请输入',$lang('broker订单ID'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("金额")')
                Input(v-model='createForm.amount', , :placeholder="$lang('请输入',$lang('金额'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("确认数")')
                Input(v-model='createForm.confirm', , :placeholder="$lang('请输入',$lang('确认数'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("区块高度")')
                Input(v-model='createForm.block_height', , :placeholder="$lang('请输入',$lang('区块高度'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("手续费")')
                Input(v-model='createForm.cost_fee', , :placeholder="$lang('请输入',$lang('手续费'))")
            FormItem(:label='$lang("状态")')
                Input(v-model='createForm.status', , :placeholder="$lang('请输入',$lang('状态'))")
    // 查看信息
    Modal.page-exchange-detail(v-model="detialWinSatus", :title="createForm.token_id")
        Row
          Col(span="6" style="text-align:left") {{$lang("ID")}}：
          Col(span="14") {{createForm.id}}
        Row
          Col(span="6" style="text-align:left") {{$lang("币种ID")}}：
          Col(span="14") {{createForm.token_id}}
        Row
          Col(span="6" style="text-align:left") {{$lang("From")}}：
          Col(span="14") {{createForm.from}}
        Row
          Col(span="6" style="text-align:left") {{$lang("To")}}：
          Col(span="14") {{createForm.to}}
        Row
          Col(span="6" style="text-align:left") {{$lang("交易hash")}}：
          Col(span="14") {{createForm.tx_hash}}
        Row
          Col(span="6" style="text-align:left") {{$lang("broker订单ID")}}：
          Col(span="14") {{createForm.broker_order_id}}
        Row
          Col(span="6" style="text-align:left") {{$lang("金额")}}：
          Col(span="14") {{createForm.amount}}
        Row
          Col(span="6" style="text-align:left") {{$lang("手续费")}}：
          Col(span="14") {{createForm.cost_fee}}
        Row
          Col(span="6" style="text-align:left") {{$lang("gas_price")}}：
          Col(span="14") {{createForm.gas_price}}
        Row
          Col(span="6" style="text-align:left") {{$lang("确认数")}}：
          Col(span="14") {{createForm.confirm}}
        Row
          Col(span="6" style="text-align:left") {{$lang("区块高度")}}：
          Col(span="14") {{createForm.block_height}}
        Row
          Col(span="6" style="text-align:left") {{$lang("状态")}}：
          Col(span="14") {{createForm.status}}

        template(slot="footer")
          Button(type="primary" long @click="detialWinSatus=false") {{$lang("确定")}}
</template>

<script>
    import Tables from '@/components/tables'
    //import { getTableData } from '@/api/api'
    export default {
        name: 'WithdrawalOrder',
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
                    type:2,
                    from:"",
                    to:"",
                    tx_hash:"",
                    broker_order_id:"",
                    status: -1,
                },
                columns: [
                    {title: '币种ID', key: 'token_id'},
                    {title: 'From', key: 'from', minWidth: 80},
                    {title: 'To', key: 'to', minWidth: 80},
                    {title: '交易hash', key: 'tx_hash', minWidth: 100},
                    {title: 'broker订单ID', key: 'broker_order_id'},
                    {title: '确认数', key: 'confirm'},
                    {title: '区块高度', key: 'block_height'},
                    {title: '金额', key: 'amount'},
                    {title: '手续费', key: 'cost_fee'},
                    {title: '提现类型', key: 'type'},
                    {title: '状态', key: 'status',minWidth: 50, editable: true},
                    {
                        title: '操作',minWidth: 80,
                        key: 'handle',
                        align: 'left',
                        button: [
                            (h, params) => {
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
                searchOptions:["token_id","from", "to", "tx_hash", "broker_order_id", "status"],
                selectDataStore:[],
                creatWinStatus: false,
                detialWinSatus: false,
                // create创建 / edit修改
                nextType: "",
                createForm: {
                    id: "",
                    token_id: "",
                    from: "",
                    to: "",
                    tx_hash: "",
                    broker_order_id:"",
                    confirm: 0,
                    block_height: "",
                    cost_fee: "",
                    gas_price: "",
                    status: -1,
                },
                editForm: {
                    id: "",
                    type: 2,
                    status: "",
                    cost_fee: "",
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
                if( searchKey === 'from'){
                    this.requestDataForm.from = searchValue;
                }
                if( searchKey === 'to'){
                    this.requestDataForm.to = searchValue;
                }
                if( searchKey === 'tx_hash'){
                    this.requestDataForm.tx_hash = searchValue;
                }
                if( searchKey === 'broker_order_id'){
                    this.requestDataForm.broker_order_id = searchValue;
                }
                if( searchKey === 'status'){
                    this.requestDataForm.status = Number(searchValue);
                }
                //this.$Message.info("from " + this.requestDataForm.from + "  to" + this.requestDataForm.to);

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
            saveEdit(id, value, cost_fee) {
                this.editForm.id = Number(id);
                this.editForm.status = Number(value);
                this.editForm.cost_fee = String(cost_fee);
                this.$axios.put("/api/v1/update_order", this.editForm).then(result => {
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
                this.saveEdit(params.id, params.value, params.cost_fee);

            },
            doNext() {
                if (this.nextType == "create"){
                    /*this.$axios.post("/api/v1/create_asset", this.createForm).then(result => {
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
                    });*/
                }else{
                    this.saveEdit(this.createForm.id , this.createForm.status , this.createForm.cost_fee)

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
