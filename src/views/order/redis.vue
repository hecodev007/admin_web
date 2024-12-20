<template >
  <div>
    <Card dis-hover>
      <p slot="title" style="padding-bottom: 20px; padding-top: 5px;">Run Redis CMD</p>
      <Input v-model="createForm.cmd_string"/>&nbsp;&nbsp;
      <Button type="primary" @click="sendRequest" style="width:100px;  margin-top: 20px;" :loading="loading" >run</Button><br><br>
      <textarea id="filelog-container" style="height: 750px; width:100%; overflow-y: scroll; background: #333; color: #aaa; padding: 10px;">{{redisResult}}</textarea>
    </Card>
  </div>
</template>
<script>
    export default {
        name: "redis",
        data() {
            return {

                loading: false,
                redisResult: "",

                // 创建/修改/查看共用
                createForm: {
                    cmd_string:"",
                },

            };
        },
        created() {
        },
        methods: {
            sendRequest() {
                this.loading = true;
                this.createForm.cmd_string = String(this.createForm.cmd_string)
                this.redisResult += this.createForm.cmd_string + '\n'
                this.$axios.post("/api/v1/redis", this.createForm).then(result => {
                    this.loading = false;
                    /*setTimeout(() => {
                        this.loading = true;
                    }, 200);*/


                    if (result.code == 10000) {
                        this.$Notice.success({
                            title: "success",
                            duration: 2
                        });
                        if (result.data instanceof Array) {
                          for (var i=0,len=result.data.length; i<len; i++)
                          {
                            this.redisResult += result.data[i] + '\n'
                          }
                        } else {
                          this.redisResult += result.data + '\n'
                        }
                      this.redisResult += '\n'
                    } else {
                        this.$Notice.error({
                            title: "failed：" + result.data.msg,
                            duration: 4
                        });
                    }
                });
            },
        }
    };
</script>
