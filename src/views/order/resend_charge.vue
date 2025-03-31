<template lang="pug">
  Main.page-exchange
    Form(:model='createForm', :label-width='100')
      FormItem(:label='$lang("交易hash")')
        Input(v-model='createForm.tx_hash', , :placeholder="$lang('请输入',$lang('交易hash'))")
      FormItem(:label='$lang("地址")')
        Input(v-model='createForm.address', , :placeholder="$lang('请输入',$lang('地址'))")
      FormItem(:label='$lang("币种ID")')
        Input(v-model='createForm.token_id', , :placeholder="$lang('请输入',$lang('币种ID'))")
      FormItem(:label='$lang("金额")')
        Input(v-model='createForm.amount', , :placeholder="$lang('请输入',$lang('金额'))")
    Button(type="primary" long @click="submit"  style="width:400px " :loading="loading") {{$lang("确定")}}
</template>

<script>
export default {
  name: 'ResendCharge',
  data() {
    return {
      loading: false,
      createForm: {
        token_id: "",
        tx_hash: "",
        address: "",
        amount: "",
      },
    }
  },
  methods: {
    submit() {
      if (!/^[+-]?(?:\d+\.?\d*|\.\d+)$/ig.test(this.createForm.amount)) return this.$Notice.error({ title: this.$lang("失败"), desc: this.$lang("请输入正确的金额"), duration: 2 });
      this.loading = true;
      this.$axios.post("/api/v1/resend_charge", this.createForm).then(result => {
        this.loading = false;
        if (result.code == 10000) {
          this.$Notice.success({
            title: this.$lang("success"),
            duration: 2
          });
          this.createForm = {
            token_id: "",
            tx_hash: "",
            address: "",
            amount: "",
          };
        }
      }).catch(err => {
        this.loading = false;
        this.$Notice.error({
          title: this.$lang("失败"),
          desc: err.message,
          duration: 2
        });
      });
    }
  },
  mounted() {
  }
}
</script>

<style></style>
