<template>
  <div>
    <div
      v-if="searchable && searchPlace === 'top'"
      class="search-con search-con-top">
      <Select
        v-model="chainId"
        class="search-col" 
        v-if="chainIds.length">
        <Option
          v-for="item in chainIds"
          :value="item.token_id"
          :key="`search-col-${item.token_id}`">{{ item.token_id }}</Option>
      </Select>
      <Select
        v-model="searchValue"
        class="search-col"
        v-if="customTokenIds.length">
        >
        <Option
          v-for="item in customTokenIds"
          :value="item.token_id"
          :key="`search-col-${item.token_id}`">{{ item.token_id }}</Option>
      </Select>
      <!-- {{searchOptions}} -->
      <!-- {{columns}} -->
      <Select
        v-model="searchKey"
        class="search-col" 
        v-if="searchOptions.length && !chainIds.length">
        <Option
          v-for="item in columns"
          v-if="searchOptions.indexOf(item.key) > -1"
          :value="item.key"
          :key="`search-col-${item.key}`">{{ item.title }}</Option>
      </Select>
      <!-- {{ searchKey }} -->
      <Input
        v-if="searchKey !== 'token_id' && searchKey !== 'wallet_owner' && searchKey !== 'status' && searchKey !== 'reason' && searchKey !== 'token_type' && searchKey !== 'type' && searchKey !== 'owner' && !chainIds.length"
        @on-change="handleClear"
        clearable
        :placeholder='$lang("关键词")'
        class="search-input"
        v-model="searchValue" ></Input>
      <Select
        v-model="searchValue"
        class="search-col"
        v-if="searchKey === 'token_id'">
        >
        <Option
          v-for="item in tokenIds"
          :value="item"
          :key="`search-col-${item}`">{{ item }}</Option>
      </Select>
      <Select
        v-model="searchValue"
        class="search-col"
        v-if="searchKey === 'wallet_owner'">
        >
        <Option
          v-for="item in walletTypes"
          :value="item"
          :key="`search-col-${item}`">{{ item }}</Option>
      </Select>
      <Select
        v-model="searchValue"
        class="search-col"
        v-if="searchKey === 'status'">
        >
        <Option
          v-for="item in status"
          :value="item"
          :key="`search-col-${item}`">{{ item }}</Option>
      </Select>
      <Select
        v-model="searchValue"
        class="search-col"
        v-if="searchKey === 'reason'">
        >
        <Option
          v-for="item in reason"
          :value="item"
          :key="`search-col-${item}`">{{ item }}</Option>
      </Select>
      <Select
        v-model="searchValue"
        class="search-col"
        v-if="searchKey === 'token_type'">
        >
        <Option
          v-for="item in tokenTypes"
          :value="item"
          :key="`search-col-${item}`">{{ item }}</Option>
      </Select>
      <Select
        v-model="searchValue"
        class="search-col"
        v-if="searchKey === 'type'">
        >
        <Option
          v-for="item in types"
          :value="item"
          :key="`search-col-${item}`">{{ item }}</Option>
      </Select>
      <Select
        v-model="searchValue"
        class="search-col"
        v-if="searchKey === 'owner'">
        >
        <Option
          v-for="item in owners"
          :value="item"
          :key="`search-col-${item}`">{{ item }}</Option>
      </Select>

      <Button
        @click="handleSearch"
        class="search-btn"
        type="primary"><Icon type="ios-search"/>&nbsp;&nbsp;{{ $lang("搜索") }}</Button>

      <Input
        v-if="customInputable === true"
        @on-change="handleCustomInput"
        clearable
        placeholder=""
        class="search-input"
        v-model="customInput"> </Input>
      <p
        v-if="customInputable === true"
        class="search-input">{{ customInputTip }}</p>

      <Button
        v-if="deleteable === true"
        style="float:right; margin: 4px"
        @click="modalDelete = true"
        class="search-btn"
        type="primary"><Icon type="ios-trash"/>&nbsp;&nbsp;{{ $lang("删除") }}</Button>
      <Modal
        v-model="modalDelete"
        title="Delete Tips"
        @on-ok="handleDeleteSelected"
        @on-cancel="modelDeleteCancel">
        <p>{{ $lang("确定要删除选中行吗") }}</p>
      </Modal>
      <Button
        v-if="addable === true"
        style="float:right; margin: 4px"
        size="large"
        type="primary"
        icon="md-add-circle"
        ghost
        @click="handleAddRow"
        class="search-btn">{{ $lang("新增") }}</Button>

    </div>
    <Table
      ref="tablesMain"
      :data="insideTableData"
      :columns="insideColumns"
      :searchOptions="searchOptions"
      :stripe="stripe"
      :border="border"
      :show-header="showHeader"
      :width="width"
      :height="height"
      :loading="loading"
      :addable="addable"
      :deleteable="deleteable"
      :customInputTip="customInputTip"
      :customInputable="customInputable"
      :searchOffline="searchOffline"
      :disabled-hover="disabledHover"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      :size="size"
      :no-data-text="noDataText"
      :no-filtered-data-text="noFilteredDataText"
      @on-add-row="handleAddRow"
      @on-search="handleSearch"
      @on-delete-selected="handleDeleteSelected"
      @on-current-change="onCurrentChange"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSortChange"
      @on-filter-change="onFilterChange"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-expand="onExpand"
    >
      <slot
        name="header"
        slot="header"/>
      <slot
        name="footer"
        slot="footer"/>
      <slot
        name="loading"
        slot="loading"/>
    </Table>
    <div
      v-if="searchable && searchPlace === 'bottom'"
      class="search-con search-con-top">
      <Select
        v-model="searchKey"
        class="search-col">
        <Option
          v-for="item in columns"
          v-if="searchOptions.indexOf(item.key) > -1 "
          :value="item.key"
          :key="`search-col-${item.key}`">{{ item.title }}</Option>
      </Select>
      <Input
        placeholder="输入关键字搜索"
        class="search-input"
        v-model="searchValue"></Input>
      <Button
        class="search-btn"
        type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
    </div>
    <a
      id="hrefToExportTable"
      style="display: none;width: 0px;height: 0px;"/>
  </div>
