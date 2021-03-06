import Vue from "vue";
import Vuex from "vuex";
import types from "./mutation-types";
import defaultValue from "../services/default";
import * as api from "../api";
import http_sys from "../common/http_sys";

import { getCurrentMenu, getSessionKey } from '../common/utils'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true, // process.env.NODE_ENV !== 'production', 直接修改state 抛出异常

    getters: {
        loading: state => state.loading,
        menuList: state => state.menuList,
        sidebar: state => state.sidebar,
        userInfo: state => state.userInfo,
        device: state => state.device,
        currentMenus: state => state.currentMenus,
    },
    state: {
        loading: false,
        menuList: {},
        sidebar: {
            collapsed: getSessionKey('state.sidebar.collapsed', 'false') === 'true',
            show: getSessionKey('state.sidebar.show', 'true') === 'true',
        },
        device: {
            isMobile: false
        },
        userInfo: { name: '佚名' },
        currentMenus: [],
    },
    mutations: {
        //只能同步的函数
        [types.TOGGLE_DEVICE](state, isMobile) {
            state.device.isMobile = isMobile
        },
        [types.TOGGLE_LOADING](state) {
            state.loading = !state.loading
        },
        [types.LOAD_MENU](state, menu) {
            state.menuList = menu;
            //存在localStorage
            localStorage.menuList = JSON.stringify(menu);
        },
        [types.LOAD_CURRENT_MENU](state, menu) {
            state.currentMenus = menu;
            //存在localStorage
            localStorage.currentMenus = JSON.stringify(menu);

        },
        [types.SET_USER_INFO](state, info) {
            state.userInfo = info;
        },
        [types.TOGGLE_SIDEBAR](state, collapsed) {
            if (collapsed == null) collapsed = !state.sidebar.collapsed;
            state.sidebar.collapsed = collapsed;
            window.sessionStorage.setItem("state.sidebar.collapsed", collapsed)
        },
        [types.TOGGLE_SIDEBAR_SHOW](state, show) {
            if (show == null) state.sidebar.show = !state.sidebar.show;
            else {
                state.sidebar.show = show;
            }
            window.sessionStorage.setItem("state.sidebar.show", state.sidebar.show)
        },
    },
    actions: {
        //异步的函数
        toggleLoading: ({ commit }) => commit(types.TOGGLE_LOADING),
        loadMenuList: ({ commit }) => {
            // commit(types.LOAD_MENU, defaultValue.menuList);

            // Vue.axios.get(api.SYS_MENU_LIST).then(res => {
            //     // commit(types.LOAD_MENU, res.data);
            //     commit(types.LOAD_MENU, defaultValue.menuList);
            // }).catch(
            //     exp => commit(types.LOAD_MENU, defaultValue.menuList)
            // );
             
            if(JSON.parse(localStorage.getItem('menuList'))!=null&&JSON.parse(localStorage.getItem('menuList')).length!=0){
               return commit(types.LOAD_MENU, JSON.parse(localStorage.getItem('menuList')));
            }else{
                return http_sys
                .getUserMenuList()
                .then(res => res)
                .then(data => {
                    if(data.data.code==200)
                    {
                        commit(types.LOAD_MENU, data.data.data);
                        //  commit(types.LOAD_MENU, defaultValue.menuList);
                        
                        
                    }else{
                        this.$message(data.data.msg||data.data.errMessage);
                    }
                }).catch(e => { 
                    // commit(types.LOAD_MENU, defaultValue.menuList);
                    _this.$message('接口操作失败');
                    
                
                })
            }
            
        },
        changeCurrentMenu: ({ state, commit }, { path, matched, fullPath }) => {
            const a = getCurrentMenu(fullPath, state.menuList);
            commit(types.LOAD_CURRENT_MENU, a.reverse());
        }
    },
})

export default store