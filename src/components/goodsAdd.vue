<template>
  <div>
    <!-- alert -->
    <el-alert center title="消息提示的文案" type="info" show-icon></el-alert>
    <!-- 步骤 -->
    <el-steps :active="+active" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tabs -->
    <el-tabs v-model="active" tab-position="left" style="height: 200px;">
      <el-tab-pane name="1" label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane name="2" label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane name="3" label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane name="4" label="定时任务补偿">定时任务补偿</el-tab-pane>
      <el-tab-pane name="5" label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name:"goodsAdd",
  data() {
    return {
      active: "1"
    };
  }
};
</script>

<style>
</style>
