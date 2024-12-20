<template lang="pug">
Main.page-exchange

        Form(:model='createForm', :label-width='100')
            FormItem(:label='$lang("币种类型")' style="width:400px" )
                Select( v-model="tokenType", class="search-col")
                    Option( v-for="item in tokenTypeList" :value="item.value" :key="`search-col-${item.key}`") {{ item.value }}
            FormItem(:label='$lang("币种ID")' style="width:400px" )
                Input(v-model='createForm.token_id', :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("归集地址")' style="width:400px" v-if= 'tokenType == 2')
                Input(v-model='createForm.address',  :placeholder="$lang('请输入',$lang('地址'))", :disabled="nextType=='edit'")
            Button(type="primary" long @click="modalDelete = true"  style="width:400px " :loading="loading") {{$lang("添加热钱包地址")}}
            Modal(v-model="modalDelete" title="确认提示" @on-ok="pushToken" )
                <p>{{$lang("确定吗")}}?</p>

                <div>{{ tokenTypeList }}</div>


</template>
<script>
    export default {
        data() {
            return {
                nextType: "",
                tokenType: 1,
                loading: false,
                modalDelete: false,
                tokenTypeList: [
                    {
                        key: 1,
                        value: 'Auto'
                    },
                    {
                        key: 2,
                        value: 'Manual'
                    },
                ],

                // 创建/修改/查看共用
                createForm: {
                    type: 1,
                    token_id: "",
                    address: "",

                },

            };
        },
        created() {
        },
        methods: {
            pushToken() {
                this.loading = true;
                this.createForm.type = Number(this.tokenType);
                this.createForm.token_id = String(this.createForm.token_id)
                this.createForm.address = String(this.createForm.address).trim()
                this.$axios.post("/api/v1/add_hot_address", this.createForm).then(result => {
                    this.loading = false;
                    /*setTimeout(() => {
                        this.loading = true;
                    }, 200);*/

                    if (result.code == 10000) {

                        this.createForm.token_id = "";
                        this.createForm.address = "";

                        this.$Notice.success({
                            title: this.$lang("新增成功"),
                            duration: 2
                        });
                    } else {
                        this.$Notice.error({
                            title: this.$lang("新增失败"),
                            duration: 2
                        });
                    }
                });
            },
        }
    };
</script>
