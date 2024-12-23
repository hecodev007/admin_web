<template>
  <div>
    　　　　<Card dis-hover>
      　　　　　　<p 
        slot="title" 
        style="padding-bottom: 20px; padding-top: 5px;">
        　　监听wallet-admin日志
        　　　　　　</p>
      <Button 
        type="primary" 
        @click="openlogs">开启日志</Button>&nbsp;&nbsp;
      <Button 
        type="error" 
        @click="stoplogs">关闭日志</Button><br><br>
      <div 
        id="filelog-container" 
        style="height: 750px; overflow-y: scroll; background: #333; color: #aaa; padding: 10px;">
        　　<div id="aa">{{ pullFileLogger }}</div>
      </div>
      　　</Card>
  </div>
</template>
<style >
</style>
<script>
    export default {
        data() {
            return {

                pullFileLogger: '',
                openlog: false,
            };
        },
        created() {
        },
        mounted() {
            //this.loadData()

            clearInterval(this.timer)
            this.setTimer()
        },

        distroyed: function () {

            clearInterval(this.timer)

        },
        methods: {
            setTimer: function () {

                this.timer = setInterval( () => {
                    if (this.openlog == true)
                        this.getlogs()
                }, 10000)

            },
            openlogs(){
                this.openlog = true;
                this.getlogs();
            },
            getlogs() {
                this.$axios.get("/api/v1/getlogs").then(result => {
                    //this.loading = false;
                    /*setTimeout(() => {
                        this.loading = true;
                    }, 200);*/

                    if (result.code == 10000) {
                        this.$Notice.success({
                            title: this.$lang("成功"),
                            duration: 2
                        });

                        this.pullFileLogger += result.data
                    }else{
                        this.$Notice.error({
                            title: this.$lang("失败"),
                            duration: 2
                        });
                    }
                });
            },
            stoplogs() {
                this.openlog = false;
                this.$axios.get("/api/v1/stoplogs").then(result => {
                    this.loading = false;
                    /*setTimeout(() => {
                        this.loading = true;
                    }, 200);*/

                    if (result.code == 10000) {
                        this.$Notice.success({
                            title: this.$lang("成功"),
                            duration: 2
                        });

                        this.pullFileLogger += result.data
                    }else{
                        this.$Notice.error({
                            title: this.$lang("失败"),
                            duration: 2
                        });
                    }
                });
            },
        }
    };
</script>
