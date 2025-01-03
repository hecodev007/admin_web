<template lang="pug">
  Main.page-exchange
    tables(ref="tables", editable, searchable, :loading="loadingTable", :deleteable="deleteable", :addable="addable" ,:search-place="top",v-model="tableData", :columns="columns",
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
        FormItem(:label='$lang("类型")')
          Input(v-model='createForm.type', , :placeholder="$lang('请输入','类型')", :disabled="nextType=='edit'")
        FormItem(:label='$lang("订单ID")')
          Input(v-model='createForm.order_id', , :placeholder="$lang('请输入',$lang('订单ID'))", :disabled="nextType=='edit'")
        FormItem(:label='"重试次数"')
          Input(v-model='createForm.retyr_count', , :placeholder="$lang('请输入','重试次数')")
        FormItem(:label='$lang("状态")')
          Input(v-model='createForm.status', , :placeholder="$lang('请输入','状态')")
    // 查看信息
    Modal.page-exchange-detail(v-model="detialWinSatus", :title="createForm.ID")
      Row
        Col(span="6" style="text-align:left") {{$lang("ID")}}：
        Col(span="14") {{createForm.id}}
      Row
        Col(span="6" style="text-align:left") 通知类型：
        Col(span="14") {{createForm.type}}
      Row
        Col(span="6" style="text-align:left") {{$lang("订单ID")}}：
        Col(span="14") {{createForm.order_id}}
      Row
        Col(span="6" style="text-align:left") 重试次数：
        Col(span="14") {{createForm.retyr_count}}
      Row
        Col(span="6" style="text-align:left") 状态：
        Col(span="14") {{createForm.status}}

      template(slot="footer")
        Button(type="primary" long @click="detialWinSatus=false") {{$lang("确定")}}
</template>

<script>
const STATUS = {
  0: "已创建",
  1: "充值可交易",
  2: "充值可提现",
  3: "提现成功",
  4: "充值已链上确认",
  5: "gas通知成功",
  11: "充值可交易重试中",
  12: "充值可提现重试中",
  13: "提现重试",
  14: "充值已上链重试",
  15: "gas 重试",
  100: "失败"
}
const TYPE = {
  1: "充值",
  2: "提现",
  3: "通知gas消耗"
}
import Tables from '@/components/tables'
//import { getTableData } from '@/api/api'
export default {
  name: 'NotifyOrder',
  components: {
    Tables
  },
  data() {
    return {
      top: "top",
      loading: true,
      loadingTable: true,
      deleteable: false,
      addable: false,
      total: 0,
      requestDataForm: {
        current: 1,
        page_size: 20,
        type: 0,
        order_id: 0,
        retyr_count: 0,
        status: -1,
      },
      columns: [
        {title: '通知类型', key: 'type'},
        {title: '订单ID', key: 'order_id'},
        {title: '重试次数', key: 'retyr_count'},
        {title: '订单状态', key: 'status'},
        {
          title: '操作', minWidth: 80,
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
      searchOptions: ["type", "order_id", "status"],
      selectDataStore: [],
      creatWinStatus: false,
      detialWinSatus: false,
      // create创建 / edit修改
      nextType: "",
      createForm: {
        id: "",
        type: 0,
        order_id: 0,
        retyr_count: 0,
        status: 0,
      },
      editForm: {
        id: "",
        type: 0,
        order_id: 0,
        retyr_count: 0,
        status: 0,

      },
    }
  },
  methods: {
    reset() {
      this.requestDataForm = {
        current: 1,
        page_size: 20,
        type: 0,
        order_id: 0,
        retyr_count: 0,
        status: -1,
      }
    },
    loadData() {
      this.loadingTable = true;
      this.$axios.get("/api/v1/notify_order", {params: this.requestDataForm}).then(result => {
        this.loadingTable = false;
        this.loading = false;
        setTimeout(() => {
          this.loading = true;
        }, 200);
        if (result.code === 10000) {
          this.tableData = result.data ? result.data : [];
          this.total = result.total;
          this.tableData.forEach(function (c) {
            c['type'] = TYPE[c['type']];
            c['status'] = STATUS[c['status']];
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
    handleDeleteSelected() {
      var ids = new Array()
      for (var i = 0; i < this.selectDataStore.size(); i++) {
        ids.push(this.selectDataStore[i].id)
      }
      this.deleteSelected(ids);
    },
    handleSearch(searchKey, searchValue) {
      this.reset();
      //this.loadingTable = true;
      if (searchKey === 'type') {
        const statusKey = Object.keys(TYPE).find(key => TYPE[key] === searchValue);
        if (statusKey !== undefined) {
          this.requestDataForm.type = parseInt(statusKey);
        }
      }
      if (searchKey === 'order_id') {
        this.requestDataForm.order_id = Number(searchValue);
      }
      if (searchKey === 'status') {
        const statusKey = Object.keys(STATUS).find(key => STATUS[key] === searchValue);
        if (statusKey !== undefined) {
          this.requestDataForm.status = parseInt(statusKey);
        }
      }
      this.requestDataForm.current = 1;
      this.$axios.get("/api/v1/notify_order", {params: this.requestDataForm}).then(result => {
        this.loadingTable = false;
        this.loading = false;
        setTimeout(() => {
          this.loading = true;
        }, 200);
        if (result.code === 10000) {
          this.tableData = result.data ? result.data : [];
          this.total = result.total;
          this.tableData.forEach(function (c) {
            c['type'] = TYPE[c['type']];
            c['status'] = STATUS[c['status']];
          })
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
      this.$axios.post("/api/v1/delete_notify_order", ids).then(result => {
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
        } else {
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
      this.editForm.type = Number(this.createForm.type);
      this.editForm.order_id = Number(this.createForm.order_id);
      this.editForm.status = Number(this.createForm.status);
      this.editForm.retyr_count = Number(this.createForm.retyr_count);

      this.$axios.put("/api/v1/update_notify_order", this.editForm).then(result => {
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
      this.saveEdit();

    },
    doNext() {
      if (this.nextType == "create") {
        this.createForm.type = Number(this.createForm.type)
        this.createForm.order_id = Number(this.createForm.order_id)
        this.createForm.type = Number(this.createForm.type)
        this.createForm.status = Number(this.createForm.status)
        this.createForm.retyr_count = Number(this.createForm.retyr_count);
        this.$axios.post("/api/v1/create_notify_order", this.createForm).then(result => {
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
