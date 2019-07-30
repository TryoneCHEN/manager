<template>
  <div class="user-container">
    <!-- 面包屑 -->
    <el-breadcrumb class='my-breadcrumb' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 栅格 输入框 和按钮 -->
    <el-row>
      <el-col :span="24">
        <!-- 按钮 -->
        <el-button type="primary" plain>添加分类 </el-button>
      </el-col>
    </el-row>
    <!-- table -->
    <el-table :data="tableData" style="width: 100%" row-key="cat_id">
      <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="name" label="级别" width="180">
        <template slot-scope="scope">
          {{scope.row.cat_level==0?'一级':''}}
          {{scope.row.cat_level==1?'二级':''}}
          {{scope.row.cat_level==2?'三级':''}}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="是否有效">
        <template slot-scope="scope">{{scope.row.cat_deleted==false?'有效':'无效'}}</template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="1"
      :page-sizes="[2, 4, 6, 9]"
      :page-size="4"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "users",
  // 数据
  data() {
    return {
      // 表格依赖于数据没有数据  会一行都没有
      tableData: [
        {
          date: "2016-05-02",
          name: "王小黑",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小白",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小绿",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小花",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  created(){
    this.$request.getCategories().then(res=>{
      this.tableData=res.data.data
    })
  }
};
</script>

<style  lang='scss'>
.my-breadcrumb{
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
  padding-left: 10px;
}
</style>
