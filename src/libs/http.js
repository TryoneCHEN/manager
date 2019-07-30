// 导入axios
import axios from 'axios'
import Vue from 'vue'
import router from '../router'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
 config.headers.Authorization=window.sessionStorage.getItem('token')
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // console.log(response);
  
  if (response.data.meta.status == 200) {
    // this.$message.success(response.data.meta.msg)
    // 原型使用
    Vue.prototype.$message.success(response.data.meta.msg)
    // 实例化Vue
    // new Vue().$message.success(response.data.meta.msg)
    Vue.prototype.$message.close()
  }
  else if(response.data.meta.status == 400 && response.data.meta.msg == "无效token"){
    new Vue().$message.warning('token好像是你伪造的哟，小子阔以的!')
    router.push('login')
    window.sessionStorage.removeItem("token")
    response.data.data = []
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});


const request = {
  login(params) {
    return axios.post('login', params)
  },
  getUsers(params){
    return axios.get('users',{
      params,
      headers:{
        // Authorization:window.sessionStorage.getItem('token')
      }
    })
  },
  updateUserStatus(params) {
    return axios.put(`users/${params.id}/state/${params.type}`)
  },
  deleteUserById(params) {
    return axios.delete(`users/${params.id}`)
  },
  addUser(params) {
    return axios.post('users',params)
  },
  getUserById(id){
    return axios.get(`users/${id}`)
  },
  updateUser(params){
    return axios.put(`users/${params.id}`,{
      email:params.email,
      mobile:params.mobile
    })
  },
  getRoles() {
    return axios.get('roles')
  },
  // 分配用户角色
  updateUserRole(params) {
    return axios.put(`users/${params.id}/role`, {
      rid: params.rid
    })
  },
  // 新增角色
  addRoles(params) {
    return axios.post(`roles`, params)
  },
  // 删除角色
  deleteRoles(id) {
    return axios.delete(`roles/${id}`)
  },
   // 获取角色信息
   getRolesById(id) {
    return axios.get(`roles/${id}`)
  },
  // 修改角色
  updateRoles(params) {
    return axios.put(`roles/${params.id}`, {
      roleName: params.roleName,
      roleDesc: params.roleDesc
    })
  },
  getListRights() {
    return axios.get(`rights/list`)
  },
  getReports() {
    return axios.get('reports/type/1')
  },
  getOrderList(params){
    return axios.get('orders',{
      // params:params
      // key axios中规定的值
      params
    })
  },
  deleteRight(params){
    return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`)
  },
  getRightsTree(){
    return axios.get('rights/tree')
  },
  // rids  id,id,id,权限id列表
  setRoleRights(params){
    return axios.post(`roles/${params.roleId}/rights`,{
      rids:params.rids
    })
  },
  // 获取菜单 
  getMenus(){
    return axios.get('menus')
  },
  // 分类数据获取
  getCategories() {
    return axios.get(`categories?type=3`)
  },
  // 静态动态
  getStatic(id){
    return axios.get(`categories/${id}/attributes?sel=only`)
  },
  // 获取动态参数
  getDynamic(id){
    return axios.get(`categories/${id}/attributes?sel=many`)
  }
}
export default {
    install(Vue) {
      // 添加到Vue的原型上
      Vue.prototype.$request = request
    }
  }