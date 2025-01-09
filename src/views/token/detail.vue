<template lang="pug">
Main.page-exchange
    Row.search(:grtter="15")
      Col(span="16")
          Select(v-model="searchKeyword", :placeholder="$lang('请选择')+$lang('币种ID')", :clearable="true")
              Option(v-for="item in tokenIds" :key="item" :value="item") {{item}}
      Col(span="4")
          Button(type="primary" @click="loadData") {{$lang("搜索")}}
      Col(span="4" style="text-align:right")
          Button(size="large" type="primary" ghost @click="create" icon="md-add-circle") {{$lang("新增币种")}}
    Table.user-table(:columns="columns", :data="listData", :loading="loadingTable")
    .page-pages(v-if="total>searchForm.page_size")
      Page(:current.sync="searchForm.current", :total="total", :pageSize="searchForm.page_size" @on-change="loadData")

    // 新增
    Modal.page-exchange-win(v-model="creatWinStatus", , :title="$lang(nextType =='create' ? '新增':'修改')" @on-ok="doNext" :loading="loading")
        Form(:model='createForm', :label-width='100')
            FormItem(:label='$lang("ID")')
                Input(v-model='createForm.id', , placeholder, disabled)
            FormItem(:label='$lang("币种ID")')
                Input(v-model='createForm.token_id', , :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("逻辑类型")')
                Input(v-model='createForm.logic_type', , :placeholder="$lang('请输入',$lang('逻辑类型'))")
            FormItem(:label='$lang("类型")')
                Input(v-model='createForm.type', , :placeholder="$lang('请输入',$lang('类型'))")
            FormItem(:label='$lang("基础手续费阈值")')
                Input(v-model='createForm.give_fee_threshold', , :placeholder="$lang('请输入',$lang('基础手续费阈值'))")
            FormItem(:label='$lang("基础手续费")')
                Input(v-model='createForm.give_fee_value', , :placeholder="$lang('请输入',$lang('基础手续费'))")
            FormItem(:label='$lang("归集阈值")')
                Input(v-model='createForm.collect_threshold', , :placeholder="$lang('请输入',$lang('归集阈值'))")
            FormItem(:label='$lang("归集保留")')
                Input(v-model='createForm.collect_remain', , :placeholder="$lang('请输入',$lang('归集保留'))")
            FormItem(:label='$lang("自动归集时间间隔")')
                Input(v-model='createForm.collect_interval', , :placeholder="$lang('请输入',$lang('自动归集时间间隔'))")
            FormItem(:label='$lang("归集类型")')
                Input(v-model='createForm.collect_type', , :placeholder="$lang('请输入',$lang('归集类型'))")


    // 查看信息
    Modal.page-exchange-detail(v-model="detialWinSatus", :title="createForm.token_id")
      Row
          Col(span="10" style="text-align:right") {{$lang("ID")}}：
          Col(span="14") {{createForm.id}}
      Row
          Col(span="10" style="text-align:right") {{$lang("币种ID")}}：
          Col(span="14") {{createForm.token_id}}
      Row
          Col(span="10" style="text-align:right") {{$lang("逻辑类型")}}：
          Col(span="14") {{createForm.logic_type}}
      Row
          Col(span="10" style="text-align:right") {{$lang("类型")}}：
          Col(span="14") {{createForm.type}}
      Row
          Col(span="10" style="text-align:right") {{$lang("基础手续费阈值")}}：
          Col(span="14") {{createForm.give_fee_threshold}}
      Row
          Col(span="10" style="text-align:right") {{$lang("基础手续费")}}：
          Col(span="14") {{createForm.give_fee_value}}
      Row
          Col(span="10" style="text-align:right") {{$lang("归集阈值")}}：
          Col(span="14") {{createForm.collect_threshold}}
      Row
          Col(span="10" style="text-align:right") {{$lang("归集保留")}}：
          Col(span="14") {{createForm.collect_remain}}
      Row
          Col(span="10" style="text-align:right") {{$lang("自动归集时间间隔")}}：
          Col(span="14") {{createForm.collect_interval}}
      Row
          Col(span="10" style="text-align:right") {{$lang("归集类型")}}：
          Col(span="14") {{createForm.collect_type}}
      template(slot="footer")
        Button(type="primary" long @click="detialWinSatus=false") {{$lang("确定")}}
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      loadingTable: true,
      total: 0,
      // 搜索关键字，包含非数字的字符串，处理为交易所简称
      searchKeyword: "",
      searchForm: {
        current: 1,
        page_size: 20,
        token_id: ""
      },
      listData: [],
      tokenTypeList: [
        {
          value: '1',
          label: 'BTC'
        },
        {
          value: '2',
          label: 'ETH'
        },
        {
          value: '3',
          label: '3'
        },
      ],

      creatWinStatus: false,
      detialWinSatus: false,
      // create创建 / edit修改
      nextType: "",
      // 创建/修改/查看共用
      createForm: {
        id: "",
        token_id: "",
        type: "",
        logic_type: "",
        give_fee_threshold: "",
        give_fee_value: "",
        collect_threshold: "",
        collect_remain: "",
        redeem_address: "",
          collect_interval: 0,
          CollectType: 0,
      },
      columns: [
        {
          title: this.$lang("币种ID"),
          key: "token_id"
        },
        {
          title: this.$lang("逻辑类型"),
          key: "logic_type"
        },
        {
          title: this.$lang("类型"),
          key: "type"
        },
        {
          title: this.$lang("基础手续费阈值"),
          key: "give_fee_threshold"
        },
        {
          title: this.$lang("基础手续费"),
          key: "give_fee_value"
        },
        {
          title: this.$lang("归集阈值"),
          key: "collect_threshold"
        },
        {
          title: this.$lang("归集保留"),
          key: "collect_remain"
        },
          {
              title: this.$lang("自动归集时间间隔"),
              key: "collect_interval"
          },
        {
          title: this.$lang("归集类型"),
          key: "collect_type"
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
      ],
      tokenIds: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.loadingTable = true;
      this.searchForm.token_id = this.searchKeyword;
      this.$axios.get("/api/v1/token_details", {params :this.searchForm}).then(result => {
        this.loadingTable = false;
        if (result.code === 10000) {
          this.listData = result.data ? result.data : [];
          this.total = result.total;
          let tokenIds = {}
          this.listData.forEach(el => {
            tokenIds[el.token_id] = el.token_id
          });
          if (this.tokenIds.length === 0){
            this.tokenIds = Object.keys(tokenIds).sort((a, b) => a.localeCompare(b))
          }
        }
      });
    },
    create() {
      Object.keys(this.createForm).forEach(el => (this.createForm[el] = ""));
      this.creatWinStatus = true;
      this.nextType = "create";
    },
    doNext() {
        this.createForm.logic_type = Number(this.createForm.logic_type);
        this.createForm.type = Number(this.createForm.type);
        this.createForm.collect_interval = Number(this.createForm.collect_interval);
        this.createForm.collect_type = Number(this.createForm.collect_type);
      if (this.nextType == "create"){
        this.$axios.post("/api/v1/create_token_details", this.createForm).then(result => {
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
        this.createForm.id = Number(this.createForm.id);
        this.$axios.put("/api/v1/update_token_details", this.createForm).then(result => {
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
      }
    }
  }
};
</script>
