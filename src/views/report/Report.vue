<template>
  <div class="report">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="main" style="width:750px;height:400px;"></div>
    </el-card>
  </div>
</template>
<script>
// 导入echarts
import echarts from "echarts";
import _ from "lodash";

export default {
  data() {
    return {
      options: {
        title: {
          text: "用户来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3"
            }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ]
      }
    };
  },
  created() {},
  // 此时，页面上的元素，已经被渲染完毕了
  async mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    this.$api.Report.getMounted()
      .then(result => {
        const { data: res } = result;
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$msg.error(res.meta.msg, "", 1500);
        }
        const resultdata = _.merge(res.data, this.options);
        // 展示数据
        myChart.setOption(resultdata);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {}
};
</script>

<style lang="less" scoped>
@import "~@/styles/report";
</style>
