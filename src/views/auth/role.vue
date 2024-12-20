<template lang="pug">
Main.page-exchange
    tables(ref="tables", , searchable, :loading="loadingTable", :deleteable="deleteable",  :earch-place="top",v-model="tableData", :columns="columns", :searchOffline="true",
      :searchOptions="searchOptions", @on-search="handleSearch" @on-save-edit="handleSaveEdit"
      @on-delete="handleDelete"  @on-select-all="selectItemAll" @on-select="selectItem"  @on-select-cancel="cancelItem" @on-selection-change="selectChange"
      @on-add-row="handleAddRow" @on-delete-selected="handleDeleteSelected")
    Row
        Col(span="12")
            <!-- Button(style={margin: '10px 0'} type="primary" @click="exportExcel") 导出为Csv文件 -->
        Col(span="8" style="text-align:right")
            Page(style={margin: '10px 0'}  :current.sync="requestDataForm.current", :total="total", :pageSize="requestDataForm.page_size" @on-change="loadData")


    // 新增
    Modal.page-exchange-win(v-model="creatWinStatus", , :title="$lang(nextType =='create' ? '新增':'修改')" @on-ok="doNext" :loading="loading")
        Form(:model='createForm', :label-width='100', :rules='rules', ref="creatForm")
            <!-- FormItem(:label='$lang("ID")') -->
              <!-- Input(v-model='createForm.id', , placeholder, disabled) -->
            FormItem(:label='$lang("角色名称")' prop="name")
                Input(v-model='createForm.name', :readonly="nextType == 'edit'" , :placeholder="$lang('请输入',$lang('角色名称'))", required)
            FormItem(:label='$lang("角色Title")' prop="title")
                Input(v-model='createForm.title', , :placeholder="$lang('请输入',$lang('角色Title'))" , )
            FormItem(:label='$lang("可访问页面")' prop="web_routers")
                Input(v-model='createForm.web_routers', readonly , type="textarea",  :autosize="{minRows: 2}", :placeholder="$lang('请选择',$lang('可访问页面'))" , )
                <Tree :data="routerTreeData" show-checkbox @on-check-change="checkChangeHandle"></Tree>
            FormItem(:label='$lang("描述")' prop="description")
                Input(v-model='createForm.description',  , :placeholder="$lang('请输入',$lang('描述'))" , )

    // 查看信息
    Modal.page-exchange-detail(v-model="detialWinStatus", :title="editForm.key")
        Row(class="mgb10")
          Col(span="6" style="text-align:left") {{$lang("角色名称")}}：
          Col(span="14") <Input v-model="editForm.name" readonly style="width: 300px"></Input>
        Row(class="mgb10")
          Col(span="6" style="text-align:left") {{$lang("角色Title")}}：
          Col(span="14") <Input v-model="editForm.title" readonly style="width: 300px"></Input>
        Row(class="mgb10")
          Col(span="6" style="text-align:left") {{$lang("可访问页面")}}：
          Col(span="14") <Input v-model="editForm.menus" readonly type="textarea" :autosize="{minRows: 2}" style="width: 300px"></Input>
        Row(class="mgb10")
          Col(span="6" style="text-align:left") {{$lang("描述")}}：
          Col(span="14") <Input v-model="editForm.description" readonly style="width: 300px"></Input>

        template(slot="footer")
          Button(type="primary" long @click="detialWinStatus=false") {{$lang("确定")}}



    // 删除
    <Modal v-model="deleteWinStatus" :title="$lang('确认提示')" @on-ok="handleDelete" @on-cancel="">
          <p>{{$lang("确定删除吗")}}</p>
    </Modal>

</template>

