<template lang="pug">
Main.page-exchange
    tables(ref="tables", editable, searchable, :loading="loadingTable", :deleteable="deleteable", :addable="addable" ,:search-place="top",v-model="tableData", :columns="columns",
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
            FormItem(:label='"AccoutId"')
                Input(v-model='createForm.account_id', , :placeholder="$lang('请输入','AccoutId')")
            FormItem(:label='$lang("币种类型")')
                Input(v-model='createForm.token_type', , :placeholder="$lang('请输入',$lang('币种类型'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("地址")')
                Input(v-model='createForm.address', , :placeholder="$lang('请输入',$lang('地址'))")
            FormItem(:label='$lang("memo")')
                Input(v-model='createForm.memo', , :placeholder="$lang('请输入',$lang('memo'))")
            FormItem(:label='$lang("Extension")')
                Input(v-model='createForm.extension', , :placeholder="$lang('请输入',$lang('Extension'))")
    // 查看信息
    Modal.page-exchange-detail(v-model="detialWinSatus", :title="createForm.account_id")
        Row
          Col(span="6" style="text-align:left") {{$lang("ID")}}：
          Col(span="14") {{createForm.id}}
        Row
          Col(span="6" style="text-align:left") AccountId：
          Col(span="14") {{createForm.account_id}}
        Row
          Col(span="6" style="text-align:left") {{$lang("币种类型")}}：
          Col(span="14") {{createForm.token_type}}
        Row
          Col(span="6" style="text-align:left") {{$lang("地址")}}：
          Col(span="14") {{createForm.address}}
        Row
          Col(span="6" style="text-align:left") {{$lang("memo")}}：
          Col(span="14") {{createForm.memo}}
        Row
          Col(span="6" style="text-align:left") {{$lang("Extension")}}：
          Col(span="14") {{createForm.extension}}

        template(slot="footer")
          Button(type="primary" long @click="detialWinSatus=false") {{$lang("确定")}}
</template>

<script>
    const TOKEN_TYPE = {
        1: 'Utxo',
        2: 'ETH',
        3: 'LTC',
        4: 'EOS',
        5: 'IPC',
        6: 'TRON'
    }
    import Tables from '@/components/tables'
    //import { getTableData } from '@/api/api'
    export default {
        name: 'AccountAddress',
        components: {
            Tables
        },
        data() {
            return {
                top: "top",
                loading: true,
                loadingTable: true,
                deleteable:false,
                addable : false,
                total: 0,
                requestDataForm: {
                    current: 1,
                    page_size: 20,
                    token_type: 0,
                    account_id: "",
                    address: "",
                    uid:""
                },
                columns: [
                    {title: 'uid', key: 'uid'},
                    {title: this.$lang('币种类型'), key: 'token_type'},
                    {title: 'AccountId', key: 'account_id', minWidth: 100},
                    {title: this.$lang('地址'), key: 'address', minWidth: 200},
                    {title: 'memo', key: 'memo'},
                    {title: 'Extension', key: 'extension'},
                    {
                        title: this.$lang('操作'), minWidth: 80,
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
                searchOptions:["token_type","address","account_id", "uid"],
                selectDataStore:[],
                creatWinStatus: false,
                detialWinSatus: false,
                // create创建 / edit修改
                nextType: "",
                createForm: {
                    id: 0,
                    account_id: "",
                    token_type: 0,
                    address: "",
                    memo: "",
                    extension: "",
                },
                editForm: {
                    id: 0,
                    account_id: "",
                    token_type: 0,
                    address: "",
                    memo: "",
                    extension: "",

                },
            }
        },
        methods: {
            reset() {
                this.requestDataForm = {
                    current: 1,
                    page_size: 20,
                    token_type: 0,
                    account_id: "",
                    address: "",
                    uid:"",
                }
            },
            loadData() {
                this.loadingTable = true;
                this.$axios.get("/api/v1/account_address", {params: this.requestDataForm}).then(result => {
                    this.loadingTable = false;
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 200);
                    if (result.code === 10000) {
                        this.tableData = result.data ? result.data : [];
                        this.total = result.total;
                        this.tableData.forEach(function (c) {
                            c['token_type'] = TOKEN_TYPE[c['token_type']];
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
                this.reset();
                if( searchKey === 'token_type'){
                    const statusKey = Object.keys(TOKEN_TYPE).find(key => TOKEN_TYPE[key] === searchValue);
                    if (statusKey !== undefined) {
                    this.requestDataForm.token_type = parseInt(statusKey);
                    }
                }
                if( searchKey === 'address'){
                    this.requestDataForm.address = searchValue;
                }
                if( searchKey === 'account_id'){
                    this.requestDataForm.account_id = String(searchValue);
                }
                if( searchKey === 'uid'){
                    this.requestDataForm.uid = searchValue;
                }
                this.requestDataForm.current = 1;
                this.$axios.get("/api/v1/account_address", {params: this.requestDataForm}).then(result => {
                    this.loadingTable = false;
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 200);
                    if (result.code === 10000) {
                        this.tableData = result.data ? result.data : [];
                        this.total = result.total;
                        this.tableData.forEach(function (c) {
                            c['token_type'] = TOKEN_TYPE[c['token_type']];
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
                this.$axios.post("/api/v1/delete_account_address", ids).then(result => {
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
            saveEdit() {
                this.editForm.id = Number(this.createForm.id);
                this.editForm.account_id = String(this.createForm.account_id);
                this.editForm.token_type = Number(this.createForm.token_type);
                this.editForm.address = this.createForm.address;
                this.editForm.memo = this.createForm.memo;
                this.editForm.extension = this.createForm.extension;

                this.$axios.put("/api/v1/update_account_address", this.editForm).then(result => {
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
                Object.assign(this.createForm, params.data);
                this.createForm[params.key] = params.value;
                this.saveEdit();

            },
            doNext() {
                if (this.nextType == "create"){
                    this.createForm.id = Number(this.createForm.id);
                    this.createForm.account_id = String(this.createForm.account_id);
                    this.createForm.token_type = Number(this.createForm.token_type);
                    this.createForm.address = this.createForm.address;
                    this.createForm.memo = this.createForm.memo;
                    this.createForm.extension = this.createForm.extension;

                    this.$axios.post("/api/v1/create_account_address", this.createForm).then(result => {
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

                    //this.$Message.info(this.createForm.id +  "  " + this.createForm.status)
                    this.saveEdit(this.createForm)

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
