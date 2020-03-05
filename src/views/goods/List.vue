<template>
  <div class="list">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getCoodsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getCoodsList('search')"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- table表格区域 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
          width="95px"
        ></el-table-column>
        <el-table-column
          label="商品重量"
          prop="goods_weight"
          width="70px"
        ></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="140px">
          <template slot-scope="scope">{{
            scope.row.add_time | formatDate
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeById(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { formatDate } from "@/utils/utils";

export default {
  data() {
    return {
      // 查询参数对象
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      // 商品列表
      goodslist: [],
      // 数据总条数
      total: 0
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  created() {
    this.getCoodsList();
  },
  methods: {
    // 根据分页获取对应的商品列表
    getCoodsList(search) {
      // fix 用户在非第一页查询时,请求的参数重置第一页
      if (search == "search") {
        this.queryInfo.pagenum = 1;
      }
      this.$api.Goods.getCoodsList(this.queryInfo)
        .then(result => {
          const { data: res } = result;
          console.log(res);
          if (res.meta.status !== 200) {
            return this.$msg.error(res.meta.msg, "", 1500);
          }
          this.$msg.ok(res.meta.msg, "操作成功", 1000);
          this.goodslist = res.data.goods;
          this.total = res.data.total;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getCoodsList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getCoodsList();
    },
    // 删除商品
    removeById(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 执行删除逻辑
          this.$api.Goods.delGoods(id)
            .then(result => {
              const { data: res } = result;
              console.log(res);
              if (res.meta.status !== 200) {
                return this.$msg.error(res.meta.msg, "", 1500);
              }
              this.$msg.ok(res.meta.msg, "操作成功", 1000);
              this.getCoodsList();
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$msg.info("已取消删除", "", 1000);
        });
    },
    goAddpage() {
      this.$router.push("/goods_add");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/list";
</style>
