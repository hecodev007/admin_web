<template lang="pug">
Main.page-exchange
    Row.search(:grtter="15")
        Col(span="16")
            Input(search :placeholder="$lang('请输入')+$lang('券商简称')" v-model="searchKeyword", :enter-button="$lang('搜索')" @on-search="loadData")
        Col(span="4") &nbsp;
        Col(span="4" style="text-align:right")
            Button(size="large" type="primary" ghost @click="create" icon="md-add-circle") {{$lang('创建券商')}}
    Table.user-table(:columns="columns", :data="listData", :loading="loadingTable")
    .page-pages(v-if="total>searchForm.pageSize")
      Page(:current.sync="searchForm.current", :total="total", :pageSize="searchForm.pageSize" @on-change="loadData")

    // 创建修改券商    
    Modal.page-exchange-win(v-model="creatWinStatus", :title="$lang(nextType =='create' ? '新建':'修改')" @on-ok="doCreate" @on-visible-change="clear", :loading="loading")
        Form(:model='createForm', :label-width='100')
            FormItem(:label="$lang('券商简称')")
                Input(v-model='createForm.name', :placeholder="$lang('请输入',$lang('券商简称'))", :disabled="nextType=='edit'")
            FormItem(:label="$lang('公司名称')")
                Input(v-model='createForm.company', :placeholder="$lang('请输入',$lang('公司名称'))")
            FormItem(:label="$lang('邮箱账号')")
                Input(v-model='createForm.email', :placeholder="$lang('请输入',$lang('邮箱账号'))", :disabled="nextType=='edit'")
            FormItem(:label="$lang('联系人')")
                Input(v-model='createForm.contact', :placeholder="$lang('请输入',$lang('联系人'))")
            FormItem(:label="$lang('联系电话')")
                Input(v-model='createForm.phone', :placeholder="$lang('请输入',$lang('联系电话'))")
            FormItem(:label="$lang('其他信息')")
                Input(v-model='createForm.basicInfo', :placeholder="$lang('请输入',$lang('其他信息'))")

    // 查看券商信息    
    Modal.page-exchange-detail(v-model="detialWinSatus", :title="createForm.name" @on-visible-change="clear")
      Row
          Col(span="10" style="text-align:right") {{$lang("券商简称")}}：
          Col(span="14") {{createForm.name}}
      Row
          Col(span="10" style="text-align:right") {{$lang("公司名称")}}：
          Col(span="14") {{createForm.company}}
      Row
          Col(span="10" style="text-align:right") {{$lang("邮箱账号")}}：
          Col(span="14") {{createForm.email}}
      Row
          Col(span="10" style="text-align:right") {{$lang("联系人")}}：
          Col(span="14") {{createForm.contact}}
      Row
          Col(span="10" style="text-align:right") {{$lang("联系电话")}}：
          Col(span="14") {{createForm.phone}}
      Row
          Col(span="10" style="text-align:right") {{$lang("其他信息")}}：
          Col(span="14") {{createForm.basicInfo}}
      template(slot="footer")
        Button(type="primary" long @click="detialWinSatus=false" size="large") {{$lang("确定")}}
    // 开启/关闭券商
    Modal(v-model="settingsWinStatus", :title="$lang(settingsType=='enable' ? '启用' : '禁用')" @on-ok="settings" @on-cancel="loadData")
        Alert {{$lang("您确定执行此操作吗？")}}
        Input(v-model='createForm.input', :placeholder="$lang('请输入操作原因')" type="textarea", :rows="4")