<script>
import Tables from '@/components/tables'
//import { getTableData } from '@/api/api'
export default {
    name: 'System',
    components: {
        Tables
    },
    data() {
        return {
            loading: true,
            loadingTable: true,
            searchable: false,
            deleteable: false,
            top: 'top',
            total: 0,
            roleNameDist: {},
            requestDataForm: {
                current: 1,
                page_size: 20
            },
            rules:{
                name: [{required: true, message: '必填', trigger: 'blur'}],
                title: [{required: true, message: '必填', trigger: 'blur'}],
                web_routers: [{required: true, message: '必填', trigger: 'blur'}],
                description: [{required: true, message: '必填', trigger: 'blur'}],
            },
            accessColumns: {
                type: Array,
                default () {
                    return []
                }
            },
            // 路由树形菜单
            routerData: [],
            routerTreeData: [],
            columns: [
                { title: '角色', key: 'name', editable: true },
                { title: '页面', key: 'menus', editable: true },
                {
                    title: '操作',
                    key: 'handle',
                    minWidth: 80,
                    align: 'left',
                    button: [
                        (h, params) => {
                            return h('div'
                                /*, {
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
                                }*/
                            , [
                                h('Button', {
                                    props: {
                                        type: "primary",
                                        icon: "ios-eye"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.detialWinStatus = true;
                                            Object.assign(this.editForm, params.row);
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: "primary",
                                        icon: "ios-build"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.creatWinStatus = true;
                                            this.nextType = "edit";
                                            Object.assign(this.createForm, params.row);
                                            // 选中原始数据
                                            this.rendeRouterTree()
                                            this.setDefaultChecked()
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: "primary",
                                        icon: "ios-trash"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteWinStatus = true
                                            this.nextType = "delete";
                                            Object.assign(this.deleteForm, params.row);
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    ]
                }
            ],
            tableData: [],
            searchOptions: ["name"], // 搜索条件
            selectDataStore: [],
            creatWinStatus: false,
            detialWinStatus: false,
            deleteWinStatus: false,
            // create创建 / edit修改
            nextType: "",
            createForm: {
                name: "",
                title: "",
                web_routers: "",
                description: "",
            },
            editForm: {
                name: "",
                title: "",
                web_routers: "",
                menus: "",
                description: "",
            },
            deleteForm: {}
        }
    },
    methods: {
        // 获取所有路由列表
        loadRoutersData() {
            this.loadingTable = true;
            this.$axios.get("/api/v1/router/routers", { params: this.requestDataForm }).then(result => {
                this.loadingTable = false;
                this.loading = false;
                setTimeout(() => {
                    this.loading = true;
                }, 200);
                if (result.code === 10000) {
                    this.routerData = result.data ? result.data : [];
                    // 生成角色对照表
                    this.rendeNameDist()
                    // 生成可操作的树
                    this.rendeRouterTree()
                    // 加载角色数据
                    this.loadData()
                }
            });
        },
        rendeNameDist() {
            let _data = this.routerData
            let _dist = {}
            _data.forEach((item, index) => {
                _dist[item.id] = item.title
            })
            console.log(_dist)
            this.roleNameDist = _dist
            console.log(this.roleNameDist)

        },
        rendeRouterTree() {
            let _data = this.routerData
            let _tempData = []
            _data.forEach((item, index) => {
                // 寻找一级路由，并根据sort排序
                if (item.parent_id === 'root') {
                    let _tObj = {
                        title: item.title,
                        id: item.id,
                        sort: item.sort,
                        showLevel: item.showLevel,
                        url: item.url,
                        checked: false
                    }

                    if (item.showLevel == '2') {
                        _tObj.children = []
                    }

                    if (item.title == '首页') {
                        _tObj.disableCheckbox = true,
                            _tObj.checked = true
                    }

                    _tempData.push(_tObj)
                }
            })
            _tempData = this.setArray(_tempData)

            // console.log(_tempData)

            // 寻找二级路由
            _tempData.forEach((item, index) => {
                if (item.showLevel == '2') {
                    let _tempSubData = []
                    let _ctData = {}

                    _data.forEach((cell, ind) => {
                        _ctData = {
                            title: cell.title,
                            id: cell.id,
                            sort: cell.sort,
                            showLevel: cell.showLevel,
                            parent_id: cell.parent_id,
                            url: cell.url,
                            checked: false
                        }
                        if (cell.parent_id === item.id) {
                            _tempSubData.push(_ctData)
                        }
                    })
                    // console.log(_tempSubData)
                    _tempSubData = this.setArray(_tempSubData)
                    item.children = _tempSubData
                }
            })
            // console.log(_tempData)
            this.routerTreeData = _tempData

        },
        // 数组排序
        setArray(c) {
            c.sort(this.compare('sort'));
            return c;
        },
        compare(property) {
            return function(a, b) {
                // 降序
                return b[property] - a[property];
            }
        },
        // 路由树
        checkChangeHandle(param) {
            let _web_routers = []
            // console.log(param)
            param.forEach((item, index) => {
                // 根据节点内容生成路由列表
                let _data = this.routerData
                _data.forEach((routerItem) => {
                    if(item.id == routerItem.id) {
                        let _parentId = routerItem.parent_id
                        _web_routers.push(item.id)
                        if(_parentId !== 'root') {
                            // 给二级路由寻找父路由
                            // console.log(_web_routers.indexOf(_parentId))
                            if(_web_routers.indexOf(_parentId) == -1) {
                                _web_routers.push(_parentId)
                            }
                        }
                    }
                })
            })

            // console.log(_web_routers)
            this.createForm.web_routers = _web_routers.join(',')
            this.createForm.menus = _web_routers.join(',')
        },
        // 编辑数据渲染选中树
        setDefaultChecked() {
            let _createForm = this.createForm
            let _treeDate = this.routerTreeData
            let _checkedMeuns = (JSON.parse(JSON.stringify(_createForm)).menus).split(',')

            // console.log(_checkedMeuns)
            // console.log(_treeDate)

            _treeDate.forEach((item, index) => {
                if(index > 0) {
                    if(_checkedMeuns.indexOf(item.id) > -1) {
                        // console.log(item.id)
                        if( item.showLevel == '2') {
                            let _treeChildren = item.children
                            _treeChildren.forEach((cell, i) => {
                                if(_checkedMeuns.indexOf(cell.id) > -1) {
                                    this.$set(this.routerTreeData[index].children[i], 'checked', true)
                                } else {
                                    this.$set(this.routerTreeData[index].children[i], 'checked', false)
                                }
                            })
                        } else {
                            this.$set(this.routerTreeData[index], 'checked', true)
                        }
                    } else {
                        this.$set(this.routerTreeData[index], 'checked', false)
                    }
                }
            });

            // console.log(this.routerTreeData)
        },
        // 获取角色列表
        loadData() {
            this.loadingTable = true;
            this.$axios.get("/api/v1/role", { params: this.requestDataForm }).then(result => {
                this.loadingTable = false;
                this.loading = false;
                setTimeout(() => {
                    this.loading = true;
                }, 200);
                if (result.code === 10000) {
                    this.tableData = result.data ? result.data : [];
                    // console.log(this.tableData)
                    // menus转化为中文， 可开启
                    // this.transNameByDist()

                    this.tableData.forEach((item, index) => {
                        this.tableData[index].web_routers = item.menus
                    })
                    this.total = result.total;
                }
            });
        },
        // 角色页面转中文
        transNameByDist() {
            let _data = this.tableData
            let _dist = this.roleNameDist

            // console.log(_data)
            // console.log(_dist)

            _data.forEach((item, index) => {
                let _menus = item.menus.split(',')
                let _pageName = []

                if(item.name == 'root') {
                    _pageName = ['全部页面']
                } else {
                    _menus.forEach((cell, i) => {
                        _pageName.push(_dist[cell])
                    })
                }
                this.$set(this.tableData[index], 'pageName', _pageName.join(','))
            })
        },
        selectItem(selection, row) {
            //this.$Message.info('selectItem ok');
            this.selectDataStore.push(row)
        },
        cancelItem(selection, row) {
            //this.$Message.info('cancelItem ok');
            this.selectDataStore.forEach((item, index) => {
                if (item.id === row.id) { //ID，所以拿来做判断条件
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
        handleDeleteSelected() {
            this.deleteForm.ids = []
            this.selectDataStore.forEach((item, index) => {
                this.deleteForm.ids.push(item.id)
            })
            this.deleteSelected(this.deleteForm);
            this.selectDataStore = []
        },
        handleSearch(searchKey, searchValue) {
            // console.log(searchKey, searchValue)
        },
        handleAddRow() {
            Object.keys(this.createForm).forEach(el => (this.createForm[el] = ""));
            this.creatWinStatus = true;
            this.nextType = "create";
            this.loadRoutersData()
        },
        handleDelete() {
            this.deleteSelected();
        },
        deleteSelected() {
            // console.log(this.deleteForm.name)
            // return
            this.$axios.post("/api/v1/role/delete", { name: this.deleteForm.name }).then(result => {
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
                    this.deleteWinStatus = false;
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
            // console.log(this.createForm)
            this.$axios.post("/api/v1/role/update", this.createForm).then(result => {
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
            console.log(params.data)
            Object.assign(this.createForm, params.data);
            this.createForm[params.key] = params.value;
            //this.$Message.info(params.key + " " + params.value);
            this.saveEdit();

        },
        doNext() {
            this.$refs['creatForm'].validate((val) => {
                this.loading = false;
                setTimeout(() => {
                    this.loading = true;
                }, 200);
                if(!val) {
                    return
                } else {
                    if (this.nextType == "create") {
                        // this.createForm.gas_limit = String(this.createForm.gas_limit)
                        this.$axios.post("/api/v1/role/add", this.createForm).then(result => {
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
                }
            })
        }
    },
    mounted() {
        // 获取全部路由
        this.loadRoutersData()

    }
}
</script>

<style>

</style>