</template>

<script>
import TablesEdit from './edit.vue'
import handleBtns from './handle-btns'
import './index.less'

export default {
  name: 'Tables',
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    searchOptions: {
      type: Array,
      default() {
        return ["token_id"]
      }
    },
    size: String,
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    addable: {
      type: Boolean,
      default: true
    },
    customInputable: {
      type: Boolean,
      default: false
    },
    customInputTip: {
      type: String,
      default: ""
    },
    searchOffline: {
      type: Boolean,
      default: false
    },
    deleteable: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default() {
        return ''
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * @description 全局设置是否可编辑
     */
    editable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否可搜索
     */
    searchable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 搜索控件所在位置，'top' / 'bottom'
     */
    searchPlace: {
      type: String,
      default: 'top'
    },
    customTokenIds: {
      type: Array,
      default() {
        return []
      }
    },
    chainIds: {
      type: Array,
      default() {
        return []
      }
    }
  },
  /**
   * Events
   * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
   * @on-cancel-edit 返回值 {Object} 同上
   * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
   */
  data() {
    return {
      insideColumns: [],
      // searchOptions: [],
      insideTableData: [],
      edittingCellId: '',
      edittingText: '',
      searchValue: '',
      searchKey: '',
      modalDelete: false,
      // addable: true,
      // deleteable: true,
      // searchOffline : false,
      // customInputable :false,
      // customInputTip: "",
      // customInput:"",
      tokenIds: [],
      status: [],
      reason: [],
      tokenTypes: [],
      types: [],
      owners: [],
      walletTypes: ['个人', '热钱包', '冷钱包'],
      chainId: ''
    }
  },
  methods: {
    suportEdit(item, index) {
      item.render = (h, params) => {
        return h(TablesEdit, {
          props: {
            params: params,
            value: this.insideTableData[params.index][params.column.key],
            edittingCellId: this.edittingCellId,
            editable: this.editable
          },
          on: {
            'input': val => {
              this.edittingText = val
            },
            'on-start-edit': (params) => {
              this.edittingCellId = `editting-${params.index}-${params.column.key}`
              this.$emit('on-start-edit', params)
            },
            'on-cancel-edit': (params) => {
              this.edittingCellId = ''
              this.$emit('on-cancel-edit', params)
            },
            'on-save-edit': (params) => {
              this.value[params.row.initRowIndex][params.column.key] = this.edittingText
              this.$emit('input', this.value)
              this.$emit('on-save-edit', Object.assign(params, {
                id: this.insideTableData[params.index].id,
                key: params.column.key,
                value: this.edittingText,
                data: params.row
              }))
              this.edittingCellId = ''
            }
          }
        })
      }
      return item
    },
    surportHandle(item) {
      let options = item.options || []
      let insideBtns = []
      options.forEach(item => {
        if (handleBtns[item]) insideBtns.push(handleBtns[item])
      })
      let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns
      item.render = (h, params) => {
        params.tableData = this.value
        return h('div', btns.map(item => item(h, params, this)))
      }
      return item
    },
    handleColumns(columns) {
      this.insideColumns = columns.map((item, index) => {
        let res = item
        if (res.editable) res = this.suportEdit(res, index)
        if (res.key === 'handle') res = this.surportHandle(res)
        return res
      })
    },
    setDefaultSearchKey() {
      //this.searchKey = (this.columns[0].key !== 'handle' && this.columns[0].key !== '') ? this.columns[0].key : (this.columns.length > 1 ? this.columns[1].key : '')
    },
    handleClear(e) {
      if (e.target.value === '') this.insideTableData = this.value
    },
    handleSearch() {
      if (this.searchOffline === true) {
        this.insideTableData = this.value.filter(item => item[this.searchKey].indexOf(this.searchValue) > -1)
      } else {
        this.$emit('on-search', this.searchKey, this.searchValue, this.chainId)
      }
    },
    handleCustomInput() {
      this.$emit('on-CustomInput', this.customInput)
    },

    handleTableData() {
      let tokenIds = {}
      let status = {}
      let reason = {}
      let tokenTypes = {}
      let types = {}
      let owners = {}
      this.insideTableData = this.value.map((item, index) => {
        let res = item
        res.initRowIndex = index
        if (item.token_id) {
          tokenIds[item.token_id] = item.token_id
        }
        if (item.status) {
          status[item.status] = item.status
        }
        if (item.reason) {
          reason[item.reason] = item.reason
        }
        if (item.token_type) {
          tokenTypes[item.token_type] = item.token_type
        }
        if (item.type) {
          types[item.type] = item.type
        }
        if (item.owner) {
          owners[item.owner] = item.owner
        }
        return res
      })
      this.tokenIds = this.tokenIds.length === 0 ? Object.keys(tokenIds).sort((a, b) => a.localeCompare(b)) : this.tokenIds
      this.status = this.status.length === 0 ? Object.keys(status) : this.status
      this.reason = this.reason.length === 0 ? Object.keys(reason) : this.reason
      this.tokenTypes = this.tokenTypes.length === 0 ? Object.keys(tokenTypes) : this.tokenTypes
      this.types = this.types.length === 0 ? Object.keys(types) : this.types
      this.owners = this.owners.length === 0 ? Object.keys(owners) : this.owners
    },
    exportCsv(params) {
      this.$refs.tablesMain.exportCsv(params)
    },
    clearCurrentRow() {
      this.$refs.talbesMain.clearCurrentRow()
    },
    handleAddRow() {
      this.$emit('on-add-row')
    },
    handleDeleteSelected() {
      this.$emit('on-delete-selected')
    },
    modelDeleteCancel() {
      //this.$Message.info('Clicked cancel');
    },
    onCurrentChange(currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow)
    },
    onSelect(selection, row) {
      this.$emit('on-select', selection, row)
    },
    onSelectCancel(selection, row) {
      this.$emit('on-select-cancel', selection, row)
    },
    onSelectAll(selection) {
      this.$emit('on-select-all', selection)
    },
    onSelectionChange(selection) {
      this.$emit('on-selection-change', selection)
    },
    onSortChange(column, key, order) {
      this.$emit('on-sort-change', column, key, order)
    },
    onFilterChange(row) {
      this.$emit('on-filter-change', row)
    },
    onRowClick(row, index) {
      this.$emit('on-row-click', row, index)
    },
    onRowDblclick(row, index) {
      this.$emit('on-row-dblclick', row, index)
    },
    onExpand(row, status) {
      this.$emit('on-expand', row, status)
    },

  },
  watch: {
    columns(columns) {
      this.handleColumns(columns)
      this.setDefaultSearchKey()
    },
    value(val) {
      this.handleTableData()
      //if (this.searchable && this.searchKey != '' && this.searchValue != '') this.handleSearch()
    },
    searchKey() {
      this.searchValue = ''
    },
    chainId() {
      this.$emit('on-chain', this.chainId)
    }
  },
  mounted() {
    this.handleColumns(this.columns)
    this.setDefaultSearchKey()
    this.handleTableData()
  }
}
</script>
