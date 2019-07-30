import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    //数据
    state:{
        menuList:[]
    },
    mutations:{
        changeMenuList(state,newMenuList){
            state.menuList = newMenuList
        }
    }
})

//暴露出去
export default store