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
            FormItem(:label='"AddressMemo"')
                Input(v-model='createForm.address_memo', , :placeholder="$lang('请输入','AddressMemo')")
            FormItem(:label='"IsMemo"')
                Input(v-model='createForm.is_memo', , :placeholder="$lang('请输入','IsMemo')")
            FormItem(:label='$lang("Extension")')
                Input(v-model='createForm.extension', , :placeholder="$lang('请输入',$lang('Extension'))")
    // 查看信息
    Modal.page-exchange-detail(v-model="detialWinSatus", :title="createForm.address_memo")
        Row
          Col(span="6" style="text-align:left") {{$lang("ID")}}：
          Col(span="14") {{createForm.id}}
        Row
          Col(span="6" style="text-align:left") AccountId：
          Col(span="14") {{createForm.address_memo}}
        Row
          Col(span="6" style="text-align:left") IsMemo：
          Col(span="14") {{createForm.is_memo}}
        Row
          Col(span="6" style="text-align:left") {{$lang("Extension")}}：
          Col(span="14") {{createForm.extension}}

        template(slot="footer")
          Button(type="primary" long @click="detialWinSatus=false") {{$lang("确定")}}
</template>

<script>
    import Tables from '@/components/tables'
    //import { getTableData } from '@/api/api'
    export default {
        name: 'BlackList',
        components: {
            Tables
        },
        data() {
            return {
                top: "top",
                loading: true,
                loadingTable: true,
                deleteable:true,
                addable : true,
                total: 0,
                requestDataForm: {
                    current: 1,
                    page_size: 20,
                    token_type: 0,
                    account_id: "",
                    address: "",
                },
                columns: [
                    {title: '',width: 60,align: 'center',type: 'selection'},
                    {title: 'ID', key: 'id'},
                    {title: 'AddressMemo', key: 'address_memo', minWidth: 200},
                    {title: 'IsMemo', key: 'is_memo'},
                    {title: 'Extension', key: 'extension'},
                    {
                        title: this.$lang('操作'), minWidth: 100,
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
                                },*/ [
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
                searchOptions:["address_memo"],
                selectDataStore:[],
                creatWinStatus: false,
                detialWinSatus: false,
                // create创建 / edit修改
                nextType: "",
                createForm: {
                    id: 0,
                    address_memo: "",
                    IsMemo: 0,
                    extension: "",
                },
                editForm: {
                    id: 0,
                    address_memo: "",
                    IsMemo: 0,
                    extension: "",

                },
                deleteForm:{
                    ids:[]
                }
            }
        },
        methods: {
            loadData() {
                this.loadingTable = true;
                this.$axios.get("/api/v1/black_list", {params: this.requestDataForm}).then(result => {
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
                if( searchKey === 'address_memo'){
                    this.requestDataForm.address_memo = searchValue;
                }

                this.requestDataForm.current = 1;
                this.$axios.get("/api/v1/black_list", {params: this.requestDataForm}).then(result => {
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
                this.$axios.post("/api/v1/delete_black_list", ids).then(result => {
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
                this.editForm.address_memo = String(this.createForm.address_memo);
                this.editForm.extension = this.createForm.extension;

                if (this.editForm.is_memo == "false" || this.editForm.is_memo == "0")
                    this.editForm.is_memo = false;
                else
                    this.editForm.is_memo = true;

                this.$axios.put("/api/v1/update_black_list", this.editForm).then(result => {
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
                    this.createForm.address_memo = String(this.createForm.address_memo);

                    this.createForm.extension = this.createForm.extension;

                    if (this.createForm.is_memo == "false" || this.createForm.need_memo == "0")
                        this.createForm.is_memo = false;
                    else
                        this.createForm.is_memo = true;

                    this.$axios.post("/api/v1/create_black_list", this.createForm).then(result => {
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
