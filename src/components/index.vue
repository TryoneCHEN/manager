<template>
  <el-container class="index-container">
    <el-header class="index-header">
      <!-- 栅格 -->
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img class="logo" src="../assets/logo.png" alt />
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light title">IG后台管理系统</div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <el-button type="danger" icon="el-icon-delete" circle @click="logout"></el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="index-aside">
        <!-- 导航菜单 -->
        <el-menu router default-active="2" class="el-menu-vertical-demo">
          <el-submenu v-for="(item, index) in $store.state.menuList" :key="index" :index="item.order+''">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item v-for="(it, i) in item.children" :key="i" :index="'/'+it.path">
              <i class="el-icon-menu"></i>{{it.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      menuList:[]
    }
  },
  beforeCreate(){
    if(!window.sessionStorage.getItem('token')){
      this.$message.warning('哥们请先登录')
      this.$router.push("login");
    }
  },
   // 获取菜单数据
  created() {
    this.$request.getMenus().then(res => {
      // console.log(res);
      // this.menuList = res.data.data;
       this.$store.commit("changeMenuList", res.data.data);
    });
  },
  methods: {
    logout(){
      window.sessionStorage.removeItem("token")
      this.$router.push('login')
    }
  }
};
</script>

<style lang='scss'>
.index-container {
  height: 100%;
  .index-header {
    background-color: #b3c0d1;
    line-height: 60px;
    .logo {
      height: 60px;
    }
    .title {
      color: white;
      text-align: center;
      font-size: 30px;
      font-weight: 900;
    }
  }
  .index-aside {
    background-color: skyblue;
  }
  .index-main {
    background-color: #e9eef3;
  }
}
</style>
