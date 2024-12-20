<template lang="pug">
Main.page-exchange
    tables(ref="tables", , searchable, :loading="loadingTable", :deleteable="deleteable",  :search-place="top",v-model="tableData", :columns="columns", :searchOffline="true",
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
            FormItem(:label='$lang("用户名")' prop="username")
                Input(v-model='createForm.username', , :placeholder="$lang('请输入',$lang('用户名'))", )
            FormItem(:label='$lang("角色")' prop="role")
                <Select v-model="createForm.role" class="search-col">
                  <Option v-for="item in accessData" :value="item.id" :key="`search-col-${item.name}`">{{ item.name }}</Option>
                </Select>
            FormItem(:label='$lang("密码")' prop="password")
                Input(v-model='createForm.password', autocomplete="new-password", type="password" , :placeholder="$lang('请输入',$lang('密码'))" , )

                // <div>{{ createForm.role }}</div>

    // 修改
    Modal.page-exchange-win(v-model="editWinStatus", , :title="$lang(nextType =='create' ? '新增':'修改')" @on-ok="doNext" :loading="loading")
        Form(:model='editForm', :label-width='100', :rules='rules', ref="modifyForm")
            <!-- FormItem(:label='$lang("用户ID")') -->
                <!-- Input(v-model='editForm.user_id', readonly , , ) -->
            FormItem(:label='$lang("用户名")' prop="username")
                Input(v-model='editForm.username', autocomplete="off" ,readonly, :placeholder="$lang('请输入',$lang('用户名'))", )
            FormItem(:label='$lang("角色")' prop="role")
                <Select v-model="editForm.role" class="search-col" @on-change="changeRoleHandle">
                  <Option v-for="item in accessData" :value="item.id" :key="`search-col-${item.name}`" >{{ item.name }}</Option>
                </Select>
            FormItem(:label='$lang("可访问页面")' prop="access")
                Input(v-model='editForm.access', readonly , type="textarea" :autosize="{minRows: 2}", , )
            // FormItem(:label='$lang("密码")' prop="password")
            //     Input(v-model='editForm.password', autocomplete="new-password", type="password" , :placeholder="$lang('请输入',$lang('密码'))" , )

    // 查看信息
    Modal.page-exchange-detail(v-model="detialWinStatus", :title="editForm.username")
        <!-- Row(class="mgb10") -->
          <!-- Col(span="6" style="text-align:left") {{$lang("ID")}}： -->
          <!-- Col(span="14") <Input v-model="editForm.user_id" readonly style="width: 300px"></Input> -->
        Row(class="mgb10")
          Col(span="6" style="text-align:left") {{$lang("用户名")}}：
          Col(span="14") <Input v-model="editForm.username" readonly style="width: 300px"></Input>
        Row(class="mgb10")
          Col(span="6" style="text-align:left") {{$lang("角色")}}：
          Col(span="14") <Input v-model="editForm.roleName" readonly style="width: 300px"></Input>
        Row(class="mgb10")
          Col(span="6" style="text-align:left") {{$lang("可访问页面")}}：
          Col(span="14") <Input v-model="editForm.access" type="textarea" :autosize="{minRows: 2}" readonly style="width: 300px"></Input>
        Row(class="mgb10")
          Col(span="6" style="text-align:left") {{$lang("显示名")}}：
          Col(span="14") <Input v-model="editForm.displayName" readonly style="width: 300px"></Input>

        template(slot="footer")
          Button(type="primary" long @click="detialWinStatus=false") {{$lang("确定")}}

    // 删除
    <Modal v-model="deleteWinStatus" :title="$lang('确认提示')" @on-ok="handleDelete" @on-cancel="">
          <p>{{$lang("确定删除吗")}}</p>
    </Modal>

    // 修改密码
    Modal.page-exchange-win(v-model="editPwdWinStatus", , :title="$lang('修改密码')" @on-ok="editPwdHandle" :loading="loading")
        Form(:model='editPwdForm', :label-width='100', :rules='rules', ref="pwdForm")
            FormItem(:label='$lang("用户名")' prop="name")
                Input(v-model='editPwdForm.name', autocomplete="off" , :placeholder="$lang('请输入',$lang('用户名'))", readonly)
            FormItem(:label='$lang("密码")' prop="password")
                Input(v-model='editPwdForm.password', autocomplete="new-password", :type="pwdType", password, :placeholder="$lang('请输入',$lang('密码'))" , )
                <div class="icon-eye"><Icon :type="eyeType" size="20" @click="changePwdType" /></div>

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
                searchable:false,
                deleteable:false,
                top: 'top',
                total: 0,
                pwdType: 'password',
                eyeType: 'ios-eye-off',
                requestDataForm: {
                    current: 1,
                    page_size: 20,
                },
                rules:{
                    username: [{required: true, message: '必填', trigger: 'blur'}],
                    role: [{required: true, message: '必填', type:'number', trigger: 'change'}],
                    password: [{required: true, message: '必填', trigger: 'blur'}],
                },
                accessData: [],
                columns: [
                    {title: '用户名', key: 'name', editable: true},
                    {title: '角色', key: 'roleName', editable: true},
                   {
                        title: '操作',
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
                                            type: "primary",
                                            icon: "ios-eye",
                                            size: "default"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.detialWinStatus = true;
                                                this.editForm.user_id = params.row.user_id
                                                this.editForm.username = params.row.name
                                                this.editForm.role = params.row.roleId

                                                let _accessDate = this.accessData
                                                // console.log(_accessDate)
                                                _accessDate.forEach((item, index) => {
                                                  if(item.id == params.row.roleId){
                                                    this.editForm.access = item.menus
                                                  }
                                                })

                                                this.editForm.roleName = params.row.roleName
                                                this.editForm.displayName = params.row.displayName
                                                // Object.assign(this.editForm, params.row);
                                            }
                                        }
                                    }, '查看'),
                                    h('Button', {
                                        props: {
                                            type: "primary",
                                            icon: "ios-build",
                                            size: "default"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.editWinStatus = true;
                                                this.nextType = "edit";
                                                this.editForm.user_id = params.row.user_id
                                                this.editForm.username = params.row.name
                                                this.editForm.role = params.row.roleId

                                                let _accessDate = this.accessData
                                                _accessDate.forEach((item, index) => {
                                                  if(item.id == params.row.roleId){
                                                    this.editForm.access = item.menus
                                                  }
                                                })

                                                this.editForm.roleName = params.row.roleName
                                                this.editForm.displayName = params.row.displayName
                                                // Object.assign(this.editForm, params.row);
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            type: "primary",
                                            icon: "md-key",
                                            size: "default"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.editPwdWinStatus = true
                                                this.nextType = "editPwd";
                                                Object.assign(this.editPwdForm, params.row);
                                            }
                                        }
                                    }, '修改密码'),
                                    h('Button', {
                                        props: {
                                            type: "primary",
                                            icon: "ios-trash",
                                            size: "default"
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
                                    }, '删除'),

                                ])
                            }
                        ]
                    }
                ],
                tableData: [],
                searchOptions:["name", "roleName"], // 搜索条件
                selectDataStore:[],
                creatWinStatus: false,
                detialWinStatus: false,
                deleteWinStatus: false,
                editWinStatus: false,
                editPwdWinStatus: false,
                // create创建 / edit修改
                nextType: "",
                createForm: {
                    username: "",
                    role: "",
                    access: "",
                    password: "",
                },
                editForm: {
                    user_id: "",
                    username: "",
                    role: "",
                    access: "",
                    password: "",
                },
                deleteForm:{},
                editPwdForm: {
                    name: "",
                    password: ""
                }
            }
        },
        methods: {
          // 获取所有角色
            loadAccessData() {
                this.loadingTable = true;
                this.$axios.get("/api/v1/role", {params: this.requestDataForm}).then(result => {
                    this.loadingTable = false;
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 200);
                    if (result.code === 10000) {
                        this.accessData = result.data ? result.data : [];
                    }
                });
            },
          // 获取用户列表
            loadData() {
                this.loadingTable = true;
                this.$axios.get("/api/v1/user", {params: this.requestDataForm}).then(result => {
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
            changeRoleHandle() {
              let _roleId = this.editForm.role
              let _accessDate = this.accessData
              _accessDate.forEach((item, index) => {
                if(item.id == _roleId){
                  this.editForm.access = item.menus
                }
              })
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
            handleDeleteSelected(id){
                this.deleteForm.ids = []
                this.selectDataStore.forEach((item, index) => {
                    this.deleteForm.ids.push(item.id)
                })
                this.deleteSelected(this.deleteForm);
                this.selectDataStore = []
            },
            modelDeleteCancel() {
              // this.deleteWinStatus = false
            },
            handleSearch(searchKey, searchValue) {

            },
            handleAddRow(){
                Object.keys(this.createForm).forEach(el => (this.createForm[el] = ""));
                this.creatWinStatus = true;
                this.nextType = "create";
            },
            handleDelete() {
                this.deleteSelected();
            },
            deleteSelected() {
                // 删除普通用户
                // console.log(this.deleteForm)
              this.$axios.post("/api/v1/user/delete", {username: this.deleteForm.name}).then(result => {
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 200);

                    if (result.code == 10000) {
                        this.$Notice.success({
                            title: this.$lang("删除成功"),
                            duration: 2
                        });
                        this.deleteWinStatus = false;
                        this.deleteForm = {}
                    }else{
                        this.$Notice.error({
                            title: this.$lang("删除失败"),
                            duration: 2
                        });
                        this.deleteWinStatus = false;
                        this.deleteForm = {}
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
                this.$axios.post("/api/v1/user/update", this.editForm).then(result => {
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 200);

                    if (result.code == 10000) {
                        this.$Notice.success({
                            title: this.$lang("修改成功"),
                            duration: 2
                        });
                        this.editWinStatus = false;
                        this.editForm = {}
                    }else{
                        this.$Notice.error({
                            title: this.$lang("修改失败"),
                            duration: 2
                        });
                        this.editWinStatus = false;
                        this.editForm = {}
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
            // 修改密码
            editPwdHandle() {
                console.log(this.editPwdForm)
                this.$set(this.editPwdForm, 'username', this.editPwdForm.name)
                this.$refs['pwdForm'].validate((val) => {
                    if(!val) {
                        this.loading = false;
                        setTimeout(() => {
                            this.loading = true;
                        }, 200);
                        return
                    } else {
                        this.$axios.post("/api/v1/user/update_pwd", this.editPwdForm).then(result => {
                            this.loading = false;
                            setTimeout(() => {
                                this.loading = true;
                            }, 200);

                            if (result.code == 10000) {
                                this.$Notice.success({
                                    title: this.$lang("修改成功"),
                                    duration: 2
                                });
                                this.editPwdWinStatus = false;
                                this.editPwdForm = {}
                            }else{
                                this.$Notice.error({
                                    title: this.$lang("修改失败"),
                                    duration: 2
                                });
                                this.editPwdWinStatus = false;
                                this.editPwdForm = {}
                            }
                            this.loadData();
                        });
                    }
                })
            },
            doNext() {
                if (this.nextType == "create"){
                    this.$refs['creatForm'].validate((val) => {
                        if(!val) {
                            this.loading = false;
                            setTimeout(() => {
                                this.loading = true;
                            }, 200);
                            return
                        } else {
                            // this.createForm.gas_limit = String(this.createForm.gas_limit)
                            this.$axios.post("/api/v1/user/add", this.createForm).then(result => {
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
                        }
                    })

                } else if(this.nextType == "delete") {
                //   console.log('delete')
                } else{
                    this.$refs['modifyForm'].validate((val) => {
                        if(!val) {
                            this.loading = false;
                            setTimeout(() => {
                                this.loading = true;
                            }, 200);
                            return
                        } else {
                            this.saveEdit()
                        }
                    })
                }
            },

            changePwdType() {
                this.pwdType = this.pwdType == 'text' ? 'password' : 'text'
                this.eyeType = this.eyeType == 'ios-eye-off' ? 'ios-eye' : 'ios-eye-off'
            }
        },
        mounted() {
            this.loadData()
            this.loadAccessData()
        }
    }
</script>

<style>
.icon-eye{
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 30px;
    text-align: center;
    vertical-align: middle;
    display: flex;
    align-items: center;
}
</style>
