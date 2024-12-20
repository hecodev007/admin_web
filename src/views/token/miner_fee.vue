<template lang="pug">
Main.page-exchange
    tables(ref="tables", editable, searchable, :loading="loadingTable",  :search-place="top",v-model="tableData", :columns="columns",
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
            FormItem(:label='$lang("币种ID")')
                Input(v-model='createForm.token_id', , :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("消耗币种")')
                Input(v-model='createForm.fee_token_id', , :placeholder="$lang('请输入',$lang('消耗币种'))" , )
            FormItem(:label='$lang("最小")')
                Input(v-model='createForm.min', , :placeholder="$lang('请输入',$lang('最小'))")
            FormItem(:label='$lang("最大")')
                Input(v-model='createForm.max', , :placeholder="$lang('请输入',$lang('最大'))")
            FormItem(:label='$lang("推荐")')
                Input(v-model='createForm.suggest', , :placeholder="$lang('请输入',$lang('推荐'))")
            FormItem(:label='$lang("归集最大矿工费")')
                Input(v-model='createForm.max_autocollect', , :placeholder="$lang('请输入',$lang('归集最大矿工费'))")
            FormItem(:label='$lang("gas限制")')
                Input(v-model='createForm.gas_limit', , :placeholder="$lang('请输入',$lang('gas限制'))")

    // 查看信息
    Modal.page-exchange-detail(v-model="detialWinSatus", :title="createForm.token_id")
        Row
          Col(span="6" style="text-align:left") {{$lang("ID")}}：
          Col(span="14") {{createForm.id}}
        Row
          Col(span="6" style="text-align:left") {{$lang("币种ID")}}：
          Col(span="14") {{createForm.token_id}}
        Row
          Col(span="6" style="text-align:left") {{$lang("消耗币种")}}：
          Col(span="14") {{createForm.fee_token_id}}
        Row
          Col(span="6" style="text-align:left") {{$lang("最小")}}：
          Col(span="14") {{createForm.min}}
        Row
          Col(span="6" style="text-align:left") {{$lang("最大")}}：
          Col(span="14") {{createForm.max}}
        Row
          Col(span="6" style="text-align:left") {{$lang("推荐")}}：
          Col(span="14") {{createForm.suggest}}
        Row
          Col(span="6" style="text-align:left") {{$lang("归集最大矿工费")}}：
          Col(span="14") {{createForm.max_autocollect}}
        Row
          Col(span="6" style="text-align:left") {{$lang("gas限制")}}：
          Col(span="14") {{createForm.gas_limit}}

        template(slot="footer")
          Button(type="primary" long @click="detialWinSatus=false") {{$lang("确定")}}
</template>

<script>
    import Tables from '@/components/tables'
    //import { getTableData } from '@/api/api'
    export default {
        name: 'MinerFee',
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
                    token_id: "",
                },
                columns: [
                    {title: '',width: 60,align: 'center',type: 'selection'},
                    {title: this.$lang('币种ID'), key: 'token_id', editable: true},
                    {title: this.$lang('消耗币种'), key: 'fee_token_id', editable: true},
                    {title: this.$lang('最小'), key: 'min', editable: true},
                    {title: this.$lang('最大'), key: 'max', editable: true},
                    {title: this.$lang('推荐'), key: 'suggest', editable: true},
                    {title: this.$lang('归集最大矿工费'), key: 'max_autocollect', editable: true},
                    {title: this.$lang('gas限制'), key: 'gas_limit', editable: true},
                    {
                        title: this.$lang('操作'),
                        key: 'handle',
                        minWidth: 80,
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
                searchOptions:["token_id"],
                selectDataStore:[],
                creatWinStatus: false,
                detialWinSatus: false,
                // create创建 / edit修改
                nextType: "",
                createForm: {
                    id: "",
                    token_id: "",
                    fee_token_id: "",
                    min: "",
                    max: "",
                    suggest:"",
                    max_autocollect: "",
                    gas_limit: "",
                },
                editForm: {
                    id: "",
                    token_id: "",
                    fee_token_id: "",
                    min: "",
                    max: "",
                    suggest:"",
                    max_autocollect: "",
                    gas_limit: "",
                },
                deleteForm:{
                    ids:[]
                }
            }
        },
        methods: {
            loadData() {
                this.loadingTable = true;
                this.$axios.get("/api/v1/miner_fee", {params: this.requestDataForm}).then(result => {
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
                //this.$Message.info('selectItem ok');
                this.selectDataStore.push(row)
            },
            cancelItem(selection, row) {
                //this.$Message.info('cancelItem ok');
                this.selectDataStore.forEach((item, index) => {
                    if (item.id === row.id) {      //ID，所以拿来做判断条件
                        this.selectDataStore.splice(index, 1)
                    }
                })
            },
            selectItemAll(selection) {
                //this.$Message.info('selectItemAll ok');
                this.selectDataStore = []
                this.selectDataStore = this.selectDataStore.concat(selection)
            },
            selectChange(selection) {
                //this.$Message.info('selectChange ok');
                if (!selection.length) {
                    let arr1 = this.selectDataStore
                    let arr2 = this.tableData
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
                this.requestDataForm.current = 1;
                this.$axios.get("/api/v1/miner_fee", {params: this.requestDataForm}).then(result => {
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
            deleteSelected(value) {
                this.$axios.post("/api/v1/delete_miner_fee", value).then(result => {
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
                this.createForm.gas_limit = String(this.createForm.gas_limit)
                this.$axios.put("/api/v1/update_miner_fee", this.createForm).then(result => {
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
                //this.$Message.info(params.key + " " + params.value);
                this.saveEdit();

            },
            doNext() {
                if (this.nextType == "create"){
                    this.createForm.gas_limit = String(this.createForm.gas_limit)
                    this.$axios.post("/api/v1/create_miner_fee", this.createForm).then(result => {
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
                    this.saveEdit()

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
