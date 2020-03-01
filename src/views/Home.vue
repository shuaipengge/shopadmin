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
              <div class="number">{{ item.number }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
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
      ]
    };
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/home.less";
</style>
