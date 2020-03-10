<template>
  <div class="home">
    <el-row :gutter="12">
      <el-col :span="6" v-for="item in cards" :key="item.id">
        <el-card shadow="never">
          <div class="card-div">
            <div class="icon">
              <i :class="item.icon" :style="{ color: item.color }"></i>
            </div>
            <div class="content">
              <div class="text">{{ item.text }}</div>
              <div class="number">
                <countTo
                  class="font"
                  :startVal="startVal"
                  :endVal="item.number"
                  :duration="1500"
                ></countTo>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="echarts-card">
      <el-card shadow="never">
        <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
        <div id="main" style="width: 100%;height:400px;"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import countTo from "vue-count-to";

export default {
  components: { countTo },
  name: "Home",
  data() {
    return {
      startVal: 0,
      cards: [
        {
          id: 1,
          icon: "el-icon-s-data",
          text: "当前日活",
          number: 262512,
          color: "#40c9c6"
        },
        {
          id: 2,
          icon: "el-icon-s-order",
          text: "今日订单",
          number: 162512,
          color: "#36a3f7"
        },
        {
          id: 3,
          icon: "el-icon-s-finance",
          text: "今日流水",
          number: 6400000,
          color: "#f4516c"
        },
        {
          id: 4,
          icon: "el-icon-s-custom",
          text: "用户总数",
          number: 154623000,
          color: "#34bfa3"
        }
      ],
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#008acd"
            }
          }
        },
        legend: {
          data: ["预期", "实际", "上周"]
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "2%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "预期",
            type: "line",
            smooth: true,
            stack: "总量",
            lineStyle: {
              color: "#5ab1ef",
              width: 2
            },
            data: [150, 200, 50, 200, 50, 80, 90]
          },
          {
            name: "实际",
            smooth: true,
            type: "line",
            stack: "总量",
            lineStyle: {
              color: "#50d6d9",
              width: 2
            },
            data: [100, 100, 200, 350, 300, 350, 400]
          },
          {
            name: "上周",
            smooth: true,
            type: "line",
            stack: "总量",
            lineStyle: {
              color: "#b6a2de",
              width: 3
            },
            data: [200, 250, 300, 350, 400, 450, 500]
          }
        ]
      }
    };
  },
  mounted() {
    // Dom渲染完成后执行
    this.getEcharts();
  },
  methods: {
    getEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("main"));
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/home.less";
</style>
