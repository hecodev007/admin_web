<template lang="pug">
Main.page-exchange

        Form(:model='collectForm', :label-width='150')
            FormItem(:label='$lang("币种ID")' style="width:600px" )
                Input(v-model='collectForm.token_id', :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("归集哪个地址的token")' style="width:600px" )
                Input(v-model='collectForm.from_address',  :placeholder="$lang('请输入',$lang('归集哪个地址的token'))")
            FormItem(:label='$lang("归集到哪里")' style="width:600px" )
                Input(v-model='collectForm.to_address',  :placeholder="$lang('请输入',$lang('归集到哪里'))")
            FormItem(:label='$lang("最小归集值")' style="width:600px" )
                Input(v-model='collectForm.min_collect',  :placeholder="$lang('请输入',$lang('最小归集值'))")
            FormItem(:label='$lang("最大归集值")' style="width:600px" )
                Input(v-model='collectForm.max_collect',  :placeholder="$lang('请输入',$lang('最大归集值'))")

            Button(type="primary" long @click="modalRequst = true"  style="width:600px " :loading="loading") 用户地址归集到运营地址
            Modal(v-model="modalRequst" title="确认提示" @on-ok="sendRequest" )
                <p>确定要归集用户资产吗？</p>

        Form(:model='collect2Form', :label-width='150' style="margin-top:50px")
            FormItem(:label='$lang("币种ID")' style="width:600px" )
                Input(v-model='collect2Form.token_id', :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("归集哪个地址的token")' style="width:600px" )
                Input(v-model='collect2Form.from_address',  :placeholder="$lang('请输入',$lang('归集哪个地址的token'))")
            FormItem(:label='$lang("归集到哪里")' style="width:600px" )
                Input(v-model='collect2Form.to_address',  :placeholder="$lang('请输入',$lang('归集到哪里'))")
            FormItem(:label='$lang("归集金额")' style="width:600px" )
                Input(v-model='collect2Form.amount',  :placeholder="$lang('请输入',$lang('归集金额'))")

            Button(type="primary" long @click="modalRequst2 = true"  style="width:600px " :loading="loading") 运营地址归集到运营地址
            Modal(v-model="modalRequst2" title="确认提示" @on-ok="sendRequest2" )
                <p>确定要归集运营资产吗？</p>

</template>
<script>
    export default {
        name: "collect_to_hot",
        data() {
            return {
                nextType: '',
                loading: false,
                modalRequst: false,
                modalRequst2: false,

                // 创建/修改/查看共用
                collectForm: {
                    token_id: "",
                    from_address: "",
                    to_address: "",
                    min_collect: "",
                    max_collect: "",
                },
                collect2Form: {
                    token_id: "",
                    from_address: "",
                    to_address: "",
                    amount:"",
                },

            };
        },
        created() {
        },
        methods: {
            sendRequest() {
                this.loading = true;
                this.collectForm.min_collect = String(this.collectForm.min_collect)
                this.collectForm.max_collect = String(this.collectForm.max_collect)
                this.$axios.post("/api/v1/collect_to_hot", this.collectForm).then(result => {
                    this.loading = false;
                    /*setTimeout(() => {
                        this.loading = true;
                    }, 200);*/


                    if (result.code == 10000) {
                        this.$Notice.success({
                            title: "归集成功",
                            duration: 2
                        });
                    }else{
                        this.$Notice.error({
                            title: "归集失败: "  + result.data.msg,
                            duration: 4
                        });
                    }
                });
            },
            sendRequest2() {
                this.loading = true;
                this.collect2Form.amount = String(this.collect2Form.amount)
                this.$axios.post("/api/v1/collect_hot_to_hot", this.collect2Form).then(result => {
                    this.loading = false;
                    /*setTimeout(() => {
                        this.loading = true;
                    }, 200);*/


                    if (result.code == 10000) {
                        this.$Notice.success({
                            title: "归集成功",
                            duration: 2
                        });
                    }else{
                        this.$Notice.error({
                            title: "归集失败: "  + result.data.msg,
                            duration: 4
                        });
                    }
                });
            },
        }
    };
</script>
