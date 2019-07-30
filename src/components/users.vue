<template>
  <div class="user-container">
    <!-- 面包屑 -->
    <el-breadcrumb class="my-breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 栅格 输入框 和按钮 -->
    <el-row>
      <el-col :span="6">
        <!-- 输入框 -->
        <el-input
          placeholder="请输入内容"
          v-model="userData.query"
          @keyup.native.enter="getUsers"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <!-- 按钮 -->
        <el-button type="success" @click="addVisible=true" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- table -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="stateChange(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            class="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            plain
          ></el-button>
          <el-button
            class="el-icon-delete"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            plain
          ></el-button>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-check"
            plain
            @click="handleRole(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="userData.pagenum"
      :page-sizes="[2, 4, 6, 10]"
      :page-size="userData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></el-pagination>
    <!--新增框 -->
    <el-dialog title="添加用户" :visible.sync="addVisible">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑框 -->
    <el-dialog title="编辑用户" :visible.sync="editVisible">
      <el-form :model="editForm" :rules="addRules" ref="editForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色框 -->
    <el-dialog title="分配角色" :visible.sync="roleVisible">
      <el-form :model="roleForm" :rules="addRules" ref="roleForm">
        <el-form-item label="当前用户" label-width="120px" prop="username">
          <el-input v-model="roleForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="请选择角色" label-width="120px">
          <el-select v-model="roleValue" placeholder="请选择">
            <el-option label="未分配角色" :value="-1"></el-option>
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('roleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "users",
  // 数据
  data() {
    return {
      // 表格依赖于数据没有数据  会一行都没有
      tableData: [],
      userData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      addVisible: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addRules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      },
      total: 0,
      editVisible: false,
      // 编辑的数据
      editForm: {
        username: "",
        email: "",
        mobile: ""
      },
       roleVisible: false,
      // 角色数据
      roleForm: {},
      // 所有的角色
      roles: [],
      // select的双向数据绑定
      roleValue: ""
    };
  },
  methods: {
    handleEdit(index, row) {
      this.$request.getUserById(row.id).then(res => {
        this.editForm = res.data.data;
        this.editVisible = true;
      });
    },
    handleDelete(index, row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request.deleteUserById({ id: row.id }).then(res => {
            if (res.data.meta.status == 200) {
              this.getUsers();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    stateChange(row) {
      this.$request
        .updateUserStatus({ id: row.id, type: row.mg_state })
        .then(res => {
        });
    },
    getUsers() {
      this.$request.getUsers(this.userData).then(res => {
        this.tableData = res.data.data.users;
        this.total = res.data.data.total;
      });
    },
    submitForm(formName) {
      // 通过ref属性 获取表单 并且调用验证的方法
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "editForm") {
            // 编辑用户
            this.$request.updateUser(this.editForm).then(res => {
              // console.log(res);
              if (res.data.meta.status == 200) {
                // 重新获取数据
                this.getUsers();
                // 关闭弹框
                this.editVisible = false;
              }
            });
          } else if (formName == "roleForm") {
            this.$request
              .updateUserRole({
                // 用户id
                id: this.roleForm.id,
                // 角色id el-select双向数据绑定的值
                rid: this.roleValue
              })
              .then(res => {
                // console.log(res);
                if (res.data.meta.status == 200) {
                  // 重新获取角色
                  this.getUsers();
                  // 关闭角色框
                  this.roleVisible = false;
                }
              });
          }else {
            // 数据格式没问题

            // 提交数据
            this.$request.addUser(this.addForm).then(res => {
              // 关闭弹框
              this.addVisible = false;
              // 重新获取数据
              this.getUsers();
              // 重置表单即可
              this.$refs[formName].resetFields();
            });
          }
        } else {
          // 数据有问题
          this.$message.error("哥们，数据格式不对哦，你是机器人吗？");
          return false;
        }
      });
    },
    currentChange(current) {
      this.userData.pagenum = current;
      this.getUsers();
    },
    // 页容量改变
    sizeChange(size) {
      this.userData.pagesize = size;
      this.getUsers();
    },
    handleRole(row){
      this.$request.getUserById(row.id).then(res=>{
          this.roleForm = res.data.data;
        // 获取角色数据
        this.$request.getRoles().then(res => {
          // console.log(res);
          this.roles = res.data.data;
          // 弹框
          this.roleVisible = true;
          // 设置默认选中 roleValue的值 跟 this.roleForm.rid
          this.roleValue = this.roleForm.rid;
        });
      })
    }
  },

  created() {
    this.getUsers();
  }
};
</script>

<style  lang='scss'>
.my-breadcrumb {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
  padding-left: 10px;
}
</style>
