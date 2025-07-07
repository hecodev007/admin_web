<template lang="pug">
Main.page-exchange
    tables(ref="tables", editable, searchable, :addable="addable", :deleteable="deleteable", :loading="loadingTable", :search-place="top",v-model="tableData", :columns="columns",
      :searchOptions="searchOptions", @on-search="handleSearch"
      @on-select-all="selectItemAll" @on-select="selectItem"  @on-select-cancel="cancelItem" @on-selection-change="selectChange"
      @on-delete-selected="handleDeleteSelected")
    Row
        Col(span="12")
            Button(style={margin: '10px 0'} type="primary" @click="exportExcel") 导出为Csv文件
        Col(span="8" style="text-align:right")
            Page(style={margin: '10px 0'}  :current.sync="requestDataForm.current", :total="total", :pageSize="requestDataForm.page_size" @on-change="loadData")

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
          Col(span="6" style="text-align:left") {{$lang("交易所订单ID")}}：
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
          Button(type="primary" long @click="handleApproval") {{$lang(type === 'approval' ? "审核通过" : "审核拒绝")}}
</template>

<script>
const STATUS = {
  0: "已创建",
  1: "已过风控",
  11: "没过风控",
  2: "已发送给 ChainNode",
  12: "ChainNode返回失败",
  4: "已上链",
  14: "上链失败",
  8: "等待baas拉取处理该订单",
  16: "重试订单",
  18: "baas 处理订单失败",

  90: "can refund to user",
  100: "已完成",
  101: "手动取消",
  102: "OrderInvalid",
  103: "链上执行失败",

  104: "退还给用户",
  105: "扣了手续费",

}
    import Tables from '@/components/tables'
    //import { getTableData } from '@/api/api'
    export default {
        name: 'WithdrawalApprove',
        components: {
            Tables
        },
        data() {
            return {
                type: "approval",
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
                    "uid": "",
                },
                columns: [
                    {title: '币种ID', key: 'token_id'},
                    {title: 'uid', key: 'uid'},
                    {title: 'From', key: 'from', minWidth: 80},
                    {title: 'To', key: 'to', minWidth: 80},
                    {title: '交易hash', key: 'tx_hash', minWidth: 100},
                    {title: '交易所订单ID', key: 'broker_order_id'},
                    {title: '确认数', key: 'confirm'},
                    {title: '区块高度', key: 'block_height'},
                    {title: '金额', key: 'amount'},
                    {title: '手续费', key: 'cost_fee'},
                    {title: '提现类型', key: 'type'},
                    {title: '状态', key: 'status',minWidth: 50, editable: true},
                    {
                        title: '操作',minWidth: 120,
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
                                                this.type = "approval";
                                            }
                                        }
                                    }, '通过'),
                                    h('Button', {
                                        props: {
                                            type: "primary"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                // this.creatWinStatus = true;
                                                // this.nextType = "edit";
                                                // Object.assign(this.createForm, params.row);
                                                this.detialWinSatus = true;
                                                Object.assign(this.createForm, params.row);
                                                this.type = "reject";
                                            }
                                        }
                                    }, '拒绝')
                                ])
                            }
                        ]
                    }
                ],
                tableData: [],
                searchOptions:["token_id","from", "to", "tx_hash", "broker_order_id", "status", "uid"],
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
                    "uid": "",
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
          reset() {
            this.requestDataForm={
              current: 1,
                  page_size: 20,
                  token_id: "",
                  type:2,
                  from:"",
                  to:"",
                  tx_hash:"",
                  broker_order_id:"",
                  status: -1,
                  "uid": "",
            }
          },
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
                this.reset();
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
                if( searchKey === 'uid'){
                    this.requestDataForm.uid = searchValue;
                }
                if( searchKey === 'status'){
                  const statusKey = Object.keys(STATUS).find(key => STATUS[key] === searchValue);
                  if (statusKey !== undefined) {
                    this.requestDataForm.status = Number(statusKey);
                  }
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
            exportExcel() {
                this.$refs.tables.exportCsv({
                    filename: `table-${(new Date()).valueOf()}.csv`
                })
            },
            handleApproval() {
                this.$axios.put(this.type === 'approval' ? "/api/v1/approval_order" : "/api/v1/reject_order", this.editForm).then(result => {
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 200);

                    if (result.code == 10000) {
                        this.$Notice.success({
                            title: this.$lang("操作成功"),
                            duration: 2
                        });
                        this.creatWinStatus = false;
                    }else{
                        this.$Notice.error({
                            title: this.$lang("操作失败"),
                            duration: 2
                        });
                        this.creatWinStatus = false;
                    }
                    this.loadData();
                });
            }
        },
        mounted() {
            this.loadData()
        }
    }
</script>

<style>

</style>
