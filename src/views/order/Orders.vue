<template>
  <div class="orders">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="24">
        <el-col :span="4">
          <el-input
            placeholder="请输入用户ID"
            v-model="queryInfo.user_id"
            clearable
            @clear="getOrderList"
          >
          </el-input
        ></el-col>
        <el-col :span="4">
          <el-select
            v-model="queryInfo.pay_status"
            placeholder="请选择是否付款"
          >
            <el-option
              v-for="item in pay_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="queryInfo.is_send" placeholder="请选择是否发货">
            <el-option
              v-for="item in send_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="getOrderList('search')"
            >搜索</el-button
          ></el-col
        >
      </el-row>

      <!-- 订单列表数据 -->
      <el-table :data="orderlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          label="订单编号"
          prop="order_number"
          min-width="150px"
        ></el-table-column>
        <el-table-column label="用户ID" prop="user_id"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column
          label="订单类型"
          prop="order_fapiao_title"
        ></el-table-column>
        <el-table-column label="是否付款" prop="pay_status">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_status === '1'"
              >已付款</el-tag
            >
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send">
          <template slot-scope="scope">{{ scope.row.is_send }}</template>
        </el-table-column>
        <el-table-column label="下单时间" prop="create_time" min-width="100px">
          <template slot-scope="scope">{{
            scope.row.create_time | formatDate
          }}</template>
        </el-table-column>
        <el-table-column label="操作" min-width="80px">
          <template slot-scope>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showBox"
            ></el-button>
            <el-button
              size="mini"
              type="success"
              icon="el-icon-location"
              @click="showProgressBox"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 修改地址的对话框 -->
    <el-dialog
      title="修改地址"
      :visible.sync="addressVisible"
      width="50%"
      @close="addressDialogClosed('addressFormRef')"
    >
      <el-form
        :model="addressForm"
        :rules="addressFormRules"
        ref="addressFormRef"
        label-width="100px"
      >
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            expand-trigger="hover"
            :options="cityData"
            v-model="addressForm.address1"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressVisible = false">取 消</el-button>
        <el-button type="primary" @click="addressVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 展示物流进度的对话框 -->
    <el-dialog title="物流进度" :visible.sync="progressVisible" width="50%">
      <!-- 时间线 -->
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in progressInfo"
          :key="index"
          :timestamp="activity.time"
          >{{ activity.context }}</el-timeline-item
        >
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from "@/utils/utils";
import cityData from "@/utils/citydata";

export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
        user_id: null,
        is_send: null,
        pay_status: null
      },
      total: 0,
      orderlist: [],
      addressVisible: false,
      addressForm: {
        address1: [],
        address2: ""
      },
      pay_options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 0,
          label: "未付款"
        },
        {
          value: 1,
          label: "已付款"
        }
      ],
      send_options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 0,
          label: "未发货"
        },
        {
          value: 1,
          label: "已发货"
        }
      ],

      addressFormRules: {
        address2: [
          { required: true, message: "请填写详细地址", tigger: "blur" }
        ]
      },
      cityData,
      progressVisible: false,
      progressInfo: []
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  created() {
    this.getOrderList();
  },
  methods: {
    getOrderList(search) {
      if (search == "search") {
        this.queryInfo.pagenum = 1;
      }

      this.$api.Orders.getOrderList(this.queryInfo)
        .then(result => {
          const { data: res } = result;
          console.log(res);
          if (res.meta.status !== 200) {
            return this.$msg.error(res.meta.msg, "", 1500);
          }
          this.total = res.data.total;
          this.orderlist = res.data.goods;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getOrderList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getOrderList();
    },
    // 展示修改对话框
    showBox() {
      this.addressVisible = true;
    },
    addressDialogClosed(formName) {
      this.$refs[formName].resetFields();
    },
    showProgressBox() {
      this.progressInfo = [
        {
          time: "2018-05-10 09:39:00",
          ftime: "2018-05-10 09:39:00",
          context: "已签收,感谢使用顺丰,期待再次为您服务",
          location: ""
        },
        {
          time: "2018-05-10 08:23:00",
          ftime: "2018-05-10 08:23:00",
          context:
            "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
          location: ""
        }
      ];
      this.progressVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/orders";
</style>