</template>
<script>
export default {
  data() {
    return {
      loading:true,
      loadingTable: true,
      // 搜索关键字，包含非数字的字符串，处理为券商简称
      total: 0,
      searchKeyword: "",
      searchForm: {
        current: 1,
        brokerName: "",
        brokerId: "",
        pageSize: 20
      },
      listData: [],

      creatWinStatus: false,
      detialWinSatus: false,
      // create创建 / edit修改
      nextType: "",
      // 创建/修改/查看共用
      createForm: {
        name: "",
        saasFeeRate: "",
        company: "",
        email: "",
        contact: "",
        phone: "",
        basicInfo: ""
      },
      // enable开启 / disable关闭
      settingsType: "",
      settingsWinStatus: false,
      settingsForm: {
        id: "",
        basicInfo: ""
      },
      columns: [
        {
          title: this.$lang("券商ID"),
          key: "brokerId"
        },
        {
          title: this.$lang("券商简称"),
          key: "name"
        },
        {
          title: this.$lang("DNS配置"),
          key: "dnsSetting",
          render: (h, params) => {
            if (params.row.dnsSetting == 2) {
              return h("span", this.$lang("已完成"));
            } else {
              return h(
                "a",
                {
                  on: {
                    click: () => {
                      this.$axios
                        .post("/api/v1/broker/send_set_password_email ", {
                          id: params.row.id
                        })
                        .then(result => {
                          if (result.code == 0) {
                            this.$Notice.success({
                              title: this.$lang("已发送")
                            });
                          }
                        });
                    }
                  }
                },
                this.$lang("发邮件")
              );
            }
          }
        },
        {
          title: this.$lang("保证金"),
          render: (h, params) => {
            return h("span", this.$lang(params.row.payEarnest ? "已缴纳" : "未缴纳"));
          }
        },
        {
          title: this.$lang("启用状态"),
          render: (h, params) => {
            return h("iSwitch", {
              props: {
                value: params.row.enabled
              },
              on: {
                "on-change": status => {
                  if (status) {
                    this.settingsType = "enable";
                  } else {
                    this.settingsType = "disable";
                  }
                  this.settingsWinStatus = true;
                  this.settingsForm.id = params.row.id;
                  this.settingsForm.remark = "";
                }
              }
            });
          }
        },
        {
          title: this.$lang("操作"),
          width: 140,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.detialWinSatus = true;
                      Object.assign(this.createForm, params.row);
                    }
                  }
                },
                this.$lang("详情")
              ),
              h("span", " / "),
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.creatWinStatus = true;
                      this.nextType = "edit";
                      Object.assign(this.createForm, params.row);
                    }
                  }
                },
                this.$lang("修改")
              )
            ]);
          }
        }
      ]
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.loadingTable = true;
      this.searchForm.brokerName = /\D/.test(this.searchKeyword) ? this.searchKeyword : "";
      this.searchForm.brokerId = !/\D/.test(this.searchKeyword) ? this.searchKeyword * 1 : "";
      this.$axios.post("/api/v1/broker/query_broker", this.searchForm).then(result => {
        this.loadingTable = false;
        if (result.code === 0) {
          this.listData = result.data.list ? result.data.list : [];
          this.total = result.data.total;
        }
      });
    },
    create() {
      this.creatWinStatus = true;
      this.nextType = "create";
    },
    doCreate() {
      let email = this.createForm.email;
      this.$axios.post(this.nextType == "create" ? "/api/v1/broker" : "/api/v1/broker/edit", this.createForm).then(result => {
        this.loading = false;
        setTimeout(() => {
          this.loading = true;
        }, 200);
        if (result.code === 0 && this.nextType == "create") {
          this.$Notice.success({
            title: this.$lang("创建成功"),
            duration: 0
          });
        }
        if (result.code == 0) {
          this.creatWinStatus = false;
        }
        this.loadData();
      });
    },
    clear(status) {
      if (!status) {
        setTimeout(() => Object.keys(this.createForm).forEach(el => (this.createForm[el] = "")), 200);
      }
    },
    settings() {
      this.$axios.post(this.settingsType == "enable" ? "/api/v1/broker/enable" : "/api/v1/broker/disable", this.settingsForm).then(() => this.loadData());
    }
  }
};
</script>