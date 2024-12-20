<template lang="pug">
Main.page-exchange
    tables(ref="tables", editable, searchable, :deleteable="deleteable",:loading="loadingTable", :earch-place="top",v-model="tableData", :columns="columns",
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
            FormItem(:label='$lang("旧合约地址")')
                Input(v-model='createForm.old_contract', , :placeholder="$lang('请输入',$lang('旧合约地址'))" , :disabled="nextType=='edit'")
            FormItem(:label='$lang("新合约地址")')
                Input(v-model='createForm.new_contract', , :placeholder="$lang('请输入',$lang('新合约地址'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("旧合约资产")')
                Input(v-model='createForm.old_balance', , :placeholder="$lang('请输入',$lang('旧合约资产'))" , :disabled="nextType=='edit'")
            FormItem(:label='$lang("新合约资产")')
                Input(v-model='createForm.new_balance', , :placeholder="$lang('请输入',$lang('新合约资产'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("区块高度")')
                Input(v-model='createForm.block_height', , :placeholder="$lang('请输入',$lang('区块高度'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("扩展字段")')
                Input(v-model='createForm.extension', , :placeholder="$lang('请输入',$lang('扩展字段'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("memo")')
                Input(v-model='createForm.memo', , :placeholder="$lang('请输入',memo)", :disabled="nextType=='edit'")
    // 查看信息
    Modal.page-exchange-detail(v-model="detialWinSatus", :title="createForm.token_id")
        Row
          Col(span="6" style="text-align:left") {{$lang("ID")}}：
          Col(span="14") {{createForm.id}}
        Row
          Col(span="6" style="text-align:left") {{$lang("币种ID")}}：
          Col(span="14") {{createForm.token_id}}
        Row
          Col(span="6" style="text-align:left") {{$lang("旧合约地址")}}：
          Col(span="14") {{createForm.old_contract}}
        Row
          Col(span="6" style="text-align:left") {{$lang("新合约地址")}}：
          Col(span="14") {{createForm.new_contract}}
        Row
          Col(span="6" style="text-align:left") {{$lang("旧合约资产")}}：
          Col(span="14") {{createForm.old_balance}}
        Row
          Col(span="6" style="text-align:left") {{$lang("新合约资产")}}：
          Col(span="14") {{createForm.new_balance}}
          Row
          Col(span="6" style="text-align:left") {{$lang("区块高度")}}：
          Col(span="14") {{createForm.block_height}}
          Row
          Col(span="6" style="text-align:left") {{$lang("扩展字段")}}：
          Col(span="14") {{createForm.extension}}
          Row
          Col(span="6" style="text-align:left") {{$lang("memo")}}：
          Col(span="14") {{createForm.memo}}
    // 查看信息
        template(slot="footer")
          Button(type="primary" long @click="detialWinSatus=false") {{$lang("确定")}}
</template>

<script>
    import Tables from '@/components/tables'
    //import { getTableData } from '@/api/api'
    export default {
        name: 'ChangeContractRecord',
        components: {
            Tables
        },
        data() {
            return {
                top: "top",
                loading: true,
                loadingTable: true,
                deleteable:false,
                total: 0,
                requestDataForm: {
                    current: 1,
                    page_size: 20,
                    token_id: "",
                    old_contract:"",
                    new_contract:"",
                },
                columns: [
                    {title: '币种ID', key: 'token_id'},
                    {title: '旧合约地址', key: 'old_contract'},
                    {title: '新合约地址', key: 'new_contract'},
                    {title: '旧合约资产', key: 'old_balance'},
                    {title: '新合约资产', key: 'new_balance'},
                    {title: '区块高度', key: 'block_height'},
                    {title: '扩展字段', key: 'extension'},
                    {
                        title: '操作',
                        key: 'handle',
                        align: 'left',
                        button: [
                            (h, params) => {
                                return h('div', [
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
                searchOptions:["token_id","old_contract", "new_contract", "tx_hash"],
                selectDataStore:[],
                creatWinStatus: false,
                detialWinSatus: false,
                // create创建 / edit修改
                nextType: "",
                createForm: {
                    id: "",
                    token_id: "",
                    old_contract:"",
                    new_contract:"",
                    old_balance:"",
                    new_balance:"",
                    memo:"",
                    extension:"",
                    block_height:"",
                },
                deleteForm:{
                    ids:[]
                }
            }
        },
        methods: {
            loadData() {
                this.loadingTable = true;
                this.$axios.get("/api/v1/change_contract_record", {params: this.requestDataForm}).then(result => {
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
                if( searchKey === 'token_id'){
                    this.requestDataForm.token_id = searchValue;
                }
                if( searchKey === 'old_contract'){
                    this.requestDataForm.old_contract = searchValue;
                }
                if( searchKey === 'new_contract'){
                    this.requestDataForm.new_contract = searchValue;
                }

                this.requestDataForm.current = 1;
                this.$axios.get("/api/v1/change_contract_record", {params: this.requestDataForm}).then(result => {
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

            },
            handleSaveEdit(params){
                this.saveEdit(params.id, params.value);

            },
            doNext() {
                if (this.nextType == "create"){
                    this.createForm.block_height = Number(this.createForm.block_height);
                    this.$axios.post("/api/v1/create_change_contract_record", this.createForm).then(result => {
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
                    //this.saveEdit(this.createForm.id , this.createForm.status)

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
