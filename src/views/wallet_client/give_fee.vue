<template lang="pug">
Main.page-exchange

        Form(:model='collectForm', :label-width='100')
            FormItem(:label='$lang("币种ID")' style="width:400px" )
                Input(v-model='collectForm.token_id', :placeholder="$lang('请输入',$lang('币种ID'))", :disabled="nextType=='edit'")
            FormItem(:label='$lang("从哪给")' style="width:400px" )
                Input(v-model='collectForm.from_address',  :placeholder="$lang('请输入',$lang('从哪给'))")
            FormItem(:label='$lang("给谁")' style="width:400px" )
                Input(v-model='collectForm.to_address',  :placeholder="$lang('请输入',$lang('给谁'))")
            FormItem(:label='$lang("给多少")' style="width:400px" )
                Input(v-model='collectForm.amount',  :placeholder="$lang('请输入',$lang('给多少'))")

            Button(type="primary" long @click="modalDelete = true"  style="width:400px " :loading="loading") {{$lang("给矿工费")}}
            Modal(v-model="modalDelete" title="确认提示" @on-ok="sendRequest" )
                <p>确定要给手续费吗？</p>

</template>
<script>
    export default {
        name: "GiveFee",
        data() {
            return {
                nextType: '',
                loading: false,
                modalDelete: false,

                // 创建/修改/查看共用
                collectForm: {
                    token_id: "",
                    from_address: "",
                    to_address: "",
                    amount: "",
                },

            };
        },
        created() {
        },
        methods: {
            sendRequest() {
                this.loading = true;
                this.collectForm.amount = String(this.collectForm.amount)
                this.$axios.post("/api/v1/give_fee", this.collectForm).then(result => {
                    this.loading = false;
                    /*setTimeout(() => {
                        this.loading = true;
                    }, 200);*/


                    if (result.code == 10000) {
                        this.$Notice.success({
                            title: "给矿工费成功",
                            duration: 2
                        });
                    }else{
                        this.$Notice.error({
                            title: "给矿工费失败：" + result.data.msg,
                            duration: 4
                        });
                    }
                });
            },
        }
    };
</script>
