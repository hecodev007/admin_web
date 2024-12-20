<template>
  <div ref="dom"/>
</template>

<script>
    import echarts from 'echarts'
    import { on, off } from '@/libs/tools'
    export default {
        name: 'ServiceRequests',
        props: {
            tableData: Array,
        },
        data () {
            return {
                days: [],
                deposit_amount: [],
                withdraw_amount: [],
                withdraw_cost_fee: [],
                collect_amount: [],
                collect_cost_fee: [],
                dom: null,
                option: null,
            }
        },
        methods: {
            resize () {
                this.dom.resize()
            },
            loadData() {
                this.days = []
                this.deposit_amount = []
                this.withdraw_amount = []
                this.withdraw_cost_fee = []
                this.collect_amount = []
                this.collect_cost_fee = []
                this.tableData.forEach(item => {
                    this.days.push(item.date)
                    this.deposit_amount.push(item.deposit_amount)
                    this.withdraw_amount.push(item.withdraw_amount)
                    this.withdraw_cost_fee.push(item.withdraw_cost_fee)
                    this.collect_amount.push(item.collect_amount)
                    this.collect_cost_fee.push(item.collect_cost_fee)

                })

                this.option = {
                    tooltip: {
                        trigger: 'axis',
                            axisPointer: {
                            type: 'cross',
                                label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    grid: {
                        top: '3%',
                            left: '1.2%',
                            right: '1%',
                            bottom: '3%',
                            containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: this.days,
                        }
                    ],
                        yAxis: [
                    {
                        type: 'value'
                    }
                ],
                    series: [
                    {
                        name: '提币金额',
                        type: 'line',
                        areaStyle: { normal: {
                                color: '#2d8cf0'
                            } },
                        data: this.withdraw_amount
                    },
                    {
                        name: '冲币金额',
                        type: 'line',
                        areaStyle: { normal: {
                                color: '#10A6FF'
                            } },
                        data: this.deposit_amount
                    },
                    {
                        name: '归集金额',
                        type: 'line',
                        areaStyle: { normal: {
                                color: '#0C17A6'
                            } },
                        data: this.collect_amount
                    },
                    {
                        name: '提币手续费',
                        type: 'line',
                        areaStyle: { normal: {
                                color: '#4608A6'
                            } },
                        data: this.withdraw_cost_fee
                    },
                    {
                        name: '归集手续费',
                        type: 'line',
                        areaStyle: { normal: {
                                color: '#398DBF'
                            } },
                        data: this.collect_cost_fee
                    }
                ]
                }



                this.dom = echarts.init(this.$refs.dom)
                this.dom.setOption(this.option)
                on(window, 'resize', this.resize)
            },
        },
        watch: {
            tableData (tableData) {
                this.tableData = tableData
                this.loadData()
            },
        },
        mounted () {
            this.loadData();
            this.$nextTick(() => {
                this.dom = echarts.init(this.$refs.dom)
                this.dom.setOption(this.option)
                on(window, 'resize', this.resize)
            })
        },
        beforeDestroy () {
            off(window, 'resize', this.resize)
        }
    }
</script>
