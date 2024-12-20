<template lang="pug">
Main.page-exchange
    tables(ref="tables", editable, searchable, :deleteable="deleteable",:loading="loadingTable", :search-place="top",v-model="tableData", :columns="columns",
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
                Input(v-model='createForm.token_id', , :placeholder="$lang('请输入',$lang('币种ID'))")
            FormItem(:label='$lang("旧合约地址")')
                Input(v-model='createForm.old_contract', , :placeholder="$lang('请输入',$lang('旧合约地址'))" )
            FormItem(:label='$lang("新合约地址")')
                Input(v-model='createForm.new_contract', , :placeholder="$lang('请输入',$lang('新合约地址'))")
            FormItem(:label='$lang("旧合约资产")', v-if="nextType == 'edit'")
                Input(v-model='createForm.old_total_balance', , :placeholder="$lang('请输入',$lang('旧合约资产'))" )
            FormItem(:label='$lang("旧合约链上资产")', v-if="nextType == 'edit'")
                Input(v-model='createForm.old_chain_total_balance', , :placeholder="$lang('请输入',$lang('旧合约链上资产'))")
            FormItem(:label='$lang("分割区块高度")')
                Input(v-model='createForm.record_height', , :placeholder="$lang('请输入',$lang('分割区块高度'))")
            FormItem(:label='$lang("新合约资产")', v-if="nextType == 'edit'")
                Input(v-model='createForm.new_total_balance', , :placeholder="$lang('请输入',$lang('新合约资产'))" )
            FormItem(:label='$lang("新合约链上资产")', v-if="nextType == 'edit'")
                Input(v-model='createForm.new_chain_total_balance', , :placeholder="$lang('请输入',$lang('新合约链上资产'))")
            FormItem(:label='$lang("进度")', v-if="nextType == 'edit'")
                Input(v-model='createForm.step', , :placeholder="$lang('请输入',$lang('进度'))")

    // 查看信息
    Modal.page-exchange-detail(v-model="detialWinSatus", :title="createForm.token_id")
        Row
          Col(span="10" style="text-align:left") {{$lang("ID")}}：
          Col(span="14") {{createForm.id}}
        Row
          Col(span="10" style="text-align:left") {{$lang("币种ID")}}：
          Col(span="14") {{createForm.token_id}}
        Row
          Col(span="10" style="text-align:left") {{$lang("旧合约地址")}}：
          Col(span="14") {{createForm.old_contract}}
        Row
          Col(span="10" style="text-align:left") {{$lang("新合约地址")}}：
          Col(span="14") {{createForm.new_contract}}
        Row
          Col(span="10" style="text-align:left") {{$lang("旧合约资产")}}：
          Col(span="14") {{createForm.old_total_balance}}
        Row
          Col(span="10" style="text-align:left") {{$lang("旧合约链上资产")}}：
          Col(span="14") {{createForm.old_chain_total_balance}}
        Row
          Col(span="10" style="text-align:left") {{$lang("分割区块高度")}}：
          Col(span="14") {{createForm.record_height}}
        Row
          Col(span="10" style="text-align:left") {{$lang("新合约资产")}}：
          Col(span="14") {{createForm.new_total_balance}}
        Row
          Col(span="10" style="text-align:left") {{$lang("新合约链上资产")}}：
          Col(span="14") {{createForm.new_chain_total_balance}}
        Row
          Col(span="10" style="text-align:left") {{$lang("进度")}}：
          Col(span="14") {{createForm.step}}
    // 查看信息
        template(slot="footer")
          Button(type="primary" long @click="detialWinSatus=false") {{$lang("确定")}}

          // step
    Modal.page-exchange-win(v-model="stepSatus",  :title="'第 '+ createForm.step + ' 步'" @on-ok="doNextStep" :loading="loading")
        Row
          Col(span="10" style="text-align:left") {{$lang("ID")}}：
          Col(span="14") {{createForm.id}}
        Row
          Col(span="10" style="text-align:left") {{$lang("币种ID")}}：
          Col(span="14") {{createForm.token_id}}
        Row(v-if="createForm.step == 1 || createForm.step == 2")
          Col(span="24" style="text-align:left") 1、暂停旧合约币种的充提币（已完成） <br> 2、对账<br>（1）钱包与平台对账（人工确认）<br>（2）钱包旧合约资产与链上旧合约资产<br> 3、计算总额：计算旧合约币种总额A <br>
        Row(v-if="createForm.step == 3")
          Col(span="24" style="text-align:left") 4、清零：对所有旧合约币种资产进行冲账清零操作
        Row(v-if="createForm.step == 4")
          Col(span="24" style="text-align:left") 5、添加合约更换记录：钱包后台录入币种的合约更换记录，到 change_contract_deposit_record 表中。需要记录分割线区块高度（小于分割线区块高度的不做通知充值处理）<br>（1）项目方主导：<br>旧合约与新合约对账，两者完全相等后并开始以下工作。否则重复对比<br>（2）交易所主导：<br> 由更换合约发起人，充值新合约币种总额B=A，到指定地址。人工校验
        Row(v-if="createForm.step == 5 || createForm.step == 6 || createForm.step == 7")
          Col(span="24" style="text-align:left") 6、平台也记录更换合约记录，保存分割线区块高度<br> 7、token表更换合约地址（钱包+风控）<br> 8、重放 交易所/项目方 充值/空投交易，确认总额B ==A
        //Row(v-if="createForm.step == 6")
          //Col(span="24" style="text-align:left") 7、token表更换合约地址（钱包+风控）
        //Row(v-if="createForm.step == 7")
          //Col(span="24" style="text-align:left") 8、重放 交易所/项目方 充值/空投交易，确认总额B ==A
        Row(v-if="createForm.step == 8")
          Col(span="24" style="text-align:left") 9、开放新币种充提币



</template>

<script>
    import Tables from '@/components/tables'
    //import { getTableData } from '@/api/api'
    export default {
        name: 'ChangeContract',
        components: {
            Tables
        },
        data() {
            return {
                top: "top",
                loading: true,
                loadingTable: true,
                deleteable: false,
                total: 0,
                requestDataForm: {
                    current: 1,
                    page_size: 20,
                    token_id: "",
                    old_contract: "",
                    new_contract: "",
                },
                columns: [
                    {title: '币种ID', key: 'token_id'},
                    {title: '旧合约地址', key: 'old_contract'},
                    {title: '新合约地址', key: 'new_contract'},
                    {title: '旧合约资产', key: 'old_total_balance'},
                    {title: '旧合约链上资产', key: 'old_chain_total_balance'},
                    {title: '分割区块高度', key: 'record_height'},
                    {title: '新合约资产', key: 'new_total_balance'},
                    {title: '新合约链上资产', key: 'new_chain_total_balance'},
                    {title: '进度', key: 'step'},
                    {
                        title: '结果', key: 'step', render: function (h, params) {
                            return h(
                                "img",
                                {
                                    attrs: {
                                        src:
                                            params.row.step == 9 ? require('../../assets/check.svg') : require('../../assets/error.svg')
                                    }
                                },
                            );
                        }
                    },
                    {
                        title: '操作', minWidth: 80,
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
                                                this.stepSatus = true;
                                                Object.assign(this.createForm, params.row);
                                            }
                                        }
                                    }, params.row.step == 9 ? '完成' : '下一步'),
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
                searchOptions: ["token_id", "old_contract", "new_contract"],
                selectDataStore: [],
                creatWinStatus: false,
                detialWinSatus: false,
                stepSatus: false,
                // create创建 / edit修改
                nextType: "",
                createForm: {
                    id: "",
                    token_id: "",
                    old_contract: "",
                    new_contract: "",
                    old_total_balance: "",
                    old_chain_total_balance: "",
                    record_height: "",
                    new_total_balance: "",
                    new_chain_total_balance: "",
                    step: "",
                },
                deleteForm: {
                    ids: []
                }
            }
        },
        methods: {
            loadData() {
                this.loadingTable = true;
                this.$axios.get("/api/v1/change_contract", {params: this.requestDataForm}).then(result => {
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
            handleDeleteSelected() {
                this.deleteForm.ids = []
                this.selectDataStore.forEach((item, index) => {
                    this.deleteForm.ids.push(item.id)
                })
                this.deleteSelected(this.deleteForm);
                this.selectDataStore = []
            },
            handleSearch(searchKey, searchValue) {
                //this.loadingTable = true;
                if (searchKey === 'token_id') {
                    this.requestDataForm.token_id = searchValue;
                }
                if (searchKey === 'old_contract') {
                    this.requestDataForm.old_contract = searchValue;
                }
                if (searchKey === 'new_contract') {
                    this.requestDataForm.new_contract = searchValue;
                }

                this.requestDataForm.current = 1;
                this.$axios.get("/api/v1/change_contract", {params: this.requestDataForm}).then(result => {
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
            handleAddRow() {
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
            saveEdit() {
                this.createForm.new_chain_total_balance = String(this.createForm.new_chain_total_balance)
                this.createForm.new_total_balance = String(this.createForm.new_total_balance)
                this.createForm.step = Number(this.createForm.step)
                this.createForm.record_height = Number(this.createForm.record_height)
                this.$axios.put("/api/v1/update_change_contract", this.createForm).then(result => {
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
                    } else {
                        this.$Notice.error({
                            title: this.$lang("修改失败"),
                            duration: 2
                        });
                        this.creatWinStatus = false;
                    }
                    this.loadData();
                });
            },
            handleSaveEdit(params) {
                Object.assign(this.createForm, params.data);
                this.createForm[params.key] = params.value;
                //this.$Message.info(params.key + " " + params.value);
                this.saveEdit();

            },
            doNext() {
                if (this.nextType == "create") {
                    this.createForm.record_height = Number(this.createForm.record_height);
                    this.createForm.step = Number(this.createForm.step);
                    this.$axios.post("/api/v1/create_change_contract", this.createForm).then(result => {
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
                        } else {
                            this.$Notice.error({
                                title: this.$lang("新增失败"),
                                duration: 2
                            });
                            this.creatWinStatus = false;
                        }
                        this.loadData();
                    });
                } else {
                    this.saveEdit()

                }
            },
            doNextStep() {
                if (this.createForm.step == 1 || this.createForm.step == 2) {
                    this.$axios.post("/api/v1/change_contract_check_old_asset", this.createForm).then(result => {
                        this.loading = false;
                        setTimeout(() => {
                            this.loading = true;
                        }, 200);

                        if (result.code == 10000) {
                            this.$Notice.success({
                                title: this.$lang("成功"),
                                duration: 2
                            });
                            this.creatWinStatus = false;
                        } else {
                            this.$Notice.error({
                                title: this.$lang("失败"),
                                duration: 2
                            });
                            this.creatWinStatus = false;
                        }
                        this.loadData();
                    });
                }
                if (this.createForm.step == 3) {
                    this.$axios.post("/api/v1/change_contract_clear_asset", this.createForm).then(result => {
                        this.loading = false;
                        setTimeout(() => {
                            this.loading = true;
                        }, 200);

                        if (result.code == 10000) {
                            this.$Notice.success({
                                title: this.$lang("成功"),
                                duration: 2
                            });
                            this.creatWinStatus = false;
                        } else {
                            this.$Notice.error({
                                title: this.$lang("失败"),
                                duration: 2
                            });
                            this.creatWinStatus = false;
                        }
                        this.loadData();
                    });
                }
                if (this.createForm.step == 4) {
                    this.$axios.post("/api/v1/change_contract_check_new_onchain_asset", this.createForm).then(result => {
                        this.loading = false;
                        setTimeout(() => {
                            this.loading = true;
                        }, 200);

                        if (result.code == 10000) {
                            this.$Notice.success({
                                title: this.$lang("成功"),
                                duration: 2
                            });
                            this.creatWinStatus = false;
                        } else {
                            this.$Notice.error({
                                title: this.$lang("失败"),
                                duration: 2
                            });
                            this.creatWinStatus = false;
                        }
                        this.loadData();
                    });
                }
                if (this.createForm.step == 5 || this.createForm.step == 6 || this.createForm.step == 7) {
                    this.$axios.post("/api/v1/change_contract_use_check_new_asset", this.createForm).then(result => {
                        this.loading = false;
                        setTimeout(() => {
                            this.loading = true;
                        }, 200);

                        if (result.code == 10000) {
                            this.$Notice.success({
                                title: this.$lang("成功"),
                                duration: 2
                            });
                            this.creatWinStatus = false;
                        } else {
                            this.$Notice.error({
                                title: this.$lang("失败"),
                                duration: 2
                            });
                            this.creatWinStatus = false;
                        }
                        this.loadData();
                    });
                }
                if (this.createForm.step == 8) {
                    this.$axios.post("/api/v1/change_contract_open_deposit_withdraw", this.createForm).then(result => {
                        this.loading = false;
                        setTimeout(() => {
                            this.loading = true;
                        }, 200);

                        if (result.code == 10000) {
                            this.$Notice.success({
                                title: this.$lang("成功"),
                                duration: 2
                            });
                            this.creatWinStatus = false;
                        } else {
                            this.$Notice.error({
                                title: this.$lang("失败"),
                                duration: 2
                            });
                            this.creatWinStatus = false;
                        }
                        this.loadData();
                    });
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
