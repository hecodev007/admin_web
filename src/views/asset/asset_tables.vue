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
        FormItem(:label='$lang("币种ID")')
          Input(v-model='createForm.token_id', , :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
        FormItem(:label='$lang("地址")')
          Input(v-model='createForm.address', , :placeholder="$lang('请输入',$lang('地址'))" , :disabled="nextType=='edit'")
        FormItem(:label='$lang("钱包类型")')
          Input(v-model='createForm.owner', , :placeholder="$lang('请输入',$lang('钱包类型'))", :disabled="nextType=='edit'")
        FormItem(:label='$lang("balance")')
          Input(v-model='createForm.balance', , :placeholder="$lang('请输入',$lang('balance'))", :disabled="nextType=='edit'")
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
        Col(span="6" style="text-align:left") {{$lang("地址")}}：
        Col(span="14") {{createForm.address}}
      Row
        Col(span="6" style="text-align:left") {{$lang("钱包类型")}}：
        Col(span="14") {{createForm.owner}}
      Row
        Col(span="6" style="text-align:left") {{$lang("balance")}}：
        Col(span="14") {{createForm.balance}}
      Row
        Col(span="6" style="text-align:left") {{$lang("orgId")}}：
        Col(span="14") {{createForm.org_id}}
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
  name: 'AssetTables',
  components: {
    Tables
  },
  data() {
    return {
      top: "top",
      loading: true,
      loadingTable: true,
      // searchable: true,
      total: 0,
      requestDataForm: {
        current: 1,
        page_size: 20,
        token_id: "",
        address:"",
        owner:"",
      },
      columns: [
        {title: '',width: 60,align: 'center',type: 'selection'},
        {title: this.$lang('币种ID'), key: 'token_id'},
        {title: this.$lang('地址'), key: 'address', minWidth: 150},
        {title: this.$lang('钱包类型'), key: 'wallet_owner'},
        {title: this.$lang('balance'), key: 'balance', sortable: true},
        {title: 'orgId', key: 'org_id'},
        {title: this.$lang('状态'), key: 'status', editable: true},
        {
          title: this.$lang('操作'),
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
      searchOptions:["token_id","address", "wallet_owner"],
      selectDataStore:[],
      creatWinStatus: false,
      detialWinSatus: false,
      // create创建 / edit修改
      nextType: "",
      createForm: {
        id: "",
        token_id: "",
        address: "",
        owner: 0,
        balance: "",
        status: 0,
        org_id:0,
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
      this.$axios.get("/api/v1/assets", {params: this.requestDataForm}).then(result => {
        this.loadingTable = false;
        this.loading = false;
        setTimeout(() => {
          this.loading = true;
        }, 200);
        if (result.code === 10000) {
          this.tableData = result.data ? result.data : [];
          this.total = result.total;
          this.tableData.forEach(function (c) {
            if(c['owner'] == 1){
              c['wallet_owner'] = "个人";
            }
            else if(c['owner'] == 2){
              c['wallet_owner'] = "热钱包";
            }
            else if(c['owner'] == 3){
              c['wallet_owner'] = "冷钱包";
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
      if( searchKey === 'token_id'){
        this.requestDataForm.token_id = searchValue;
      }
      if( searchKey === 'address'){
        this.requestDataForm.address = searchValue;
      }
      if( searchKey === 'wallet_owner'){
        if(searchValue === '个人'){
          this.requestDataForm.owner = 1;
        }
        else if(searchValue === '热钱包'){
          this.requestDataForm.owner = 2;
        }
        else if(searchValue === '冷钱包'){
          this.requestDataForm.owner = 3;
        }
      }
      this.requestDataForm.current = 1;
      this.$axios.get("/api/v1/assets", {params: this.requestDataForm}).then(result => {
        this.loadingTable = false;
        this.loading = false;
        setTimeout(() => {
          this.loading = true;
        }, 200);
        if (result.code === 10000) {
          this.tableData = result.data ? result.data : [];

          this.tableData.forEach(function (c) {
            if(c['owner'] == 1){
              c['wallet_owner'] = "个人";
            }
            else if(c['owner'] == 2){
              c['wallet_owner'] = "热钱包";
            }
            else if(c['owner'] == 3){
              c['wallet_owner'] = "冷钱包";
            }
          })
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
      this.$axios.post("/api/v1/delete_asset", ids).then(result => {
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
      this.$axios.put("/api/v1/update_asset", this.editForm).then(result => {
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
        this.createForm.status = Number(this.createForm.status);
        this.createForm.owner = Number(this.createForm.owner);
        this.$axios.post("/api/v1/create_asset", this.createForm).then(result => {
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
